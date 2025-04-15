import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ScrambleHero } from "./ScrambleHero";
import { MotionAware } from "./MotionAware";

export const Hero = () => {
  return (
    <section id="hero" className="mt-20 mb-16">
      <h1 className="text-4xl font-bold tracking-[-0.03em]">
        <MotionAware
          motionSafe={
            <>
              Hey, <ScrambleHero text="I'm Trung" />
            </>
          }
          motionReduce={<span>Hey, I&apos;m Trung</span>}
        />
      </h1>
      <div className="max-w-prose">
        <p className="mt-2 text-lg">
          I&apos;m a <b>fullstack developer</b> based in <b>Helsinki</b>. I help
          teams ship fast, clean, and reliable web apps.
        </p>
        <div className="mt-9 flex flex-row flex-wrap gap-4">
          <MotionAware
            motionSafe={
              <Button asChild size="lg" className="shiny-hover">
                <Link href="#contact">Contact me</Link>
              </Button>
            }
            motionReduce={
              <Button asChild size="lg">
                <Link href="#contact">Contact me</Link>
              </Button>
            }
          />
          <Button variant="outline" asChild size="lg" className="">
            <Link href="#about">More about me</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
