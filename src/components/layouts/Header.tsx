import { useNavigate, NavLink } from 'react-router-dom';
import { useLogout } from '@/hooks/auth/useLogout';

export default function Header() {
  const logout = useLogout();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout.mutateAsync();
    navigate('/AuthGate');
  };

  return (
    <header className="w-full bg-zinc-950 border-b border-zinc-800 shadow-sm px-3 py-2 flex items-center justify-between fixed top-0 z-40">
      <nav className="flex items-center gap-4">
        <NavLink
          to="/feed"
          className="flex items-center gap-1 font-bold text-lg text-emerald-400 hover:text-white transition"
        >
          <span style={{ fontSize: '1.3em' }}>🏠</span>
          HubSpace
        </NavLink>
        <NavLink
          to="/messages"
          className="flex items-center gap-1 text-sm text-zinc-300 hover:text-emerald-400 px-2 py-1 rounded transition"
        >
          💬 Messages
        </NavLink>
        <NavLink
          to="/friends"
          className="flex items-center gap-1 text-sm text-zinc-300 hover:text-emerald-400 px-2 py-1 rounded transition"
        >
          👥 Amis
        </NavLink>
        <NavLink
          to="/drive"
          className="flex items-center gap-1 text-sm text-zinc-300 hover:text-emerald-400 px-2 py-1 rounded transition"
        >
          📁 Drive
        </NavLink>
      </nav>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white text-xs px-4 py-2 rounded-xl shadow transition flex items-center"
      >
        Déconnexion
      </button>
    </header>
  );
}
