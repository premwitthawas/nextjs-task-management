import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import '@/app/globals.css'
import QueryProviderClient from "@/providers/query-provider";
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Home",
  description: "Home",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(inter.className, "antialiased min-h-screen")}
      >
        <QueryProviderClient>
          <Toaster />
          {children}
        </QueryProviderClient>
      </body>
    </html>
  );
}
