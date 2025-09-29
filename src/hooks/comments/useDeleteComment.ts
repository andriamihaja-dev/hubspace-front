import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api';

export function useDeleteComment() {
  return useMutation({
    mutationFn: async (commentId: number | string) => {
      const res = await api.delete(`/comments/${commentId}`);
      return res.status;
    },
    onSuccess: (status) => {
      console.log('✅ Commentaire supprimé. HTTP:', status);
    },
    onError: (err) => {
      console.error('❌ Erreur suppression commentaire.');
    },
  });
}
