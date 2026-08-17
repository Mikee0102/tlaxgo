"use client";
"use client";

import { useEffect, useState } from "react";
import {
  User,
  Settings,
  MapPin,
  Heart,
  Clock,
  Award,
  Edit,
  Save,
  X,
} from "lucide-react";

import { useAuth } from "@/hooks/useAuth";
import {
  getMyProfile,
  updateMyProfile,
} from "@/services/profile.service";

interface ProfileData {
  id: string;
  full_name: string | null;
  username: string | null;
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
}

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();

  const [profile, setProfile] =
    useState<ProfileData | null>(null);

  const [isLoading, setIsLoading] =
    useState(true);

  const [isEditing, setIsEditing] =
    useState(false);

  const [isSaving, setIsSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [editForm, setEditForm] = useState({
    full_name: "",
    username: "",
    bio: "",
  });

  /*
   * Cargar perfil
   */
  useEffect(() => {
    async function loadProfile() {
      if (!user) {
        setIsLoading(false);
        return;
      }

      const { profile, error } =
        await getMyProfile();

      if (error) {
        console.error(error);
        setError(
          "No fue posible cargar tu perfil.",
        );

        setIsLoading(false);
        return;
      }

      if (profile) {
        setProfile(profile);

        setEditForm({
          full_name: profile.full_name ?? "",
          username: profile.username ?? "",
          bio: profile.bio ?? "",
        });
      }

      setIsLoading(false);
    }

    if (!authLoading) {
      loadProfile();
    }
  }, [user, authLoading]);

  /*
   * Guardar cambios
   */
  const handleSave = async () => {
    setIsSaving(true);
    setError("");
    setMessage("");

    const { profile: updatedProfile, error } =
      await updateMyProfile({
        full_name: editForm.full_name,
        username: editForm.username,
        bio: editForm.bio,
      });

    if (error) {
      console.error(error);

      setError(
        "No fue posible actualizar tu perfil.",
      );

      setIsSaving(false);
      return;
    }

    if (updatedProfile) {
      setProfile(updatedProfile);
    }

    setIsEditing(false);
    setMessage(
      "Perfil actualizado correctamente.",
    );

    setIsSaving(false);
  };

  /*
   * Cancelar edición
   */
  const handleCancel = () => {
    if (!profile) return;

    setEditForm({
      full_name: profile.full_name ?? "",
      username: profile.username ?? "",
      bio: profile.bio ?? "",
    });

    setIsEditing(false);
    setError("");
  };

  /*
   * Loading
   */
  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Cargando perfil...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Debes iniciar sesión para ver tu perfil.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* HEADER DEL PERFIL */}

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-6">

            {/* Avatar */}

            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-blue-600" />
            </div>

            {/* Información */}

            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">
                {profile?.full_name ||
                  user.user_metadata?.full_name ||
                  "Usuario"}
              </h1>

              <p className="text-gray-500 mt-1">
                {user.email}
              </p>

              {profile?.username && (
                <p className="text-sm text-blue-600 mt-1">
                  @{profile.username}
                </p>
              )}
'use client';

import { useState } from 'react';
import { User, Settings, MapPin, Heart, Clock, Award, Edit, Save, X } from 'lucide-react';

interface UserProfile {
  name: string;
  email: string;
  bio: string;
  location: string;
  joinDate: string;
  travels: number;
  favorites: number;
  reviews: number;
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Juan Delgado',
    email: 'juan.delgado@email.com',
    bio: 'Apasionado por los viajes y la aventura. Me encanta explorar nuevos lugares y culturas.',
    location: 'Ciudad de México, México',
    joinDate: '2024-01-15',
    travels: 12,
    favorites: 45,
    reviews: 28
  });

  const [editForm, setEditForm] = useState(profile);

  const handleSave = () => {
    setProfile(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm(profile);
    setIsEditing(false);
  };

  return (
    <div className="space-y-8">
      {/* Profile Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Viajes realizados</p>
              <p className="text-2xl font-bold text-gray-900">{profile.travels}</p>
            </div>
          </div>
        </div>

        {/* MENSAJES */}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4">
            {error}
          </div>
        )}

        {message && (
          <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4">
            {message}
          </div>
        )}

        {/* ESTADÍSTICAS */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Viajes realizados
                </p>

                <p className="text-2xl font-bold text-gray-900">
                  0
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-100 rounded-lg">
                <Heart className="w-6 h-6 text-red-500" />
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Favoritos
                </p>

                <p className="text-2xl font-bold text-gray-900">
                  0
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Award className="w-6 h-6 text-yellow-600" />
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Reseñas
                </p>

                <p className="text-2xl font-bold text-gray-900">
                  0
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* INFORMACIÓN PERSONAL */}

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

          <div className="p-6 border-b border-gray-200 flex items-center justify-between">

            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <User className="w-5 h-5" />
              Información Personal
            </h2>

            {!isEditing ? (
              <button
                onClick={() => {
                  setIsEditing(true);
                  setMessage("");
                }}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Editar Perfil
              </button>
            ) : (
              <div className="flex gap-2">

                <button
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Cancelar
                </button>

                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  {isSaving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}

                  {isSaving
                    ? "Guardando..."
                    : "Guardar"}
                </button>

              </div>
            )}
          </div>

          <div className="p-6 space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* NOMBRE */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre completo
                </label>

                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.full_name}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        full_name: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">
                    {profile?.full_name ||
                      "Sin nombre"}
                  </p>
                )}
              </div>

              {/* USERNAME */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre de usuario
                </label>

                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.username}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        username: e.target.value,
                      })
                    }
                    placeholder="@usuario"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">
                    {profile?.username
                      ? `@${profile.username}`
                      : "Sin nombre de usuario"}
                  </p>
                )}
              </div>

              {/* EMAIL */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Correo electrónico
                </label>

                <p className="text-gray-900">
                  {user.email}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  El correo se administra desde tu cuenta.
                </p>
              </div>

              {/* BIO */}

              <div className="md:col-span-2">

                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Biografía
                </label>

                {isEditing ? (
                  <textarea
                    value={editForm.bio}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        bio: e.target.value,
                      })
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-700">
                    {profile?.bio ||
                      "Aún no has agregado una biografía."}
                  </p>
                )}

              </div>

              {/* MIEMBRO DESDE */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Miembro desde
                </label>

                <p className="text-gray-900 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />

                  {profile?.created_at
                    ? new Date(
                        profile.created_at,
                      ).toLocaleDateString(
                        "es-MX",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        },
                      )
                    : "No disponible"}
                </p>

              </div>

            </div>
          </div>
        </div>

        {/* CONFIGURACIÓN */}

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

          <div className="p-6 border-b border-gray-200">

            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Configuración
            </h2>

          </div>

          <div className="p-6 space-y-4">

            {/* NOTIFICACIONES */}

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">

              <div>
                <p className="font-medium text-gray-900">
                  Notificaciones
                </p>

                <p className="text-sm text-gray-500">
                  Recibir actualizaciones sobre viajes
                </p>
              </div>

              <button
                type="button"
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 transition-colors"
              >
                <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
              </button>

            </div>

            {/* IDIOMA */}

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">

              <div>
                <p className="font-medium text-gray-900">
                  Idioma
                </p>

                <p className="text-sm text-gray-500">
                  Idioma de la aplicación
                </p>
              </div>

              <select className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Español</option>
                <option>English</option>
                <option>Français</option>
              </select>

            </div>

            {/* PRIVACIDAD */}

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">

              <div>
                <p className="font-medium text-gray-900">
                  Privacidad
                </p>

                <p className="text-sm text-gray-500">
                  Controlar la visibilidad de tu perfil
                </p>
              </div>

              <button
                type="button"
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300"
              >
                <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1" />
              </button>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}