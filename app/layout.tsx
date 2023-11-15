import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/providers/Providers";
import { Toaster } from "sonner";

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
        <body className={inter.className}>
          {children}
          <Toaster position="top-right" closeButton richColors />
        </body>
      </html>
    </Providers>
  );
}
