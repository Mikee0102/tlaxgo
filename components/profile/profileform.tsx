"use client";

import { useState } from "react";
import {
  User,
  Mail,
  FileText,
  Camera,
  Save,
  X,
  Loader2,
} from "lucide-react";

import type { User as SupabaseUser } from "@supabase/supabase-js";

import {
  updateMyProfile,
} from "@/services/profile.service";

interface Profile {
  id: string;
  full_name: string | null;
  username: string | null;
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
}

interface ProfileFormProps {
  user: SupabaseUser;
  profile: Profile | null;
  onUpdate?: (profile: Profile) => void;
}

export default function ProfileForm({
  user,
  profile,
  onUpdate,
}: ProfileFormProps) {
  const [isEditing, setIsEditing] =
    useState(false);

  const [formData, setFormData] =
    useState({
      full_name:
        profile?.full_name ??
        user.user_metadata?.full_name ??
        "",

      username:
        profile?.username ?? "",

      bio:
        profile?.bio ?? "",
    });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [message, setMessage] =
    useState("");

  const handleCancel = () => {
    setFormData({
      full_name: profile?.full_name ?? "",
      username: profile?.username ?? "",
      bio: profile?.bio ?? "",
    });

    setIsEditing(false);
    setError("");
    setMessage("");
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");

    const {
      profile: updatedProfile,
      error,
    } = await updateMyProfile({
      full_name: formData.full_name,
      username: formData.username,
      bio: formData.bio,
    });

    if (error) {
      console.error(error);

      setError(
        "No fue posible guardar los cambios.",
      );

      setLoading(false);
      return;
    }

    if (updatedProfile) {
      onUpdate?.(updatedProfile);
    }

    setMessage(
      "Perfil actualizado correctamente.",
    );

    setIsEditing(false);
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

      {/* HEADER */}

      <div className="p-6 border-b border-gray-200 flex items-center justify-between">

        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-gray-700" />

          <h2 className="text-xl font-semibold text-gray-900">
            Información Personal
          </h2>
        </div>

        {!isEditing ? (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="text-blue-500 hover:text-blue-700 font-medium"
          >
            Editar
          </button>
        ) : (
          <button
            type="button"
            onClick={handleCancel}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700"
          >
            <X className="w-4 h-4" />
            Cancelar
          </button>
        )}

      </div>

      {/* FORMULARIO */}

      <form
        onSubmit={handleSubmit}
        className="p-6"
      >

        {/* AVATAR */}

        <div className="flex items-center gap-4 mb-6">

          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center relative">

            {profile?.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt="Avatar"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-3xl">
                👤
              </span>
            )}

            {isEditing && (
              <button
                type="button"
                className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full hover:bg-blue-600"
              >
                <Camera className="w-4 h-4" />
              </button>
            )}

          </div>

          <div>

            <h3 className="font-semibold text-gray-800">
              {formData.full_name ||
                "Usuario"}
            </h3>

            <p className="text-sm text-gray-500">
              {user.email}
            </p>

          </div>

        </div>

        {/* NOMBRE */}

        <div className="space-y-4">

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-1">
              <User className="w-4 h-4 inline mr-1" />
              Nombre completo
            </label>

            <input
              type="text"
              value={formData.full_name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  full_name: e.target.value,
                })
              }
              disabled={!isEditing}
              className={`w-full px-3 py-2 border rounded-md ${
                isEditing
                  ? "border-gray-300"
                  : "border-transparent bg-gray-50"
              }`}
            />

          </div>

          {/* USERNAME */}

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre de usuario
            </label>

            <input
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  username: e.target.value,
                })
              }
              disabled={!isEditing}
              placeholder="@usuario"
              className={`w-full px-3 py-2 border rounded-md ${
                isEditing
                  ? "border-gray-300"
                  : "border-transparent bg-gray-50"
              }`}
            />

          </div>

          {/* EMAIL */}

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Mail className="w-4 h-4 inline mr-1" />
              Email
            </label>

            <input
              type="email"
              value={user.email ?? ""}
              disabled
              className="w-full px-3 py-2 border border-transparent bg-gray-50 rounded-md"
            />

          </div>

          {/* BIO */}

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-1">
              <FileText className="w-4 h-4 inline mr-1" />
              Biografía
            </label>

            <textarea
              value={formData.bio}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  bio: e.target.value,
                })
              }
              disabled={!isEditing}
              rows={3}
              className={`w-full px-3 py-2 border rounded-md ${
                isEditing
                  ? "border-gray-300"
                  : "border-transparent bg-gray-50"
              }`}
            />

          </div>

          {/* MENSAJES */}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-md p-3 text-sm">
              {error}
            </div>
          )}

          {message && (
            <div className="bg-green-50 border border-green-200 text-green-700 rounded-md p-3 text-sm">
              {message}
            </div>
          )}

          {/* GUARDAR */}

          {isEditing && (
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Guardar Cambios
                </>
              )}
            </button>
          )}

        </div>
      </form>
    </div>
  );
}