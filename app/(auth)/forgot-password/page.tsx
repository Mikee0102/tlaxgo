"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

import { resetPassword } from "@/services/auth.service";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    const { error } = await resetPassword(email);

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setMessage("Si existe una cuenta con ese correo, recibirás instrucciones para cambiar tu contraseña.");
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-[-8rem] top-[-6rem] h-72 w-72 rounded-full bg-sky-500/15 blur-3xl" />
        <div className="absolute right-[-5rem] top-1/3 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-5xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="w-full overflow-hidden rounded-[2rem] border border-slate-800/80 bg-slate-900/80 shadow-2xl shadow-sky-950/30 backdrop-blur-xl md:grid-cols-[1fr_1.1fr]">
          <section className="p-6 sm:p-8 lg:p-10">
            <div className="mb-8 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-sky-300">Ayuda</p>
                <h2 className="mt-2 text-3xl font-black text-white">Recuperar contraseña</h2>
              </div>
              <Link href="/" className="text-sm font-medium text-slate-300 transition hover:text-sky-300">
                Inicio
              </Link>
            </div>

            <p className="mb-6 text-sm text-slate-300">
              Ingresa tu correo y te enviaremos las instrucciones para restablecer tu contraseña.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="recovery-email" className="mb-2 block text-sm font-medium text-slate-200">
                  Correo electrónico
                </label>
                <input
                  id="recovery-email"
                  type="email"
                  placeholder="tu@correo.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-white placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
              </div>

              {error && <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">{error}</p>}
              {message && <p className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">{message}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-sky-500 px-4 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:bg-sky-500/70"
              >
                {loading ? "Enviando..." : "Enviar instrucciones"}
              </button>
            </form>

            <p className="mt-6 text-sm text-slate-300">
              ¿Recuerdas tu contraseña? {" "}
              <Link href="/login" className="font-semibold text-sky-300 transition hover:text-sky-200">
                Inicia sesión
              </Link>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}