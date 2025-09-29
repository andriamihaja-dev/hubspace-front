import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api';

export interface EditCommentPayload {
  commentId: number | string;
  content: string;
}

export function useEditComment() {
  return useMutation({
    mutationFn: async ({ commentId, ...payload }: EditCommentPayload) => {
      const res = await api.patch(`/comments/${commentId}`, payload);
      return res.status;
    },
    onSuccess: (status) => {
      console.log('✅ Commentaire modifié. HTTP:', status);
    },
    onError: (err) => {
      console.error('❌ Erreur modification commentaire.');
    },
  });
}
