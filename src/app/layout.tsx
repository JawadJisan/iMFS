// "user client";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "./globals.css";
import Providers from "@/lib/Providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "iMFS",
  description:
    "First Ever Bangladesh Internet Mobile Financial  Services (IMFS) Platform.",
  icons: {
    icon: "/assets/images/newLogos.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        <body className={poppins.variable}>{children}</body>
      </html>
    </Providers>
  );
}
