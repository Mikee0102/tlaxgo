'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/providers/auth-provider';

export default function AuthGuard({
  children,
  requireAdmin = false,
}: {
  children: React.ReactNode;
  requireAdmin?: boolean;
}) {
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();
  const isAuthorized = Boolean(user) && (!requireAdmin || isAdmin);

  useEffect(() => {
    if (loading || isAuthorized) return;

    router.replace(user ? '/dashboard' : '/auth/login');
  }, [isAuthorized, loading, router, user]);

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-slate-950 text-sky-400"
        role="status"
        aria-label="Verificando sesión"
      >
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!isAuthorized) return null;

  return children;
}
