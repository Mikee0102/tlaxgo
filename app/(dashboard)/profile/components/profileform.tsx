'use client';

import { useState } from 'react';
import { User, Mail, FileText, Camera } from 'lucide-react';

interface UserProfile {
  name: string;
  email: string;
  bio: string;
  avatar: string;
  joinDate: string;
}

interface ProfileFormProps {
  profile: UserProfile;
  onUpdate: (data: Partial<UserProfile>) => void;
}

export default function ProfileForm({ profile, onUpdate }: ProfileFormProps) {
  const [formData, setFormData] = useState(profile);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Información Personal</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-blue-500 hover:text-blue-700"
        >
          {isEditing ? 'Cancelar' : 'Editar'}
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center relative">
            <span className="text-3xl">👤</span>
            {isEditing && (
              <button className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full">
                <Camera className="w-4 h-4" />
              </button>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{profile.name}</h3>
            <p className="text-sm text-gray-500">Miembro desde {profile.joinDate}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <User className="w-4 h-4 inline mr-1" />
              Nombre
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              disabled={!isEditing}
              className={`w-full px-3 py-2 border rounded-md ${
                isEditing ? 'border-gray-300' : 'border-transparent bg-gray-50'
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Mail className="w-4 h-4 inline mr-1" />
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              disabled
              className="w-full px-3 py-2 border border-transparent bg-gray-50 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <FileText className="w-4 h-4 inline mr-1" />
              Biografía
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              disabled={!isEditing}
              rows={3}
              className={`w-full px-3 py-2 border rounded-md ${
                isEditing ? 'border-gray-300' : 'border-transparent bg-gray-50'
              }`}
            />
          </div>

          {isEditing && (
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Guardar Cambios
            </button>
          )}
        </div>
      </form>
    </div>
  );
}