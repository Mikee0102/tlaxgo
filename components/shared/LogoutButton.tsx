"use client";

import { useRouter } from "next/navigation";
import { signOut } from "@/services/auth.service";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await signOut();

    router.push("/login");
    router.refresh();
  }

  return (
    <button onClick={handleLogout}>
      Cerrar sesión
    </button>
  );
}