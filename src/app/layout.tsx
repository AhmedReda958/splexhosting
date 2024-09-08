import type { Metadata } from "next";
import { Recursive } from "next/font/google";

import "./globals.css";
import DarkThemeProvider from "@/components/providers/theme-provider";
import { Session } from "next-auth";
import AuthSessionProvider from "@/components/providers/authSessionProvider";
import { PayPalProvider } from "@/components/providers/paypalProvider";

const RecursiveFont = Recursive({
  subsets: ["latin"], // specify the required subsets
});

export const metadata: Metadata = {
  title: "VenixHosting",
  description: "VenixHosting is a hosting platform for VPS.",
};

export default function RootLayout({
  children,
  session,
}: Readonly<{
  children: React.ReactNode;
  session: Session | null;
}>) {
  return (
    <html lang="en">
      <body className={RecursiveFont.className}>
        <DarkThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthSessionProvider session={session}>
            <PayPalProvider>{children}</PayPalProvider>
          </AuthSessionProvider>
        </DarkThemeProvider>
      </body>
    </html>
  );
}
