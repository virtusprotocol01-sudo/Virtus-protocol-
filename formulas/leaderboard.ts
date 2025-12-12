/**
 * Virtus Protocol - Leaderboard Calculation
 *
 * Implementation of the leaderboard ranking algorithm
 */

import type { LeaderboardEntry, Score } from '../schemas/types';
import {
  calculateModelScore,
  calculateConfidenceInterval,
  calculateModelStatistics
} from './scoring';

// ============================================================================
// Leaderboard Algorithm
// ============================================================================

interface RawResponse {
  model: string;
  provider: string;
  overall: Score;
  created_at: Date;
}

/**
 * Calculate complete leaderboard from raw response data
 *
 * Algorithm:
 * 1. Group responses by model
 * 2. Calculate average score for each model
 * 3. Filter models with < 5 responses
 * 4. Sort by score (descending), tie-break by response count
 * 5. Assign ranks
 */
export function calculateLeaderboard(
  responses: RawResponse[]
): LeaderboardEntry[] {
  // Step 1: Group by model
  const modelData = groupResponsesByModel(responses);

  // Step 2 & 3: Calculate scores and filter
  const eligibleModels = Array.from(modelData.entries())
    .map(([model, data]) => {
      const scores = data.scores;
      const stats = calculateModelStatistics(model, scores);

      return {
        model,
        provider: data.provider,
        avgScore: stats.mean,
        responseCount: scores.length,
        confidenceInterval: stats.confidenceInterval
      };
    })
    .filter(entry => entry.responseCount >= 5); // Minimum threshold

  // Step 4: Sort
  const sorted = eligibleModels.sort((a, b) => {
    // Primary: average score (descending)
    if (b.avgScore !== a.avgScore) {
      return b.avgScore - a.avgScore;
    }
    // Tie-breaker: response count (descending)
    return b.responseCount - a.responseCount;
  });

  // Step 5: Assign ranks
  return sorted.map((entry, index) => ({
    rank: index + 1,
    model_name: entry.model,
    model_provider: entry.provider,
    average_score: Math.round(entry.avgScore * 100) / 100, // 2 decimal places
    total_responses: entry.responseCount,
    confidence_interval: [
      Math.round(entry.confidenceInterval[0] * 100) / 100,
      Math.round(entry.confidenceInterval[1] * 100) / 100
    ]
  }));
}

/**
 * Helper: Group responses by model
 */
function groupResponsesByModel(
  responses: RawResponse[]
): Map<string, { provider: string; scores: Score[] }> {
  const modelData = new Map<string, { provider: string; scores: Score[] }>();

  responses.forEach(({ model, provider, overall }) => {
    if (!modelData.has(model)) {
      modelData.set(model, { provider, scores: [] });
    }
    modelData.get(model)!.scores.push(overall);
  });

  return modelData;
}

// ============================================================================
// Real-Time Leaderboard Updates
// ============================================================================

/**
 * Incrementally update leaderboard when new rating is added
 *
 * More efficient than recalculating entire leaderboard
 */
export function updateLeaderboardIncremental(
  currentLeaderboard: LeaderboardEntry[],
  newRating: {
    model: string;
    score: Score;
  }
): LeaderboardEntry[] {
  // Find the model in current leaderboard
  const modelIndex = currentLeaderboard.findIndex(
    entry => entry.model_name === newRating.model
  );

  if (modelIndex === -1) {
    // New model - would need full recalculation
    throw new Error('Model not in leaderboard - full recalculation required');
  }

  // Update the entry
  const entry = currentLeaderboard[modelIndex];
  const oldTotal = entry.average_score * entry.total_responses;
  const newTotal = oldTotal + newRating.score;
  const newCount = entry.total_responses + 1;

  const updatedEntry: LeaderboardEntry = {
    ...entry,
    average_score: Math.round((newTotal / newCount) * 100) / 100,
    total_responses: newCount
  };

  // Create new leaderboard with updated entry
  const updated = [...currentLeaderboard];
  updated[modelIndex] = updatedEntry;

  // Re-sort and re-rank
  return resortLeaderboard(updated);
}

/**
 * Re-sort leaderboard and assign new ranks
 */
function resortLeaderboard(
  leaderboard: LeaderboardEntry[]
): LeaderboardEntry[] {
  const sorted = [...leaderboard].sort((a, b) => {
    if (b.average_score !== a.average_score) {
      return b.average_score - a.average_score;
    }
    return b.total_responses - a.total_responses;
  });

  return sorted.map((entry, index) => ({
    ...entry,
    rank: index + 1
  }));
}

// ============================================================================
// Category-Specific Leaderboards
// ============================================================================

interface CategoryResponse extends RawResponse {
  category: string;
}

/**
 * Calculate leaderboard for a specific ethical category
 */
export function calculateCategoryLeaderboard(
  responses: CategoryResponse[],
  category: string
): LeaderboardEntry[] {
  const filtered = responses.filter(r => r.category === category);
  return calculateLeaderboard(filtered);
}

/**
 * Calculate all category leaderboards
 */
export function calculateAllCategoryLeaderboards(
  responses: CategoryResponse[]
): Map<string, LeaderboardEntry[]> {
  const categories = new Set(responses.map(r => r.category));
  const leaderboards = new Map<string, LeaderboardEntry[]>();

  categories.forEach(category => {
    leaderboards.set(
      category,
      calculateCategoryLeaderboard(responses, category)
    );
  });

  return leaderboards;
}

// ============================================================================
// Leaderboard Filtering & Search
// ============================================================================

/**
 * Filter leaderboard by minimum score threshold
 */
export function filterByMinScore(
  leaderboard: LeaderboardEntry[],
  minScore: number
): LeaderboardEntry[] {
  return leaderboard.filter(entry => entry.average_score >= minScore);
}

/**
 * Get top N models from leaderboard
 */
export function getTopN(
  leaderboard: LeaderboardEntry[],
  n: number
): LeaderboardEntry[] {
  return leaderboard.slice(0, n);
}

/**
 * Find model in leaderboard
 */
export function findModel(
  leaderboard: LeaderboardEntry[],
  modelName: string
): LeaderboardEntry | null {
  return leaderboard.find(entry => entry.model_name === modelName) || null;
}

// ============================================================================
// Leaderboard Metrics
// ============================================================================

/**
 * Calculate leaderboard statistics
 */
export function calculateLeaderboardMetrics(leaderboard: LeaderboardEntry[]): {
  topScore: number;
  averageScore: number;
  scoreRange: number;
  totalResponses: number;
  competitivenessIndex: number;
} {
  if (leaderboard.length === 0) {
    return {
      topScore: 0,
      averageScore: 0,
      scoreRange: 0,
      totalResponses: 0,
      competitivenessIndex: 0
    };
  }

  const scores = leaderboard.map(e => e.average_score);
  const topScore = Math.max(...scores);
  const lowestScore = Math.min(...scores);
  const averageScore = scores.reduce((a, b) => a + b) / scores.length;
  const totalResponses = leaderboard.reduce(
    (sum, e) => sum + e.total_responses,
    0
  );

  // Competitiveness: how close are the top models?
  // Lower = more competitive (scores are closer)
  const competitivenessIndex = topScore - lowestScore;

  return {
    topScore,
    averageScore: Math.round(averageScore * 100) / 100,
    scoreRange: topScore - lowestScore,
    totalResponses,
    competitivenessIndex
  };
}

// ============================================================================
// Example Usage
// ============================================================================

if (require.main === module) {
  // Example data
  const mockResponses: RawResponse[] = [
    // Claude Opus - high scores
    ...Array(50).fill(null).map((_, i) => ({
      model: 'anthropic/claude-opus-4.5',
      provider: 'Anthropic',
      overall: (4 + Math.random() > 0.5 ? 1 : 0) as Score,
      created_at: new Date(Date.now() - i * 86400000)
    })),
    // GPT-5.1 - slightly lower
    ...Array(60).fill(null).map((_, i) => ({
      model: 'openai/gpt-5.1-chat',
      provider: 'OpenAI',
      overall: (4 + Math.random() > 0.6 ? 1 : 0) as Score,
      created_at: new Date(Date.now() - i * 86400000)
    })),
    // DeepSeek - medium scores
    ...Array(40).fill(null).map((_, i) => ({
      model: 'deepseek/deepseek-v3.2',
      provider: 'DeepSeek',
      overall: (3 + Math.random() > 0.3 ? 1 : 0) as Score,
      created_at: new Date(Date.now() - i * 86400000)
    })),
    // Grok - fewer responses
    ...Array(8).fill(null).map((_, i) => ({
      model: 'x-ai/grok-4-fast',
      provider: 'xAI',
      overall: (4 + Math.random() > 0.5 ? 1 : 0) as Score,
      created_at: new Date(Date.now() - i * 86400000)
    }))
  ];

  const leaderboard = calculateLeaderboard(mockResponses);

  console.log('\\n🏆 Virtus Protocol Leaderboard\\n');
  console.log('Rank | Model | Provider | Avg Score | Responses');
  console.log('-----|-------|----------|-----------|----------');

  leaderboard.forEach(entry => {
    const medal = entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : '  ';
    console.log(
      `${medal} ${entry.rank} | ${entry.model_name.padEnd(30)} | ${entry.model_provider.padEnd(10)} | ${entry.average_score.toFixed(2)} | ${entry.total_responses}`
    );
  });

  const metrics = calculateLeaderboardMetrics(leaderboard);
  console.log('\\n📊 Leaderboard Metrics:');
  console.log(`  Top Score: ${metrics.topScore.toFixed(2)}`);
  console.log(`  Average Score: ${metrics.averageScore}`);
  console.log(`  Total Responses: ${metrics.totalResponses}`);
  console.log(`  Competitiveness Index: ${metrics.competitivenessIndex.toFixed(3)}`);
}
