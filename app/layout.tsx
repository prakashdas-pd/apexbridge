import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import FloatingActions from "@/components/layout/floating-actions";
import LiveChat from "@/components/layout/live-chat";
import ProgressIndicator from "@/components/layout/progress-indicator";
import BookingSystem from "@/components/sections/booking-system";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Apex Bridge Solutions - IT Staff Augmentation & Salesforce Services",
  description: "Your trusted partner for IT staff augmentation, Salesforce solutions, and cutting-edge cloud & AI services. Connecting top talent with leading companies worldwide.",
  keywords: "IT staff augmentation, Salesforce, Cloud services, AI solutions, IT consulting, Software developers, Cloud engineers",
  authors: [{ name: "Apex Bridge Solutions" }],
  openGraph: {
    title: "Apex Bridge Solutions",
    description: "Your trusted partner for IT staff augmentation and Salesforce solutions",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ProgressIndicator />
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <FloatingActions />
        <LiveChat />
        <BookingSystem />
      </body>
    </html>
  );
}
