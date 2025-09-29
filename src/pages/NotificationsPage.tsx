import { Badge } from "@/components/ui/badge";

const fakeNotifications = [
  {
    id: 1,
    type: "friend_request",
    content: "Alice vous a envoyé une demande d'ami.",
    date: "Il y a 2 heures",
    unread: true,
  },
  {
    id: 2,
    type: "comment",
    content: "Bob a commenté votre post.",
    date: "Hier",
    unread: false,
  },
];

export default function NotificationsPage() {
  return (
    <main className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>

      {fakeNotifications.length === 0 && (
        <p className="text-muted-foreground">Aucune notification pour le moment.</p>
      )}

      {fakeNotifications.map((notif) => (
        <div key={notif.id} className="flex justify-between items-center p-2 border rounded">
          <div>
            <p>{notif.content}</p>
            <p className="text-sm text-muted-foreground">{notif.date}</p>
          </div>
          {notif.unread && <Badge variant="secondary">Nouveau</Badge>}
        </div>
      ))}
    </main>
  );
}
