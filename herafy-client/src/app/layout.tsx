import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import { cn } from "@/lib/utils";
import "@/app/globals.css";
import Header from "@/components/header";
import { UserProvider } from "./contexts/user-context";
import Footer from "@/components/footer";

const rubik = Rubik({ subsets: ["arabic"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Herafy",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="light min-h-screen">
      <body
        className={cn(
          "flex min-h-screen flex-col bg-background font-sans antialiased",
          rubik.variable,
        )}
      >
        <UserProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
