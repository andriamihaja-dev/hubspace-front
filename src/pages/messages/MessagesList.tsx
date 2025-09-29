import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const fakeConversations = [
  { id: 1, name: "Alice", lastMessage: "À ce soir !" },
  { id: 2, name: "Groupe Projet", lastMessage: "Qui fait le frontend ?" },
];

export default function MessagesList() {
  return (
    <main className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Mes discussions</h1>

      {fakeConversations.map((conv) => (
        <Link to={`/messages/${conv.id}`} key={conv.id}>
          <Card>
            <CardHeader>
              <CardTitle>{conv.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{conv.lastMessage}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </main>
  );
}
