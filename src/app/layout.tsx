import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DarkThemeProvider from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Splexhosting",
  description: "Splexhosting is a hosting platform for VPS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {" "}
        <DarkThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </DarkThemeProvider>
      </body>
    </html>
  );
}
