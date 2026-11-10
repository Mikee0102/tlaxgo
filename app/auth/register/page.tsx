'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth.service';
import { profileService } from '@/services/profile.service';
import { Compass, CheckCircle2, User, Mail, Lock, AlertCircle } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();

  // Estados para el formulario
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Estados de interfaz
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Registro con Email y Contraseña
  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Crear usuario en Firebase Auth
      const userCredential = await authService.register(email, password, name);
      const user = userCredential.user;

      // 2. Guardar perfil básico en Firestore
      await profileService.updateProfile(user.uid, {
        name,
        email: user.email,
        createdAt: new Date().toISOString(),
      });

      // 3. Redirigir al dashboard
      router.push('/dashboard');
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        setError('El correo electrónico ya está registrado.');
      } else if (err.code === 'auth/invalid-email') {
        setError('El formato de correo electrónico no es válido.');
      } else {
        setError('Ocurrió un error al registrar tu cuenta. Inténtalo de nuevo.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Registro / Login con Google
  const handleGoogleRegister = async () => {
    setError(null);
    try {
      setIsSubmitting(true);
      const userCredential = await authService.loginWithGoogle();
      const user = userCredential.user;

      // Guardar o actualizar perfil en Firestore al entrar con Google
      await profileService.updateProfile(user.uid, {
        name: user.displayName || name || 'Usuario',
        email: user.email,
        photoURL: user.photoURL || null,
        createdAt: new Date().toISOString(),
      });

      router.push('/dashboard');
    } catch (error: any) {
      console.error('Error con Google:', error);
      if (error.code !== 'auth/popup-closed-by-user') {
        setError('Error al iniciar sesión con Google.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-3xl p-8 shadow-2xl backdrop-blur-xl text-center relative">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-sky-400 mb-6">
          <Compass className="w-8 h-8" />
        </div>

        <h1 className="text-2xl font-black text-white tracking-wide mb-2">
          Crea tu cuenta en <span className="text-sky-400">Tlaxgo</span>
        </h1>
        <p className="text-slate-400 text-sm mb-6">
          Comienza a guardar destinos, planear rutas y compartir tus itinerarios.
        </p>

        {/* Beneficios */}
        <div className="space-y-2 text-left bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80 mb-6 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
            <span>Guarda tus lugares y municipios favoritos</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
            <span>Crea itinerarios inteligentes con mapas interactivos</span>
          </div>
        </div>

        {/* Mensaje de Error */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2 text-left">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Formulario de Registro Manual */}
        <form onSubmit={handleEmailRegister} className="space-y-4 text-left mb-6">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Nombre Completo</label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Juan Pérez"
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Correo Electrónico</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Contraseña</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Confirmar Contraseña</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold py-3 px-6 rounded-xl transition duration-200 shadow-lg active:scale-[0.98] disabled:opacity-50 text-sm"
          >
            {isSubmitting ? 'Creando perfil...' : 'Crear cuenta'}
          </button>
        </form>

        {/* Divisor */}
        <div className="relative flex items-center justify-center mb-6">
          <div className="border-t border-slate-800 w-full" />
          <span className="bg-slate-900 px-3 text-xs text-slate-500 absolute">o continúa con</span>
        </div>

        {/* Botón Google */}
        <button
          type="button"
          onClick={handleGoogleRegister}
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-100 text-slate-900 font-semibold py-3 px-6 rounded-xl transition duration-200 shadow-lg active:scale-[0.98] disabled:opacity-50 text-sm"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          Google
        </button>

        <p className="mt-6 text-xs text-slate-400">
          ¿Ya tienes cuenta?{' '}
          <Link href="/auth/login" className="text-sky-400 hover:underline font-semibold">
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  );
}