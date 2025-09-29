import { Input } from "@/components/ui/input"

export default function Disconnected() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Vous êtes déconnecté</h1>
      <p className="mb-2">Veuillez vous connecter :</p>
      <Input placeholder="Email" className="mb-2" />
      <Input placeholder="Mot de passe" type="password" />
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Se connecter</button>
    </div>
  )
}
