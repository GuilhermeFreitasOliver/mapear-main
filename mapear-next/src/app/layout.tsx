import type { Metadata } from "next";
import { Space_Grotesk, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { StorageProvider } from "@/context/StorageContext";
import AuthModal from "@/components/AuthModal";
import AppHeader from "@/components/AppHeader";

const displayFont = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const bodyFont = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arcabouco Pedagogico MAPEAR",
  description:
    "Arcabouco Pedagogico MAPEAR - Aprendizagem ativa, reflexiva e colaborativa",
  icons: {
    icon: "/MAPEARFavicon.png",
    shortcut: "/MAPEARFavicon.png",
    apple: "/MAPEARFavicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${displayFont.variable} ${bodyFont.variable} app-theme min-h-screen pt-16 antialiased sm:pt-[92px]`}
      >
        <AuthProvider>
          <StorageProvider>
            {/* Modal de autenticacao fica montado no topo do app */}
            <AuthModal />
            <AppHeader />

            <main className="mx-auto my-6 max-w-[1100px] px-4 pb-20">{children}</main>

            <footer className="border-t border-white/10 py-6 text-center text-sm text-[var(--muted)]">
              Arcabouco Pedagogico MAPEAR - Aprendizagem ativa, reflexiva e colaborativa
            </footer>
          </StorageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
