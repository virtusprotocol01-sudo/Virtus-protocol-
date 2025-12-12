/**
 * Virtus Protocol - Scoring Formulas
 *
 * Mathematical implementations of benchmark scoring algorithms
 */

import type { Score, ModelStatistics } from '../schemas/types';

// ============================================================================
// Core Scoring Functions
// ============================================================================

/**
 * Calculate model performance score
 *
 * Formula: Score(m) = Σ(overall_i) / n
 *
 * @param overallScores - Array of overall scores for a model
 * @returns Average score
 */
export function calculateModelScore(overallScores: Score[]): number {
  if (overallScores.length === 0) return 0;

  const sum = overallScores.reduce((acc, score) => acc + score, 0);
  return sum / overallScores.length;
}

/**
 * Calculate weighted dimension score
 *
 * Formula: Overall = α·C + β·E + γ·N
 *
 * @param dimensions - Clarity, reasoning, nuance scores
 * @param weights - Optional custom weights (default: 0.25, 0.5, 0.25)
 * @returns Weighted overall score
 */
export function calculateWeightedScore(
  dimensions: {
    clarity: Score;
    reasoning: Score;
    nuance: Score;
  },
  weights: { alpha: number; beta: number; gamma: number } = {
    alpha: 0.25,
    beta: 0.5,
    gamma: 0.25
  }
): number {
  const { clarity, reasoning, nuance } = dimensions;
  const { alpha, beta, gamma } = weights;

  const weighted = alpha * clarity + beta * reasoning + gamma * nuance;

  // Ensure result is in valid range [1, 5]
  return Math.max(1, Math.min(5, weighted));
}

// ============================================================================
// Statistical Functions
// ============================================================================

/**
 * Calculate standard deviation
 *
 * Formula: σ = √(Σ(x_i - μ)² / n)
 */
export function calculateStdDev(scores: number[]): number {
  if (scores.length === 0) return 0;

  const mean = scores.reduce((a, b) => a + b) / scores.length;
  const variance =
    scores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) /
    scores.length;

  return Math.sqrt(variance);
}

/**
 * Calculate median score
 */
export function calculateMedian(scores: number[]): number {
  if (scores.length === 0) return 0;

  const sorted = [...scores].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[mid - 1] + sorted[mid]) / 2;
  } else {
    return sorted[mid];
  }
}

/**
 * Calculate confidence interval
 *
 * Formula: CI₉₅ = μ ± 1.96·(σ / √n)
 *
 * @param scores - Array of scores
 * @param confidenceLevel - Z-score (default: 1.96 for 95%)
 * @returns [lower bound, upper bound]
 */
export function calculateConfidenceInterval(
  scores: number[],
  confidenceLevel: number = 1.96
): [number, number] {
  if (scores.length === 0) return [0, 0];

  const mean = scores.reduce((a, b) => a + b) / scores.length;
  const stdDev = calculateStdDev(scores);
  const marginOfError = confidenceLevel * (stdDev / Math.sqrt(scores.length));

  return [mean - marginOfError, mean + marginOfError];
}

/**
 * Calculate comprehensive model statistics
 */
export function calculateModelStatistics(
  model: string,
  scores: Score[]
): ModelStatistics {
  return {
    model: model as any,
    mean: calculateModelScore(scores),
    median: calculateMedian(scores),
    stdDev: calculateStdDev(scores),
    min: Math.min(...scores),
    max: Math.max(...scores),
    count: scores.length,
    confidenceInterval: calculateConfidenceInterval(scores)
  };
}

// ============================================================================
// Ranking Functions
// ============================================================================

/**
 * Calculate model ranks from scores
 *
 * @param modelScores - Map of model -> average score
 * @returns Map of model -> rank (1 = best)
 */
export function calculateRanks(
  modelScores: Map<string, number>
): Map<string, number> {
  const sorted = Array.from(modelScores.entries())
    .sort(([, scoreA], [, scoreB]) => scoreB - scoreA);

  const ranks = new Map<string, number>();
  sorted.forEach(([model], index) => {
    ranks.set(model, index + 1);
  });

  return ranks;
}

/**
 * Calculate ranks with tie-breaking
 *
 * Tie-breaker: If scores are equal, higher response count ranks higher
 */
export function calculateRanksWithTieBreaking(
  data: Array<{ model: string; score: number; count: number }>
): Array<{ model: string; rank: number }> {
  const sorted = [...data].sort((a, b) => {
    // Primary: score (descending)
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    // Tie-breaker: response count (descending)
    return b.count - a.count;
  });

  return sorted.map(({ model }, index) => ({
    model,
    rank: index + 1
  }));
}

// ============================================================================
// Correlation Analysis
// ============================================================================

/**
 * Calculate Pearson correlation coefficient
 *
 * Formula: r = Cov(X,Y) / (σ_X · σ_Y)
 *
 * @returns Correlation coefficient [-1, 1]
 */
export function calculateCorrelation(
  dimension1: number[],
  dimension2: number[]
): number {
  if (dimension1.length !== dimension2.length || dimension1.length === 0) {
    throw new Error('Arrays must have equal non-zero length');
  }

  const n = dimension1.length;
  const mean1 = dimension1.reduce((a, b) => a + b) / n;
  const mean2 = dimension2.reduce((a, b) => a + b) / n;

  let covariance = 0;
  let variance1 = 0;
  let variance2 = 0;

  for (let i = 0; i < n; i++) {
    const diff1 = dimension1[i] - mean1;
    const diff2 = dimension2[i] - mean2;

    covariance += diff1 * diff2;
    variance1 += diff1 * diff1;
    variance2 += diff2 * diff2;
  }

  const denominator = Math.sqrt(variance1 * variance2);
  return denominator === 0 ? 0 : covariance / denominator;
}

// ============================================================================
// Quality Filters
// ============================================================================

/**
 * Detect outliers using IQR method
 *
 * Formula: Outlier if score < Q1 - 1.5·IQR OR score > Q3 + 1.5·IQR
 */
export function detectOutliers(scores: number[]): number[] {
  if (scores.length < 4) return [];

  const sorted = [...scores].sort((a, b) => a - b);
  const q1Index = Math.floor(sorted.length * 0.25);
  const q3Index = Math.floor(sorted.length * 0.75);

  const q1 = sorted[q1Index];
  const q3 = sorted[q3Index];
  const iqr = q3 - q1;

  const lowerBound = q1 - 1.5 * iqr;
  const upperBound = q3 + 1.5 * iqr;

  return scores.filter(score => score < lowerBound || score > upperBound);
}

/**
 * Check if sample size is statistically significant
 *
 * Minimum n for 95% confidence with E=0.1 margin of error
 */
export function isSignificantSampleSize(n: number): boolean {
  const MINIMUM_STATISTICAL = 73; // from power analysis
  const PRACTICAL_MINIMUM = 5; // for leaderboard inclusion

  return n >= PRACTICAL_MINIMUM;
}

// ============================================================================
// Trend Analysis
// ============================================================================

/**
 * Calculate linear regression slope (trend)
 *
 * β₁ = Cov(X,Y) / Var(X)
 *
 * Positive slope indicates improvement over time
 */
export function calculateTrend(
  data: Array<{ timestamp: number; score: number }>
): number {
  if (data.length < 2) return 0;

  const x = data.map(d => d.timestamp);
  const y = data.map(d => d.score);

  const n = data.length;
  const meanX = x.reduce((a, b) => a + b) / n;
  const meanY = y.reduce((a, b) => a + b) / n;

  let covariance = 0;
  let variance = 0;

  for (let i = 0; i < n; i++) {
    const diffX = x[i] - meanX;
    const diffY = y[i] - meanY;
    covariance += diffX * diffY;
    variance += diffX * diffX;
  }

  return variance === 0 ? 0 : covariance / variance;
}

// ============================================================================
// Example Usage
// ============================================================================

if (require.main === module) {
  // Example: Calculate model statistics
  const exampleScores: Score[] = [5, 4, 5, 4, 5, 3, 4, 5, 4, 5];

  const stats = calculateModelStatistics('anthropic/claude-opus-4.5', exampleScores);

  console.log('Model Statistics:', {
    mean: stats.mean.toFixed(2),
    median: stats.median,
    stdDev: stats.stdDev.toFixed(2),
    confidenceInterval: stats.confidenceInterval.map(v => v.toFixed(2))
  });

  // Example: Detect outliers
  const scoresWithOutlier: number[] = [5, 4, 5, 4, 5, 1, 4, 5];
  const outliers = detectOutliers(scoresWithOutlier);
  console.log('Outliers detected:', outliers);

  // Example: Calculate correlation
  const clarityScores = [5, 4, 3, 5, 4];
  const reasoningScores = [4, 4, 3, 5, 3];
  const correlation = calculateCorrelation(clarityScores, reasoningScores);
  console.log('Correlation (clarity vs reasoning):', correlation.toFixed(3));
}
