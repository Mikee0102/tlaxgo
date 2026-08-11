"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  updatePassword,
} from "@/services/auth.service";

export default function UpdatePasswordPage() {
  const router = useRouter();

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");

    if (password !== confirmPassword) {
      setError(
        "Las contraseñas no coinciden.",
      );
      return;
    }

    setLoading(true);

    const { error } =
      await updatePassword(password);

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/login?passwordUpdated=true");
  }

  return (
    <main>
      <h1>Nueva contraseña</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Nueva contraseña"
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
            ? "Actualizando..."
            : "Actualizar contraseña"}
        </button>
      </form>
    </main>
  );
}