import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Toaster } from "sonner";
import { SettingDialogButton } from "@/components/SettingDialogButton";
import { ThemeProvider } from "next-themes";
import { MinimalModeProvider } from "@/lib/providers/MinimalModeProvider";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

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
      {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID &&
        process.env.NODE_ENV === "production" && (
          <GoogleAnalytics
            gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID!}
          />
        )}
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
                size="sm"
                variant="ghost"
                asChild
                className="text-md group sm:hidden"
              >
                <Link href="/cv">
                  <Download
                    className={"duration-200 group-hover:translate-y-0.5"}
                  />
                  Download CV
                </Link>
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
            <footer className="mx-auto w-full max-w-screen-md pb-9 font-mono tracking-tight">
              <hr className="border-border mb-5 border-t" />
              <div className="text-muted-foreground align-center flex justify-between text-sm">
                <span>&copy; 2019 - 2025 | Trung Ung</span>
                <span>
                  <Link
                    href="https://github.com/ung-trung/portfolio2025"
                    target="_blank"
                  >
                    View Source
                  </Link>
                </span>
              </div>
            </footer>
            <Toaster />
          </MinimalModeProvider>
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
