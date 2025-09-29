import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api';

export interface CreateCommentPayload {
  postId: number | string;
  content: string;
}

export function useCreateComment() {
  return useMutation({
    mutationFn: async ({ postId, content }: CreateCommentPayload) => {
      const res = await api.post(`/posts/${postId}/comments`, { content });
      return res.status;
    },
    onSuccess: (status) => {
      console.log('✅ Commentaire créé. HTTP:', status);
    },
    onError: (err) => {
      console.error('❌ Erreur création commentaire.');
    },
  });
}
