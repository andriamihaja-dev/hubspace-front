export interface FeedPost {
  id: number;
  content: string;
  createdAt: string;

  author: {
    id: number;
    username: string;
    avatarUrl?: string;
  };

  medias: {
    id: number;
    url: string;
    mimetype: string;
  }[];

  image?: string;

  // ✅ Tableau complet des réactions (tous les utilisateurs)
  reactions: {
    id: number;
    type: string; // ex: "❤️"
    userId: number;
  }[];

  // ✅ Réaction de l'utilisateur connecté
  userReaction?: {
    type: string; // ex: "❤️"
  };

  // ✅ Compteur des réactions
  reactionCounts: Record<string, number>;

  // ✅ Nombre de commentaires (depuis Prisma _count)
  _count: {
    comments: number;
  };
}
