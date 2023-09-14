import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const openSanes = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DataVerse",
  description: "A CRUD Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${openSanes.className}`}>
        <div>{children}</div>
      </body>
    </html>
  );
}
