import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tom Latchimy — Portfolio Cybersécurité",
  description: "Portfolio professionnel en cybersécurité – Étudiant à la SEPR en 1ère Professionnelle CIEL en alternance. Analyse réseau, Linux, HTB Academy.",
  keywords: ["cybersécurité", "sécurité informatique", "Wireshark", "Linux", "HTB Academy", "analyse réseau", "portfolio", "SEPR", "CIEL"],
  authors: [{ name: "Tom Latchimy" }],
  icons: {
    icon: "/avatar.png",
  },
  openGraph: {
    title: "Tom Latchimy — Portfolio Cybersécurité",
    description: "Portfolio professionnel en cybersécurité – projets, analyses et apprentissages.",
    type: "website",
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Tom Latchimy — Portfolio Cybersécurité' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
