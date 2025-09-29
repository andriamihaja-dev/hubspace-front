import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function EditPost() {
  // Donnée simulée à modifier
  const [content, setContent] = useState("Voici le contenu initial du post.");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Post modifié (simulation)");
  };

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Modifier le post</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button type="submit">Mettre à jour</Button>
      </form>
    </main>
  );
}
