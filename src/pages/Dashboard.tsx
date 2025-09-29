import { useUser } from '@/context/useUser';


export default function Dashboard() {
  const { user } = useUser();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Bienvenue, {user?.username}</h1>
    </div>
  );
}
