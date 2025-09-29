import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const fakeMessages = [
  { id: 1, from: "Alice", text: "Salut !" },
  { id: 2, from: "Moi", text: "Hello !" },
];

export default function MessagePage() {
  const [msg, setMsg] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message envoyé (simulation)");
    setMsg("");
  };

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Discussion</h1>

      <div className="space-y-2">
        {fakeMessages.map((m) => (
          <div key={m.id} className="p-2 rounded bg-muted">
            <strong>{m.from}</strong>: {m.text}
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="flex gap-2 mt-4">
        <Input value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Votre message..." />
        <Button type="submit">Envoyer</Button>
      </form>
    </main>
  );
}
