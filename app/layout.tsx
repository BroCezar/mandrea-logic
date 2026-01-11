import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mandrea Logic | Enterprise AI Engineering",
  description: "Mandrea Logic architectures autonomous systems and intelligent workflows for the enterprise sector. Precision engineering for the AI age.",
  openGraph: {
    title: "Mandrea Logic",
    description: "Automating intelligence. Scaling logic.",
    url: "https://mandrea.ro",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-dark-950 text-slate-100 antialiased`}>
        {children}
      </body>
    </html>
  );
}