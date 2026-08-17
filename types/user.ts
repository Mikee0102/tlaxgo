export type UserRole = 'user' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  bio?: string;
  location?: string;
  avatar_url?: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}