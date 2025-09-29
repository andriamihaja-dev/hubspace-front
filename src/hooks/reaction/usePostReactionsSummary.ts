// src/hooks/reactions/usePostReactionsSummary.ts
import { useQuery } from '@tanstack/react-query'
import api from '@/lib/axios.interceptor'

export interface PostReactionsSummary {
  counts: Record<string, number>
  mine?: string
}

export function usePostReactionsSummary(postId: number) {
  return useQuery<PostReactionsSummary>({
    queryKey: ['post-reactions-summary', postId],
    queryFn: async () => {
      const res = await api.get(`/reactions/post/${postId}/summary`)
      return res.data.data
    },
    staleTime: 10000,
    retry: 1,
  })
}
