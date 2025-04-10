import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import Providers from "@/components/home/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Your Project Title",
  description: "Project description here",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={geistSans.variable} suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="/fonts/JetBrainsMono-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/JetBrainsMono-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-black text-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
