import MainLayout from "@/components/layout/MainLayout";
import { CartProvider } from "@/context/CartContext";
import { UIProvider } from "@/context/UIContext";
import { baseJsonLd, baseMetadata } from "@/lib/metadata-config";
import { Inter, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans-3",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata = baseMetadata;

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${sourceSans3.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(baseJsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${sourceSans3.variable}`}>
        <UIProvider>
          <CartProvider>
            <MainLayout>{children}</MainLayout>
          </CartProvider>
        </UIProvider>
      </body>
    </html>
  );
}
