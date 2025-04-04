import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight, PanelLeft, Settings } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trung Ung | Portfolio",
  description:
    "Software engineer with 5 years of experience specializing in modern web applications. Explore my projects, skills, and professional journey.",
  keywords: ["Trung Ung", "Portfolio", "Software Engineer", "Web Developer"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} px-6 antialiased`}
      >
        <nav className="z-50 mx-auto flex w-full max-w-screen-md items-center gap-4 pt-9 font-mono">
          <Link href="/" className="text-lg font-bold text-gray-800">
            TU.
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden"
            aria-label="Open menu"
          >
            <PanelLeft className="!h-5 !w-5" />
          </Button>
          <div className="mr-auto hidden sm:inline-flex">
            <Button
              size="sm"
              variant="ghost"
              asChild
              className="text-md text-gray-800"
            >
              <Link href="/">Home</Link>
            </Button>
            <Button
              size="sm"
              variant="ghost"
              asChild
              className="text-md text-gray-800"
            >
              <Link href="/work">My work</Link>
            </Button>
            <Button
              size="sm"
              variant="ghost"
              asChild
              className="text-md text-gray-800"
            >
              <Link href="/cv">CV</Link>
            </Button>
            <Button
              size="sm"
              variant="ghost"
              asChild
              className="text-md text-gray-800"
            >
              <Link href="/">
                More <ChevronRight />
              </Link>
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="group ml-auto"
            aria-label="Open settings"
          >
            <Settings className="!h-5 !w-5 duration-200 group-hover:rotate-90 group-hover:transform motion-reduce:transition-none" />
          </Button>
        </nav>
        {children}
        <div
          aria-hidden
          className="color-rays h-[400px] w-full mix-blend-multiply"
        />
        <footer className="mx-auto w-full max-w-screen-md pb-9">
          <hr className="border-border mb-5 border-t" />
          <div className="text-muted-foreground">
            &copy; 2025 Trung Ung. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
