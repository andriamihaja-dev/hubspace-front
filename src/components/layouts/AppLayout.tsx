import Header from '@/components/layouts/Header';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <Header /> {/* ✅ On déporte tout dans ce composant */}
      <main className="p-6">{children}</main>
    </div>
  );
}
