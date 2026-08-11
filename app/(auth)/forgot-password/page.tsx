"use client";

import { useState } from "react";

import {
  resetPassword,
} from "@/services/auth.service";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    const { error } =
      await resetPassword(email);

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setMessage(
      "Si existe una cuenta con ese correo, recibirás instrucciones para cambiar tu contraseña.",
    );

    setLoading(false);
  }

  return (
    <main>
      <h1>Recuperar contraseña</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Tu correo"
          value={email}
          onChange={(event) =>
            setEmail(event.target.value)
          }
          required
        />

        {error && <p>{error}</p>}
        {message && <p>{message}</p>}

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Enviando..."
            : "Enviar instrucciones"}
        </button>
      </form>
    </main>
  );
}