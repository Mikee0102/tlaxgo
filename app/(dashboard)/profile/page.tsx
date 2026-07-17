'use client';

import { useState } from 'react';
import ProfileForm from './components/profileform';
import ProfileStats from './components/profilesatus';

interface UserProfile {
  name: string;
  email: string;
  bio: string;
  avatar: string;
  joinDate: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Usuario Tlaxgo',
    email: 'usuario@tlaxgo.com',
    bio: 'Apasionado por descubrir Tlaxcala',
    avatar: '/avatar-default.jpg',
    joinDate: 'Enero 2024'
  });

  const handleUpdate = (updatedData: Partial<UserProfile>) => {
    setProfile({ ...profile, ...updatedData });
    // Aquí iría la llamada a la API
    console.log('Perfil actualizado:', updatedData);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Mi Perfil</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ProfileForm profile={profile} onUpdate={handleUpdate} />
        </div>
        <div>
          <ProfileStats />
        </div>
      </div>
    </div>
  );
}