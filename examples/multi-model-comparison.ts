/**
 * Example 2: Multi-Model Comparison
 *
 * This example demonstrates how to query multiple AI models
 * with the same dilemma and compare their responses.
 */

import type { ModelId, QueryModelsResponse } from '../schemas/types';

const API_BASE = 'https://virtusprotocol.com/api';

interface ComparisonResult {
  model: string;
  response: string;
  error?: string;
  metadata: {
    wordCount: number;
    responseTime: number;
  };
}

/**
 * Compare multiple AI models on the same ethical dilemma
 */
export async function compareModels(params: {
  dilemma: {
    title: string;
    description: string;
  };
  models: ModelId[];
}): Promise<{
  dilemmaId: string;
  results: ComparisonResult[];
}> {
  const { dilemma, models } = params;

  // Create dilemma
  const dilemmaResponse = await fetch(`${API_BASE}/dilemmas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: dilemma.title,
      description: dilemma.description,
      category: 'Technology Ethics',
      isStandard: false
    })
  });

  const { dilemma: created } = await dilemmaResponse.json();

  // Query models sequentially
  const results: ComparisonResult[] = [];

  for (const model of models) {
    const startTime = Date.now();

    const queryResponse = await fetch(`${API_BASE}/query-models`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        dilemmaId: created.id,
        dilemmaText: `${dilemma.title}\\n\\n${dilemma.description}`,
        modelIds: [model]
      })
    });

    const responseTime = Date.now() - startTime;
    const data: QueryModelsResponse = await queryResponse.json();
    const modelResponse = data.responses[0];

    results.push({
      model: modelResponse.model,
      response: modelResponse.response,
      error: modelResponse.error,
      metadata: {
        wordCount: modelResponse.response.split(/\\s+/).length,
        responseTime
      }
    });
  }

  return {
    dilemmaId: created.id,
    results
  };
}

// ============================================================================
// Analysis Helper Functions
// ============================================================================

/**
 * Analyze response characteristics
 */
export function analyzeResponse(response: string): {
  wordCount: number;
  sentenceCount: number;
  avgWordsPerSentence: number;
  mentionsFrameworks: boolean;
} {
  const words = response.split(/\\s+/).filter(w => w.length > 0);
  const sentences = response.split(/[.!?]+/).filter(s => s.trim().length > 0);

  const frameworks = [
    'utilitarian',
    'deontological',
    'virtue ethics',
    'consequentialist',
    'kant',
    'mill',
    'aristotle'
  ];

  const mentionsFrameworks = frameworks.some(f =>
    response.toLowerCase().includes(f)
  );

  return {
    wordCount: words.length,
    sentenceCount: sentences.length,
    avgWordsPerSentence: Math.round(words.length / sentences.length),
    mentionsFrameworks
  };
}

/**
 * Generate comparison report
 */
export function generateComparisonReport(results: ComparisonResult[]): string {
  let report = '# AI Model Comparison Report\\n\\n';

  results.forEach((result, index) => {
    const analysis = analyzeResponse(result.response);

    report += `## Model ${index + 1}: ${result.model}\\n\\n`;
    report += `**Response Time**: ${result.metadata.responseTime}ms\\n`;
    report += `**Word Count**: ${analysis.wordCount}\\n`;
    report += `**Sentence Count**: ${analysis.sentenceCount}\\n`;
    report += `**Avg Words/Sentence**: ${analysis.avgWordsPerSentence}\\n`;
    report += `**Mentions Ethical Frameworks**: ${analysis.mentionsFrameworks ? 'Yes' : 'No'}\\n\\n`;

    if (result.error) {
      report += `**Error**: ${result.error}\\n\\n`;
    } else {
      report += `**Response Preview**:\\n${result.response.substring(0, 200)}...\\n\\n`;
    }

    report += '---\\n\\n';
  });

  return report;
}

// ============================================================================
// Usage Example
// ============================================================================

async function main() {
  const comparison = await compareModels({
    dilemma: {
      title: 'Data Privacy vs Public Safety',
      description: `A government agency has access to encrypted communications
      that could prevent a terrorist attack, but reading them would violate
      the privacy rights of millions of citizens. Should they decrypt and
      read the messages?`
    },
    models: ['openai/gpt-5.1-chat', 'anthropic/claude-opus-4.5']
  });

  const report = generateComparisonReport(comparison.results);
  console.log(report);
}

if (require.main === module) {
  main().catch(console.error);
}
