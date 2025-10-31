import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <StorageProvider>
            {/* Modal de autenticação fica montado no topo do app */}
            <AuthModal />
            <header className="app-header">
              <div className="brand">
                <div className="brand-row">
                  <img className="brand-icon" src="/MAPEARFavicon.png" alt="Logo MAPEAR" />
                  <span className="brand-title">Arcabouço Pedagógico MAPEAR</span>
                </div>
              </div>
              <nav className="main-nav">
                <Link className="btn ghost" href="/">Início</Link>
                <Link className="btn ghost" href="/conteudo">Conteúdo</Link>
                <Link className="btn ghost" href="/curso">Curso</Link>
                <Link className="btn ghost" href="/jogos">Jogos</Link>
                <UserStatus />
              </nav>
            </header>

            <main className="app-container">{children}</main>

            <footer className="footer">
              Arcabouço Pedagógico MAPEAR — Aprendizagem ativa, reflexiva e colaborativa
            </footer>
          </StorageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
