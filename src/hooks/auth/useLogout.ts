// hooks/auth/useLogout.ts
import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api';

export function useLogout() {
  return useMutation({
    mutationFn: async () => {
      await api.post('/auth/logout');
    },
  });
}
