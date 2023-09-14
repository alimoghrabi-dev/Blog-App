import "../globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Inter, Pacifico } from "next/font/google";
import LeftSideBar from "@/components/LeftSideBar";
import { cn } from "@/lib/utils";
import BottomBar from "@/components/BottomBar";
import getCurrentUser from "../actions/getCurrentUser";

const openSanes = Inter({
  subsets: ["latin"],
});

export const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "DataVerse",
  description: "A CRUD Application",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${openSanes.className} ${cn(
          "bg-[white] dark:bg-[--darkMode]"
        )}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="theme">
          <main className="w-full flex justify-start">
            <LeftSideBar currentUser={currentUser} />
            <div className="w-full flex items-start justify-start">
              {children}
            </div>
          </main>
          <BottomBar />
        </ThemeProvider>
      </body>
    </html>
  );
}
