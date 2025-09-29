// src/pages/AuthGate.tsx
import { Navigate } from 'react-router-dom';
import { useUser } from '@/context/useUser';
import Login from './Login';
import Register from './Register';
import { useState } from 'react';

export default function AuthGate() {
  const { user } = useUser();
  const [mode, setMode] = useState<'login' | 'register'>('login');

  if (user) return <Navigate to="/feed" replace />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
      <div className="w-full max-w-md rounded-xl shadow-2xl border border-zinc-700 overflow-hidden">
        {/* Onglets */}
        <div className="flex">
          <button
            onClick={() => setMode('login')}
            className={`w-1/2 py-3 text-sm font-semibold transition-colors ${
              mode === 'login'
                ? 'bg-blue-800 text-white'
                : 'bg-zinc-800 text-zinc-400 hover:bg-blue-900'
            }`}
          >
            Connexion
          </button>
          <button
            onClick={() => setMode('register')}
            className={`w-1/2 py-3 text-sm font-semibold transition-colors ${
              mode === 'register'
                ? 'bg-purple-800 text-white'
                : 'bg-zinc-800 text-zinc-400 hover:bg-purple-900'
            }`}
          >
            Inscription
          </button>
        </div>

        {/* Contenu */}
        <div className="p-6 bg-zinc-900">
          {mode === 'login' ? <Login /> : <Register />}
        </div>
      </div>
    </div>
  );
}
