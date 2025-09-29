import { useQuery } from "@tanstack/react-query"
import api from "@/lib/axios.interceptor"

export function usePostReactions(postId: number) {
  return useQuery({
    queryKey: ['post-reactions', postId],
    queryFn: async () => {
      const res = await api.get(`/reactions/post/${postId}`)
      return res.data?.data
    },
    select: (data) => {
      const counts: Record<string, number> = {}
      let currentUserReaction = ""

      for (const r of data) {
        counts[r.type] = (counts[r.type] || 0) + 1
        if (r.isMine) currentUserReaction = r.type
      }

      return {
        reactionCounts: counts,
        userReaction: currentUserReaction,
      }
    },
  })
}
