import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

// ============================================
// FUNCIONES EXISTENTES
// ============================================

export async function signIn(email: string, password: string) {
  return supabase.auth.signInWithPassword({
    email,
    password,
  });
}

export async function signUp(
  email: string,
  password: string,
  fullName?: string,
) {
  return supabase.auth.signUp({
    email,
    password,
    options: {
      redirectTo: `${typeof window !== "undefined" ? window.location.origin : ""}/auth/callback`,
      queryParams: {
        prompt: "select_account",
        access_type: "offline",
      },
    },
  });
}

export async function resetPassword(email: string) {
  return supabase.auth.resetPasswordForEmail(email);
}

export async function updatePassword(password: string) {
  return supabase.auth.updateUser({
    password,
  });
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  return true;
}

export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
}

export async function getSession() {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) throw error;
  return session;
}

export const authService = {
  signIn,
  signUp,
  resetPassword,
  updatePassword,
  signOut,
  getCurrentUser,
  getSession,
};

// ============================================
// FUNCIONES ADICIONALES PARA EL AUTH-PROVIDER
// ============================================

export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) {
    console.error('Error al obtener perfil:', error);
    return null;
  }
  return data;
};

export const loginWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${typeof window !== "undefined" ? window.location.origin : ""}/auth/callback`
    }
  });
  
  if (error) {
    console.error('Error al iniciar con Google:', error);
    throw error;
  }
};

export const signInWithGoogle = loginWithGoogle;