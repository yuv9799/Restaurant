import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "ReNorth — Where the Mountains Meet the Masala",
  description: "Authentic North Indian cuisine, reimagined. From the foothills to your table — every dish tells a story.",
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-background">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        {/* EmailJS SDK for booking email notifications */}
        <Script
          src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
