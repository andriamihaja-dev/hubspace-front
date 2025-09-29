import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      const res = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, password }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Inscription échouée');
      }

      alert('Compte créé avec succès. Connectez-vous.');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 text-white">
      <div className="w-full max-w-sm bg-gray-800 p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Créer un compte</h1>

        <div className="space-y-4">
          <Input
            placeholder="Adresse email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-700 border-none text-white placeholder-gray-400"
          />
          <Input
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-gray-700 border-none text-white placeholder-gray-400"
          />
          <Input
            placeholder="Mot de passe"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-700 border-none text-white placeholder-gray-400"
          />

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <Button onClick={handleRegister} className="w-full bg-purple-600 hover:bg-purple-700 text-white">
            S'inscrire
          </Button>
        </div>
      </div>
    </div>
  );
}
