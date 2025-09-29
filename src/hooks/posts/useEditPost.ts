import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api';

export interface EditPostPayload {
  postId: number | string;
  content: string;
  mediaIds?: number[];
}

export function useEditPost() {
  return useMutation({
    mutationFn: async ({ postId, ...payload }: EditPostPayload) => {
      const res = await api.patch(`/posts/${postId}`, payload);
      return res.status; // 🔥 On retourne juste le status HTTP
    },
    onSuccess: (statusCode) => {
      console.log('✅ Post modifié. HTTP:', statusCode);
    },
    onError: (err) => {
      console.error('❌ Erreur édition. HTTP:');
    },
  });
}
