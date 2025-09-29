import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'

export interface CommentResponseDto {
  id: number;
  content: string;
  createdAt: string;
  author: {
    id: number;
    username: string;
    avatarUrl?: string;
  };
}

export function useComments(postId: number | string, enabled: boolean = true) {
  return useQuery<CommentResponseDto[]>({
    queryKey: ['comments', postId],
    queryFn: async () => {
      const res = await api.get(`/posts/${postId}/comments`);
      return res.data.data as CommentResponseDto[];
    },
    staleTime: 10000,
    enabled,
  });
}

