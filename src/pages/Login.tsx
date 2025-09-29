// src/pages/Login.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUser } from '@/context/useUser';
import { useLogin } from '@/hooks/auth/useLogin'; 

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUser();
  const login = useLogin();

  const handleLogin = async () => {
    try {
      await login.mutateAsync({ email, password });

      // 👇 récupérer l'utilisateur connecté après login
      const res = await fetch('http://localhost:3000/auth/me', {
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('Erreur lors de la récupération de l’utilisateur');
      }

      const { data } = await res.json();
      setUser(data);

      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la connexion');
    }
  };

  return (
     <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 text-white">
  <div className="w-full max-w-sm bg-gray-800 p-6 rounded-xl shadow-md">
    <h1 className="text-2xl font-bold text-center mb-6">Connexion</h1>

    <div className="space-y-4">
      <Input
        placeholder="Adresse email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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

      <Button
        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        onClick={handleLogin}
        disabled={login.isPending}
      >
        {login.isPending ? 'Connexion...' : 'Se connecter'}
      </Button>
    </div>
  </div>
</div>

  );
}
