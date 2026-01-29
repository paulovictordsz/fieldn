import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Switch to Inter as requested
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Lumio | Gestão de Pesquisas",
  description: "Plataforma de Gestão de Pesquisas e Insights",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Simple check to see if we are on auth pages (login/signup) to hide sidebar
  // For now, we assume all pages in this layout have sidebar.
  // We can create a route group (authenticated) later if needed.

  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} font-sans antialiased bg-bg-app text-text-primary`}>
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1 pl-[var(--sidebar-width)] flex flex-col min-h-screen transition-all duration-300 ease-in-out">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
