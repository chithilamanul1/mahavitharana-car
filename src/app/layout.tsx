import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Mahavithana Enterprises | Brand New Cars – Welisara, Sri Lanka",
  description:
    "Mahavithana Enterprises is a premium brand-new car dealership located in Welisara, Sri Lanka. Browse our full vehicle inventory and contact us today.",
  keywords: "car dealership, brand new cars, Welisara, Sri Lanka, Mahavithana, vehicles for sale",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#0a0a0a]">
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
