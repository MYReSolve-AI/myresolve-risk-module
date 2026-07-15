import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MYReSolve Platform",
  description: "MYReSolve Platform v1.0 migration environment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
