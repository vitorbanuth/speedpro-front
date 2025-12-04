// 'use client'
import BootstrapClient from "./bootstrap-client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Head } from "next/document";
import { CartProvider } from "./carrinho/cart_context";
// import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // optional for Bootstrap JS features


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Speed Pro Autoparts",
  description: "Peças de performance",
  icons: {
    icon: "/favicon.ico",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <BootstrapClient />
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
