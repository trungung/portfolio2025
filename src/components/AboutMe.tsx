import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Link from "next/link";
import { SectionHeader } from "./SectionHeader";

export const AboutMe = () => {
  return (
    <section id="about" className="relative mt-20 mb-16 scroll-mt-20">
      <SectionHeader title="About me" />
      <div className="max-w-prose">
        <p className="mt-4">
          I&apos;m a web developer with experience across both <b>startups</b>{" "}
          and <b>large corporations</b>. I care deeply about clean code,
          intuitive UX, and building with purpose. I&apos;ve built{" "}
          <b>cloud-native</b> apps, automated workflows, and used <b>AI</b> to
          optimize development.
        </p>
        <p className="mt-4">
          My work has improved pricing operations, modernized hotel booking
          systems, and helped scale SaaS products. I&apos;ve also{" "}
          <b>mentored junior developers</b> and enjoy working closely with
          teammates to bring ideas to life.
        </p>
      </div>
      <div className="mt-9 flex flex-row flex-wrap gap-4">
        <Button asChild size="lg" className="group shiny-hover">
          <Link href="/cv.pdf" target="_blank">
            <Download className="duration-200 group-hover:translate-y-0.5" />
            Download CV
          </Link>
        </Button>
        <Button variant="outline" asChild size="lg" className="group">
          <Link href="#contact">Contact me</Link>
        </Button>
      </div>
      <div
        aria-hidden
        className="color-rays minimal:hidden force-motion-reduce:animate-none force-motion-safe:animate-[slide-rays_8s_ease-in-out_infinite] h-full w-full mix-blend-screen motion-safe:animate-[slide-rays_8s_ease-in-out_infinite] motion-reduce:animate-none dark:hidden"
      />
    </section>
  );
};
