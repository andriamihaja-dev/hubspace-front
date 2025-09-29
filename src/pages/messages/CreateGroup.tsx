import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function CreateGroup() {
  const [groupName, setGroupName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Groupe "${groupName}" créé (simulation)`);
    setGroupName("");
  };

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Créer un groupe</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Nom du groupe"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <Button type="submit">Créer</Button>
      </form>
    </main>
  );
}
