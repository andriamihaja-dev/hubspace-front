import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function EditProfile() {
  const [form, setForm] = useState({
    name: "John Doe",
    email: "john@example.com",
    bio: "Développeur passionné par le fullstack. Fan de React & NestJS.",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Profil mis à jour (simulation)");
  };

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Modifier le Profil</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium">Nom</label>
          <Input name="name" value={form.name} onChange={handleChange} />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Email</label>
          <Input name="email" type="email" value={form.email} onChange={handleChange} />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Bio</label>
          <Textarea name="bio" value={form.bio} onChange={handleChange} />
        </div>

        <Button type="submit">Enregistrer</Button>
      </form>
    </main>
  );
}
