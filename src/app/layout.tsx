import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "King Chinese Bowl | Premium Asian Cuisine",
  description: "Experience the royal flavors of Asia at King Chinese Bowl. Premium Chinese, Korean, Nepalese & Tibetan cuisine in an elegant dining atmosphere. Order online or reserve your table.",
  keywords: "chinese restaurant, korean food, nepalese cuisine, tibetan food, asian restaurant, fine dining, order online, table reservation",
  openGraph: {
    title: "King Chinese Bowl | Premium Asian Cuisine",
    description: "Experience the royal flavors of Asia. Premium Chinese, Korean, Nepalese & Tibetan cuisine.",
    type: "website",
    locale: "en_IN",
    siteName: "King Chinese Bowl",
  },
  twitter: {
    card: "summary_large_image",
    title: "King Chinese Bowl | Premium Asian Cuisine",
    description: "Experience the royal flavors of Asia. Premium Chinese, Korean, Nepalese & Tibetan cuisine.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        <CartProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
