import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/providers/Providers";
import { Toaster } from "sonner";
import { ModalProvider } from "@/providers/ModalProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TJ - Admin Dashboard",
  description:
    "Timeless Jewellery is known for its luxury goods, particularly its sterling silver and diamond jewellery.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        <body className={`${inter.className} no-scrollbar`}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
          <Toaster position="top-right" closeButton richColors />
          <ModalProvider />
        </body>
      </html>
    </Providers>
  );
}
