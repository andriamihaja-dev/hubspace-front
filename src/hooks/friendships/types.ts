export interface User {
  id: number;
  email: string;
  username: string;
  avatarUrl?: string;
}

export interface Friendship {
  id: number;
  requester: User | null;
  addressee: User | null;
}

export interface Friend {
  id: number;
  username: string;
  email: string;
  avatarUrl?: string;
  friendshipId: number;
  created_at: string;
}

