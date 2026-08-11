<<<<<<< Updated upstream
=======
"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { signUp } from "@/services/auth.service";

export default function RegisterPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (password.length < 6) {
      setError(
        "La contraseña debe tener al menos 6 caracteres.",
      );
      return;
    }

    setLoading(true);

    const { data, error } = await signUp(
      email,
      password,
      fullName,
    );

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    /*
     * Si Supabase requiere confirmación por correo,
     * normalmente no habrá sesión todavía.
     */

    if (!data.session) {
      router.push("/verify-email");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main>
      <h1>Crear cuenta</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre completo"
          value={fullName}
          onChange={(event) =>
            setFullName(event.target.value)
          }
          required
        />

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

        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChange={(event) =>
            setConfirmPassword(event.target.value)
          }
          required
        />

        {error && <p>{error}</p>}

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Creando cuenta..."
            : "Crear cuenta"}
        </button>
      </form>
    </main>
  );
}
>>>>>>> Stashed changes
