import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ScrambleHero } from "./ScrambleHero";

export const Hero = () => {
  return (
    <section id="hero" className="mt-20 mb-16">
      <h1 className="text-4xl font-bold tracking-[-0.03em]">
        Hey, <ScrambleHero />
      </h1>
      <div className="max-w-prose">
        <p className="mt-2 text-lg">
          I&apos;m a fullstack developer building modern web applications that
          are scalable, maintainable, and feel great to use.
        </p>
        <div className="mt-9 flex flex-row flex-wrap gap-4">
          <Button asChild size="lg" className="group shiny-hover">
            <Link href="#contact">Contact me</Link>
          </Button>
          <Button variant="outline" asChild size="lg" className="group">
            <Link href="#about">More about me</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
