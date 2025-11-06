import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { StorageProvider } from "@/context/StorageContext";
import AuthModal from "@/components/AuthModal";
import UserStatus from "@/components/UserStatus";

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
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased text-gray-200 pt-[100px] bg-[radial-gradient(1200px_800px_at_70%_-10%,rgba(124,156,255,.2),transparent_60%),radial-gradient(800px_600px_at_10%_110%,rgba(34,197,94,.12),transparent_60%),#0b1020]`}
      >
        <AuthProvider>
          <StorageProvider>
            {/* Modal de autenticação fica montado no topo do app */}
            <AuthModal />
            <header className="fixed top-0 left-0 right-0 z-[9999] bg-gray-900 border-b border-white/10 shadow-2xl px-5 py-3 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <Image className="w-8 h-8 rounded-lg" src="/MAPEARFavicon.png" alt="Logo MAPEAR" width={32} height={32} priority />
                  <span className="font-extrabold tracking-wide text-green-500">Arcabouço Pedagógico MAPEAR</span>
                </div>
              </div>
              <nav className="flex flex-wrap items-center gap-2">
                <Link className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-semibold text-white border border-white/20 hover:bg-blue-500/10" href="/conteudo">Início</Link>
                <Link className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-semibold text-white border border-white/20 hover:bg-blue-500/10" href="/curso">Curso</Link>
                <Link className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-semibold text-white border border-white/20 hover:bg-blue-500/10" href="/jogos">Jogos</Link>
                <UserStatus />
              </nav>
            </header>

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
