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
import { getMyProfile, updateMyProfile } from "@/services/profile.service";

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
  const { user, loading } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    email: "",
    bio: "",
    location: "",
    joinDate: "",
    travels: 0,
    favorites: 0,
    reviews: 0,
  });

  const [editForm, setEditForm] = useState(profile);

  useEffect(() => {
    async function loadProfile() {
      if (!user) return;

      try {
        const { profile: data } = await getMyProfile();

        const loadedProfile: UserProfile = {
          name:
            data?.full_name ??
            user.user_metadata?.full_name ??
            user.user_metadata?.name ??
            "",
          email: user.email ?? "",
          bio: data?.bio ?? "",
          location: user.user_metadata?.location ?? "",
          joinDate:
            data?.updated_at ??
            user.created_at ??
            "",
          travels: 0,
          favorites: 0,
          reviews: 0,
        };

        setProfile(loadedProfile);
        setEditForm(loadedProfile);
      } catch (error) {
        console.error("Error al cargar el perfil:", error);
      }
    }

    if (!loading) {
      loadProfile();
    }
  }, [user, loading]);

  const handleSave = async () => {
    if (!user) return;

    try {
      setSaving(true);

      await updateMyProfile({
        full_name: editForm.name,
        bio: editForm.bio,
      });

      setProfile(editForm);
      setIsEditing(false);
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditForm(profile);
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Cargando perfil...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">
          Debes iniciar sesión para ver tu perfil.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Estadísticas */}
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
                  {profile.travels}
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
                  {profile.favorites}
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
                  {profile.reviews}
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Información personal */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

          <div className="p-6 border-b border-gray-200 flex items-center justify-between">

            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <User className="w-5 h-5" />
              Información Personal
            </h2>

            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Editar Perfil
              </button>
            ) : (
              <div className="flex gap-2">

                <button
                  onClick={handleCancel}
                  disabled={saving}
                  className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Cancelar
                </button>

                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {saving ? "Guardando..." : "Guardar"}
                </button>

              </div>
            )}

          </div>

          <div className="p-6 space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Nombre */}
              <div>

                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre completo
                </label>

                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        name: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">
                    {profile.name || "Sin nombre"}
                  </p>
                )}

              </div>

              {/* Email */}
              <div>

                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Correo electrónico
                </label>

                <p className="text-gray-900">
                  {profile.email}
                </p>

              </div>

              {/* Biografía */}
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
                    {profile.bio || "Sin biografía"}
                  </p>
                )}

              </div>

              {/* Ubicación */}
              <div>

                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ubicación
                </label>

                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.location}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        location: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    {profile.location || "Sin ubicación"}
                  </p>
                )}

              </div>

              {/* Fecha */}
              <div>

                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Miembro desde
                </label>

                <p className="text-gray-900 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />

                  {profile.joinDate
                    ? new Date(profile.joinDate).toLocaleDateString(
                        "es-MX",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )
                    : "Fecha no disponible"}
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Configuración */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

          <div className="p-6 border-b border-gray-200">

            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Configuración
            </h2>

          </div>

          <div className="p-6 space-y-4">

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">

              <div>
                <p className="font-medium text-gray-900">
                  Notificaciones
                </p>

                <p className="text-sm text-gray-500">
                  Recibir actualizaciones sobre viajes
                </p>
              </div>

              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
              </button>

            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">

              <div>
                <p className="font-medium text-gray-900">
                  Idioma
                </p>

                <p className="text-sm text-gray-500">
                  Español (México)
                </p>
              </div>

              <select className="px-3 py-1 border border-gray-300 rounded-lg">
                <option>Español</option>
                <option>English</option>
                <option>Français</option>
              </select>

            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">

              <div>
                <p className="font-medium text-gray-900">
                  Privacidad
                </p>

                <p className="text-sm text-gray-500">
                  Perfil público
                </p>
              </div>

              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white" />
              </button>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}