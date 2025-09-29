import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function UserProfile() {
  const fakeUser = {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    bio: "Développeur passionné par le fullstack. Fan de React & NestJS.",
    avatar: "https://i.pravatar.cc/150?u=1"
  };

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Profil Utilisateur</h1>

      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <img src={fakeUser.avatar} alt="avatar" className="w-16 h-16 rounded-full" />
          <div>
            <CardTitle>{fakeUser.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{fakeUser.email}</p>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm">{fakeUser.bio}</p>
        </CardContent>
      </Card>
    </main>
  );
}
