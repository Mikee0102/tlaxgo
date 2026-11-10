export type UserRole = 'user' | 'admin';

export interface UserProfile {
  id: string;
  name?: string;
  email?: string | null;
  bio?: string;
  location?: string;
  avatar_url?: string;
  photoURL?: string | null; // Acepta null para la compatibilidad con Firebase Auth
  role?: UserRole;
  created_at?: string;
  updated_at?: string;
  createdAt?: string;
  updatedAt?: string;
  lastLogin?: string;
}