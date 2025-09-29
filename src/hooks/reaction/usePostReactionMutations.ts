// src/hooks/reaction/usePostReactionMutations.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/lib/axios.interceptor'

export interface ReactionDto {
  type: string        // “LIKE” | “DISLIKE” | “LOVE” | …
  target_type: 'POST' | 'COMMENT'
  target_id: number
}


export function useAddPostReaction() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (dto: ReactionDto) => api.post('/reactions', dto),
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({ queryKey: ['post-reactions', variables.target_id] })
    },
  })
}

export function useChangePostReaction() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (dto: ReactionDto) => api.put('/reactions', dto),
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({ queryKey: ['post-reactions', variables.target_id] })
    },
  })
}

export function useRemovePostReaction() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (dto: ReactionDto) =>
      api.delete('/reactions', { data: dto }),
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({ queryKey: ['post-reactions', variables.target_id] })
    },
  })
}
