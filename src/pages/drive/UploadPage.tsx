import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function UploadPage() {
  const [fileName, setFileName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Fichier "${fileName}" simulé comme uploadé`);
    setFileName("");
  };

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Uploader un fichier</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder="Nom du fichier (simulé)"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
        />
        <Button type="submit">Uploader</Button>
      </form>
    </main>
  );
}
