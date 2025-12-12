/**
 * Virtus Protocol - Type Definitions
 * @version 1.0.0
 */

// ============================================================================
// Core Domain Types
// ============================================================================

export interface AIModel {
  id: string;
  name: string;
  provider: string;
  description: string;
}

export interface Dilemma {
  id: string;
  title: string;
  description: string;
  category: EthicalCategory;
  is_standard: boolean;
  created_at: Date;
}

export interface ModelResponse {
  id: string;
  dilemma_id: string;
  model_name: string;
  model_provider: string;
  response_text: string;
  created_at: Date;
  error?: string;
}

export interface Rating {
  id: string;
  response_id: string;
  clarity: Score;
  ethical_reasoning: Score;
  nuance: Score;
  overall: Score;
  created_at: Date;
}

// ============================================================================
// Enums & Literals
// ============================================================================

export type Score = 1 | 2 | 3 | 4 | 5;

export type EthicalCategory =
  | "Utilitarian Ethics"
  | "Deontological Ethics"
  | "Technology Ethics"
  | "AI Ethics"
  | "Medical Ethics"
  | "Privacy & Security"
  | "Professional Ethics"
  | "Bioethics"
  | "Environmental Ethics"
  | "Data Ethics"
  | "AI Consciousness"
  | "Media Ethics";

export const AVAILABLE_MODELS = [
  "openai/gpt-5.1-chat",
  "anthropic/claude-opus-4.5",
  "deepseek/deepseek-v3.2",
  "x-ai/grok-4-fast"
] as const;

export type ModelId = typeof AVAILABLE_MODELS[number];

// ============================================================================
// API Request/Response Types
// ============================================================================

export interface QueryModelsRequest {
  dilemmaId: string;
  dilemmaText: string;
  modelIds: ModelId[];
}

export interface QueryModelsResponse {
  responses: Array<{
    model: ModelId;
    response: string;
    error?: string;
  }>;
}

export interface SubmitRatingRequest {
  responseId: string;
  clarity: Score;
  ethicalReasoning: Score;
  nuance: Score;
  overall: Score;
}

export interface SubmitRatingResponse {
  success: boolean;
  rating: Rating;
}

export interface LeaderboardEntry {
  rank: number;
  model_name: string;
  model_provider: string;
  average_score: number;
  total_responses: number;
  confidence_interval?: [number, number];
}

export interface LeaderboardResponse {
  leaderboard: LeaderboardEntry[];
  last_updated: Date;
}

// ============================================================================
// Benchmark Calculation Types
// ============================================================================

export interface DimensionScores {
  clarity: number;
  ethicalReasoning: number;
  nuance: number;
  overall: number;
}

export interface ModelStatistics {
  model: ModelId;
  mean: number;
  median: number;
  stdDev: number;
  min: number;
  max: number;
  count: number;
  confidenceInterval: [number, number];
}

export interface CategoryPerformance {
  category: EthicalCategory;
  score: number;
  responseCount: number;
  rank: number;
}

export interface PerformanceTrend {
  date: Date;
  score: number;
  responseCount: number;
}

// ============================================================================
// Validation Schemas (Zod)
// ============================================================================

import { z } from 'zod';

export const ScoreSchema = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5)
]);

export const RatingSchema = z.object({
  responseId: z.string().uuid(),
  clarity: ScoreSchema,
  ethicalReasoning: ScoreSchema,
  nuance: ScoreSchema,
  overall: ScoreSchema
});

export const DilemmaSchema = z.object({
  title: z.string().min(10).max(200),
  description: z.string().min(50).max(5000),
  category: z.enum([
    "Utilitarian Ethics",
    "Deontological Ethics",
    "Technology Ethics",
    "AI Ethics",
    "Medical Ethics",
    "Privacy & Security",
    "Professional Ethics",
    "Bioethics",
    "Environmental Ethics",
    "Data Ethics",
    "AI Consciousness",
    "Media Ethics"
  ]),
  isStandard: z.boolean().optional()
});

export const QueryModelsSchema = z.object({
  dilemmaId: z.string().uuid(),
  dilemmaText: z.string().min(20),
  modelIds: z.array(z.enum([
    "openai/gpt-5.1-chat",
    "anthropic/claude-opus-4.5",
    "deepseek/deepseek-v3.2",
    "x-ai/grok-4-fast"
  ])).min(1).max(2)
});

// ============================================================================
// Utility Types
// ============================================================================

export type AsyncResult<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

export interface PaginationParams {
  page: number;
  limit: number;
  orderBy?: string;
  order?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
