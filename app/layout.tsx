import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./versions.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const description =
  "Haoyi Zhao is an incoming master's student at USTC whose current research interest is time series.";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const dynamic = "force-static";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Haoyi Zhao | Academic Homepage",
    template: "%s | Haoyi Zhao",
  },
  description,
  authors: [{ name: "Haoyi Zhao" }],
  creator: "Haoyi Zhao",
  keywords: [
    "Haoyi Zhao",
    "time series",
    "computer technology",
    "USTC",
    "Hefei University of Technology",
  ],
  openGraph: {
    type: "website",
    title: "Haoyi Zhao | Academic Homepage",
    description,
    siteName: "Haoyi Zhao",
    images: [
      {
        url: "/og.png",
        width: 1737,
        height: 905,
        alt: "Haoyi Zhao | Time Series",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Haoyi Zhao | Academic Homepage",
    description,
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
