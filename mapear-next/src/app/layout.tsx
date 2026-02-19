import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { StorageProvider } from "@/context/StorageContext";
import AuthModal from "@/components/AuthModal";
import AppHeader from "@/components/AppHeader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arcabouço Pedagógico MAPEAR",
  description:
    "Arcabouço Pedagógico MAPEAR — Aprendizagem ativa, reflexiva e colaborativa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased text-gray-200 pt-16 sm:pt-[100px] bg-[radial-gradient(1200px_800px_at_70%_-10%,rgba(124,156,255,.2),transparent_60%),radial-gradient(800px_600px_at_10%_110%,rgba(34,197,94,.12),transparent_60%),#0b1020]`}
      >
        <AuthProvider>
          <StorageProvider>
            {/* Modal de autenticação fica montado no topo do app */}
            <AuthModal />
            <AppHeader />

            <main className="max-w-[1000px] mx-auto my-6 px-4 pb-20">{children}</main>

            <footer className="text-gray-400 text-sm text-center py-6">
              Arcabouço Pedagógico MAPEAR — Aprendizagem ativa, reflexiva e colaborativa
            </footer>
          </StorageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
