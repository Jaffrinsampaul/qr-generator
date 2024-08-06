import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "QR Generator",
  description: "Application use to generate QR code",
  author: "Jaffrin sampaul",
  language:"english",
  googlebot: "notranslate",
  revised: "Friday August 2th, 2024, 12:23 AM",
  rating :"safe for kids",
  copyright: "Copyright 2024"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
