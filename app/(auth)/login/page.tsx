"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { signIn } from "@/services/auth.service";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");
    setLoading(true);

    const { error } = await signIn(
      email,
      password,
    );

    if (error) {
      setError(
        "Correo o contraseña incorrectos.",
      );

      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main>
      <h1>Iniciar sesión</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(event) =>
            setEmail(event.target.value)
          }
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(event) =>
            setPassword(event.target.value)
          }
          required
        />

        {error && (
          <p>{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Iniciando sesión..."
            : "Iniciar sesión"}
        </button>
      </form>

      <a href="/forgot-password">
        ¿Olvidaste tu contraseña?
      </a>

      <a href="/register">
        Crear cuenta
      </a>
    </main>
  );
}

