import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../src/components/Navbar";
import Footer from "../src/components/Footer";

export const metadata: Metadata = {
  title: "Medocbills",
  description: "MedocBills offers professional medical billing services, claim management, and healthcare revenue solutions. Simplify your billing process with our expert team.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-black">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
