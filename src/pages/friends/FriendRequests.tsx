import { Button } from "@/components/ui/button";
import {
  useGetPendingRequests,
  useAcceptFriendRequest,
  useRejectFriendRequest,
} from "@/hooks/friendships/useFriendships"; // adapte le chemin si besoin
import { Loader2 } from "lucide-react";

export default function FriendRequests() {
  const { data: pendingRequests, isLoading } = useGetPendingRequests();
  const { mutate: acceptFriend, isPending: isAccepting } = useAcceptFriendRequest();
  const { mutate: rejectFriend, isPending: isRejecting } = useRejectFriendRequest();
  

  return (
    <main className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Demandes d’amis</h1>

      {isLoading && (
        <div className="flex justify-center">
          <Loader2 className="animate-spin" />
        </div>
      )}

      {!isLoading && pendingRequests?.length === 0 && (
        <p className="text-muted-foreground">Aucune demande pour l’instant.</p>
      )}

      {pendingRequests?.map((req: any) => {
        const otherUser =
          req.requester.id !== req.addressee.id
            ? req.requester
            : req.addressee;

        return (
          <div
            key={req.id}
            className="flex justify-between items-center p-2 border rounded"
          >
            <span>{otherUser.username}</span>
            <div className="flex gap-2">
              <Button
                disabled={isAccepting}
                onClick={() => acceptFriend(req.id)}
              >
                Accepter
              </Button>
              <Button
                variant="destructive"
                disabled={isRejecting}
                onClick={() => rejectFriend(req.id)}
              >
                Refuser
              </Button>
            </div>
          </div>
        );
      })}
    </main>
  );
}
