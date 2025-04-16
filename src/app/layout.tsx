import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Download, PanelLeft } from "lucide-react";
import { Toaster } from "sonner";
import { SettingDialogButton } from "@/components/SettingDialogButton";
import { ThemeProvider } from "next-themes";
import { MinimalModeProvider } from "@/lib/providers/MinimalModeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trung | Portfolio",
  description:
    "Software engineer with 5 years of experience specializing in modern web applications. Explore my projects, skills, and professional journey.",
  keywords: ["Trung", "Portfolio", "Software Engineer", "Web Developer"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="!scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-[url('/noise.png')] bg-repeat px-6 antialiased dark:bg-none`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MinimalModeProvider>
            <nav className="z-50 mx-auto flex w-full max-w-screen-md items-center gap-4 pt-9 font-mono">
              <Link href="/" className="text-lg font-bold">
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
                <Button size="sm" variant="ghost" asChild className="text-md">
                  <Link href="/">Home</Link>
                </Button>
                <Button size="sm" variant="ghost" asChild className="text-md">
                  <Link href="#projects">My work</Link>
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  asChild
                  className="text-md group"
                >
                  <Link href="/cv">
                    <Download
                      className={"duration-200 group-hover:translate-y-0.5"}
                    />
                    Download CV
                  </Link>
                </Button>
              </div>
              <SettingDialogButton />
            </nav>
            {children}
            <div
              aria-hidden
              className="color-rays minimal:hidden force-motion-reduce:animate-none force-motion-safe:animate-[slide-rays_8s_ease-in-out_infinite] h-[400px] w-full mix-blend-multiply motion-safe:animate-[slide-rays_8s_ease-in-out_infinite] motion-reduce:animate-none dark:mix-blend-darken"
            />
            <footer className="mx-auto w-full max-w-screen-md pb-9 font-mono tracking-tight">
              <hr className="border-border mb-5 border-t" />
              <div className="text-muted-foreground">
                &copy; 2025 Trung. All rights reserved.
              </div>
            </footer>
            <Toaster />
          </MinimalModeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
