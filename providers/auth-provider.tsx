'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import { profileService } from '@/services/profile.service';
import { UserProfile } from '@/types/user';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  isAdmin: boolean;
  loading: boolean;
  profileLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  isAdmin: false,
  loading: true,
  profileLoading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    let authStateRequest = 0;

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      const requestId = ++authStateRequest;
      setLoading(true);
    let profileRequest = 0;
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      const request = ++profileRequest;
      setUser(currentUser);
      setLoading(false);
      setProfileLoading(Boolean(currentUser));

      if (currentUser) {
        try {
          const userProfile = await profileService.getProfile(currentUser.uid);
          if (requestId === authStateRequest) {
            setProfile(userProfile);
          }
        } catch (error) {
          console.error('Error al obtener perfil del usuario:', error);
          if (requestId === authStateRequest) {
            setProfile(null);
          }
        }
      } else {
      if (!currentUser) {
        setProfile(null);
        return;
      }

      if (requestId === authStateRequest) {
        setLoading(false);
      }
    }, (error) => {
      authStateRequest += 1;
      console.error('Error al verificar la sesión de Firebase:', error);
      setUser(null);
      setProfile(null);
      setLoading(false);
    });

    return () => {
      authStateRequest += 1;
      void profileService.getProfile(currentUser.uid)
        .then((userProfile) => {
          if (request === profileRequest) {
            setProfile(userProfile);
            setProfileLoading(false);
          }
        })
        .catch((error) => {
          console.error('Error al obtener perfil del usuario:', error);
          if (request === profileRequest) {
            setProfile(null);
            setProfileLoading(false);
          }
        });
    });

    return () => {
      profileRequest += 1;
      unsubscribe();
    };
  }, []);

  const isAdmin = profile?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, profile, isAdmin, loading, profileLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);