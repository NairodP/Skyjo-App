import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Zilla_Slab } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const zillaSlab = Zilla_Slab({
  subsets: ["latin"],
  variable: "--font-zilla-slab",
  weight: "700",
});

export const metadata: Metadata = {
  title: "Assistant Skyjo",
  description: "Application pour gérer vos parties de Skyjo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </head>

      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          zillaSlab.variable,
          "bg-sky-100"
        )}
      >
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
