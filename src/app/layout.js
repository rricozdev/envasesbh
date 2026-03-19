import MainLayout from "@/components/layout/MainLayout";
import "./globals.css";
import { Inter, Source_Sans_3 } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans-3",
});
export const metadata = {
  title: "Envases BH",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${sourceSans3.variable}`}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
