import type { Metadata } from "next";
import "@/src/styles/brand.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "MYReSolve Platform",
  description:
    "MYReSolve Platform — executive risk assessment and dashboard migration environment",
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
