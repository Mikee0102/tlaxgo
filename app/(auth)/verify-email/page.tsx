import Link from "next/link";

export default function VerifyEmailPage() {
  return (
    <main>
      <h1>Revisa tu correo</h1>

      <p>
        Te enviamos un enlace para confirmar tu cuenta.
      </p>

      <p>
        Después de confirmar tu correo podrás iniciar
        sesión.
      </p>

      <Link href="/login">
        Volver al inicio de sesión
      </Link>
    </main>
  );
}