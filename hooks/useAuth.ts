'use client';

import { useAuth as useAuthContext } from '@/providers/auth-provider';
import { auth } from '@/lib/firebase/config';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { profileService } from '@/services/profile.service';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const context = useAuthContext();
  const router = useRouter();

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Sincroniza o crea el perfil en Firestore sin errores de tipo
    await profileService.updateProfile(user.uid, {
      email: user.email || '',
      name: user.displayName || undefined,
      photoURL: user.photoURL || undefined,
      avatar_url: user.photoURL || undefined,
      lastLogin: new Date().toISOString(),
    });

    router.push('/dashboard');
    return user;
  };

  const logout = async () => {
    await signOut(auth);
    router.push('/auth/login');
  };

  return {
    ...context,
    loginWithGoogle,
    logout,
  };
}