import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const Hero = () => {
  return (
    <section id="hero" className="mt-20 mb-16">
      <h1 className="text-4xl font-bold tracking-[-0.03em]">
        Hey, I&apos;m Trung Ung
      </h1>
      <div className="max-w-prose">
        <p className="mt-2 text-lg">
          I&apos;m a fullstack developer building modern web applications that
          are scalable, maintainable, and feel great to use.
        </p>
        <div className="mt-9 flex flex-row flex-wrap gap-4">
          <Button variant="default" asChild size="lg" className="group">
            <Link href="#contact">
              Contact me
              <ArrowRight className="duration-200 group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button variant="secondary" asChild size="lg" className="group">
            <Link href="#about">
              More about me
              <ArrowRight className="duration-200 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
