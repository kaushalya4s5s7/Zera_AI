import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/home/Providers";

export const metadata: Metadata = {
  title: "Zera",
  description: "Test, Analyze, Audit and Deploy",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head></head>
      <body className="bg-black text-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
