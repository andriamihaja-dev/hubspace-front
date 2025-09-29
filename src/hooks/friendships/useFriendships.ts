import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api'

export const useGetMyFriends = () =>
  useQuery({
    queryKey: ['friends'],
    queryFn: async () => {
      const { data } = await api.get('/friendships/me');
      return data.data;
    },
  });

export const useGetPendingRequests = () =>
  useQuery({
    queryKey: ['friend-requests'],
    queryFn: async () => {
      const { data } = await api.get('/friendships/pending');
      return data.data;
    },
  });

export const useSendFriendRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (addresseeId: number) => {
      const { data } = await api.post('/friendships/request', { addresseeId });
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['friend-requests'] });
    },
  });
};

export const useAcceptFriendRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await api.patch(`/friendships/accept/${id}`);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['friend-requests'] });
      queryClient.invalidateQueries({ queryKey: ['friends'] });
    },
  });
};

export const useRejectFriendRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await api.patch(`/friendships/reject/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['friend-requests'] });
    },
  });
};

export const useRemoveFriend = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/friendships/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['friends'] });
    },
  });
};
export const useGetFriends = () =>
  useQuery({
    queryKey: ["friends"],
    queryFn: async () => {
      const res = await api.get("/friendships/me");
      return res.data.data;
    },
  });

