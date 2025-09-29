// hooks/auth/useMe.ts
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export interface MeResponse {
  id: number;
  username: string;
  // Ajoute d'autres champs selon ton DTO
}

export function useMe() {
  return useQuery<MeResponse>({
    queryKey: ['me'],
    queryFn: async () => {
      const res = await api.get('/auth/me');
      return res.data.data as MeResponse;
    },
    retry: false,
  });
}
