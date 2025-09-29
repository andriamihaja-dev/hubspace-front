// hooks/posts/usePost.ts
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { FeedPost } from './types';

export function usePost(postId: number | string) {
  return useQuery<FeedPost>({
    queryKey: ['post', postId],
    queryFn: async () => {
      const res = await api.get(`/posts/${postId}`);
      return res.data.data as FeedPost;
    },
    enabled: !!postId,
  });
}
