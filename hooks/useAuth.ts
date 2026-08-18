'use client';

import { createClient } from '@/lib/supabase/client';
import { useState, useEffect } from 'react';

const supabase = createClient();

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    }

    loadUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // ============================================
  // LOGIN CON GOOGLE (lo que usa el login de tu amigo)
  // ============================================
  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });
    
    if (error) {
      console.error('Error al iniciar con Google:', error);
      throw error;
    }
  };

  // ============================================
  // CERRAR SESIÓN
  // ============================================
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error al cerrar sesión:', error);
      throw error;
    }
    setUser(null);
  };

  // ============================================
  // VERIFICAR SI ES ADMIN
  // ============================================
  const isAdmin = user?.email === 'xciclos@gmail.com';

  return {
    user,
    loading,
    isAdmin,
    loginWithGoogle,  // ← AHORA SÍ EXISTE
    signOut,
    isAuthenticated: !!user
  };
}