import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Lumio Platform",
  description: "Research & Insights Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Force dark class to ensure dark mode styles apply if we used class strategy,
    // but we will update variables in globals.css to be dark by default.
    <html lang="pt-BR" className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-bg-app text-text-primary min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
