import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { AxiosError } from 'axios';

export interface CreatePostPayload {
  content: string;
  mediaIds?: number[];
}

export function useCreatePost() {
  return useMutation({
    mutationFn: async (payload: CreatePostPayload) => {
      const res = await api.post('/posts', payload);
      return {
        data: res.data?.data,
        statusCode: res.status,
      };
    },
    onSuccess: (res) => {
      console.log('✅ Post créé ! Code HTTP:', res.statusCode);
    },
    onError: (err: AxiosError) => {
      const status = err.response?.status;
      console.error(`❌ Erreur (${status}) :`);
    },
  });
}
