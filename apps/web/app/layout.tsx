import type { Metadata } from "next";
import "@/src/styles/brand.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "MYReSolve: Less time reporting. More time improving.",
  description:
    "MYReSolve turns a structured executive assessment into a clear view of operational health, risk and potential value at risk.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <body>{children}</body>
    </html>
  );
}
