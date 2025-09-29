import { Button } from "@/components/ui/button";

const fakeMembers = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

export default function GroupMembers() {
  return (
    <main className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Membres du groupe</h1>

      {fakeMembers.map((m) => (
        <div key={m.id} className="flex justify-between items-center p-2 border rounded">
          <span>{m.name}</span>
          <Button variant="destructive">Retirer</Button>
        </div>
      ))}
    </main>
  );
}
