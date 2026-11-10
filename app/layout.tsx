import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";

import { AuthProvider } from "@/providers/auth-provider";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister"; // 👈 Importamos el componente
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Smart Guide",
  description: "Guía turística inteligente",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Smart Guide",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" data-scroll-behavior="smooth">
      <body
        className={`${poppins.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <AuthProvider>
          <ServiceWorkerRegister /> {/* 👈 Se ejecuta de forma segura en el cliente */}
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}