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
    let profileRequest = 0;

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      const requestId = ++profileRequest;

      setUser(currentUser);
      setLoading(false);
      setProfileLoading(Boolean(currentUser));

      if (!currentUser) {
        setProfile(null);
        setProfileLoading(false);
        return;
      }

      void profileService
        .getProfile(currentUser.uid)
        .then((userProfile) => {
          if (requestId === profileRequest) {
            setProfile(userProfile);
            setProfileLoading(false);
          }
        })
        .catch((error) => {
          console.error('Error al obtener perfil del usuario:', error);
          if (requestId === profileRequest) {
            setProfile(null);
            setProfileLoading(false);
          }
        });
    }, (error) => {
      profileRequest += 1;
      console.error('Error al verificar la sesi\u00f3n de Firebase:', error);
      setUser(null);
      setProfile(null);
      setLoading(false);
      setProfileLoading(false);
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
