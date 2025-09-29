// src/hooks/reaction/types.ts
export interface ReactionDto {
  type: string        // “LIKE” | “DISLIKE” | “LOVE” | …
  target_type: 'POST' | 'COMMENT'
  target_id: number
}
