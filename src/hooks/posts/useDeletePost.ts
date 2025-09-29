import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api';

export function useDeletePost() {
  return useMutation({
    mutationFn: async (postId: number | string) => {
      const res = await api.delete(`/posts/${postId}`);
      return res.status;
    },
    onSuccess: (statusCode) => {
      console.log('✅ Post supprimé avec succès. HTTP:', statusCode);
    },
    onError: (err) => {
      console.error('❌ Erreur suppression. HTTP:');
    },
  });
}
