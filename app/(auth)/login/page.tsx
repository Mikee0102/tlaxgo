"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { signIn } from "@/services/auth.service";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      setError("Correo o contraseña incorrectos.");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-[-8rem] top-[-6rem] h-72 w-72 rounded-full bg-sky-500/15 blur-3xl" />
        <div className="absolute right-[-5rem] top-1/3 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid w-full overflow-hidden rounded-[2rem] border border-slate-800/80 bg-slate-900/80 shadow-2xl shadow-sky-950/30 backdrop-blur-xl md:grid-cols-[1.1fr_0.9fr]">
          <section className="relative hidden bg-slate-950/70 p-10 md:flex md:flex-col md:justify-between">
            <div>
              <Link href="/" className="inline-flex items-center gap-3 text-white">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-sky-500/30 bg-sky-500/10 text-sky-300">
                  <span className="text-lg font-black">T</span>
                </div>
                <span className="text-xl font-black tracking-wide">Tlaxgo</span>
              </Link>
            </div>

            <div className="space-y-6">
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-sky-300">
                Bienvenido de nuevo
              </p>
              <h1 className="text-4xl font-black leading-tight text-white">
                Descubre Tlaxcala con una experiencia más inteligente.
              </h1>
              <p className="max-w-md text-base text-slate-300">
                Guarda tus rutas, encuentra lugares increíbles y planea cada visita con facilidad.
              </p>
            </div>

            <div className="grid gap-3 text-sm text-slate-200">
              {[
                "Explora municipios y rutas destacadas",
                "Organiza itinerarios sin perder tiempo",
                "Mantén tus lugares favoritos siempre a mano",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-3">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-sky-500/20 text-xs font-bold text-sky-300">
                    ✓
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section className="p-6 sm:p-8 lg:p-10">
            <div className="mb-8 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-sky-300">Acceso</p>
                <h2 className="mt-2 text-3xl font-black text-white">Iniciar sesión</h2>
              </div>
              <Link href="/" className="text-sm font-medium text-slate-300 transition hover:text-sky-300">
                Inicio
              </Link>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-200">
                  Correo electrónico
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="tu@correo.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-white placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
              </div>

              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-200">
                  Contraseña
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-white placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
              </div>

              {error && <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-sky-500 px-4 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:bg-sky-500/70"
              >
                {loading ? "Iniciando sesión..." : "Iniciar sesión"}
              </button>
            </form>

            <div className="mt-6 space-y-3 text-sm text-slate-300">
              <p>
                <Link href="/forgot-password" className="font-medium text-sky-300 transition hover:text-sky-200">
                  ¿Olvidaste tu contraseña?
                </Link>
              </p>
              <p>
                ¿No tienes una cuenta? {" "}
                <Link href="/register" className="font-semibold text-white transition hover:text-sky-300">
                  Crear cuenta
                </Link>
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

