import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClickSpark from "@/components/ui/ClickSpark";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: "ReviveAI",
  description: "AI-powered payment recovery",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${geistMono.variable} antialiased bg-[#07080C] text-[#F5F7FA]`}>
        <ClickSpark
          sparkColor='#8B5CF6'
          sparkSize={8}
          sparkRadius={20}
          sparkCount={6}
          duration={500}
        >
          {children}
        </ClickSpark>
      </body>
    </html>
  );
}
