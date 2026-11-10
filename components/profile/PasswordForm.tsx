"use client";

import { useState } from "react";
import { updatePassword } from "@/services/auth.service";

export default function PasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setMessage("");
    setError("");

    if (password !== confirmPassword) {
      setError(
        "Las contraseñas no coinciden.",
      );
      return;
    }

    if (password.length < 6) {
      setError(
        "La contraseña debe tener al menos 6 caracteres.",
      );
      return;
    }

    const { error } =
      await updatePassword(password);

    if (error) {
      setError(error.message);
      return;
    }

    setPassword("");
    setConfirmPassword("");

    setMessage(
      "Contraseña actualizada correctamente.",
    );
  }

  return (
    <section>
      <h2>Cambiar contraseña</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={password}
          onChange={(event) =>
            setPassword(event.target.value)
          }
        />

        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChange={(event) =>
            setConfirmPassword(event.target.value)
          }
        />

        {error && <p>{error}</p>}
        {message && <p>{message}</p>}

        <button type="submit">
          Cambiar contraseña
        </button>
      </form>
    </section>
  );
}