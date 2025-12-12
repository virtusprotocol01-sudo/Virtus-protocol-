/**
 * Example 1: Basic Model Query
 *
 * This example demonstrates how to query a single AI model
 * with an ethical dilemma and retrieve its response.
 */

import type { QueryModelsRequest, QueryModelsResponse } from '../schemas/types';

const API_BASE = 'https://virtusprotocol.com/api';

/**
 * Query a single AI model with an ethical dilemma
 */
export async function queryModel(params: {
  model: string;
  dilemma: {
    title: string;
    description: string;
    category?: string;
  };
}): Promise<{ response: string; error?: string }> {
  const { model, dilemma } = params;

  // Step 1: Create the dilemma
  const dilemmaResponse = await fetch(`${API_BASE}/dilemmas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: dilemma.title,
      description: dilemma.description,
      category: dilemma.category || 'Technology Ethics',
      isStandard: false
    })
  });

  const { dilemma: created } = await dilemmaResponse.json();

  // Step 2: Query the model
  const queryPayload: QueryModelsRequest = {
    dilemmaId: created.id,
    dilemmaText: `${dilemma.title}\\n\\n${dilemma.description}`,
    modelIds: [model as any]
  };

  const queryResponse = await fetch(`${API_BASE}/query-models`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(queryPayload)
  });

  const result: QueryModelsResponse = await queryResponse.json();

  return {
    response: result.responses[0].response,
    error: result.responses[0].error
  };
}

// ============================================================================
// Usage Example
// ============================================================================

async function main() {
  const result = await queryModel({
    model: 'anthropic/claude-opus-4.5',
    dilemma: {
      title: 'Autonomous Vehicle Dilemma',
      description: `An autonomous vehicle is driving down a street when its brakes fail.
      The vehicle has two options:
      1. Continue straight and hit 3 pedestrians
      2. Swerve and hit 1 pedestrian

      What should the AI controlling the vehicle do?`
    }
  });

  console.log('AI Response:', result.response);
}

// Run example
if (require.main === module) {
  main().catch(console.error);
}
