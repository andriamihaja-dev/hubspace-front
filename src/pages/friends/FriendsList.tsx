import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useGetFriends } from "@/hooks/friendships/useFriendships";
import { Loader2 } from "lucide-react";
import { useUserContext } from "@/context/UserContext";
import { Friend } from "@/hooks/friendships/types";

export default function FriendsList() {
  const { user, loading: userLoading } = useUserContext();
  const { data: friends, isLoading: friendsLoading } = useGetFriends();

  if (userLoading || !user) {
    return (
      <main className="max-w-xl mx-auto p-6 space-y-4">
        <h1 className="text-2xl font-bold mb-4">Mes amis</h1>
        <div className="flex justify-center">
          <Loader2 className="animate-spin" />
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Mes amis</h1>

      {friendsLoading && (
        <div className="flex justify-center">
          <Loader2 className="animate-spin" />
        </div>
      )}

      {!friendsLoading && friends?.length === 0 && (
        <p className="text-muted-foreground">
          Vous n’avez aucun ami pour l’instant.
        </p>
      )}

      {friends?.map((friend: Friend) => (
        <div
          key={friend.friendshipId}
          className="flex justify-between items-center p-2 border rounded"
        >
          <span className="font-medium">
            {friend.username ?? "Utilisateur inconnu"}
          </span>
          <Link to={`/profile/${friend.id}`}>
            <Button variant="outline">Voir profil</Button>
          </Link>
        </div>
      ))}
    </main>
  );
}
