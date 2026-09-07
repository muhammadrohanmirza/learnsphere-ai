import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/providers/AuthProvider";
import SuppressConsoleErrors from "@/components/shared/SuppressConsoleErrors";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LearnSphere AI — AI-Powered Personalized Learning Platform",
  description: "Transform study materials into notes, 30+ MCQs, flashcards, and AI tutoring.",
  icons: {
    icon: "/logo.jpg",
    shortcut: "/logo.jpg",
    apple: "/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={inter.className}>
        <SuppressConsoleErrors />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
