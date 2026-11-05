"use client";

import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    try {
      await authService.logout();
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  }

  return (
    <button onClick={handleLogout}>
      Cerrar sesión
    </button>
  );
}