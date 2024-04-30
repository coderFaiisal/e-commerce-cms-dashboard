import { ModalProvider } from '@/providers/ModalProvider';
import Providers from '@/providers/Providers';
import { ThemeProvider } from '@/providers/ThemeProvider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TJ - Admin Dashboard',
  description:
    'Timeless Jewellery is known for its luxury goods, particularly its sterling silver and diamond jewellery.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} no-scrollbar`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Providers>{children}</Providers>
        </ThemeProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
          }}
        />
        <ModalProvider />
      </body>
    </html>
  );
}
