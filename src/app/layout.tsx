import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Metode PrEP Mana yang Tepat untukmu?",
  description: "Pelajari berbagai metode PrEP sebelum mengikuti kuis.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${montserrat.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
