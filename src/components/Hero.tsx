"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Volume1, Volume2 } from "lucide-react";
import { ScrambleHero } from "./ScrambleHero";
import { useRef } from "react";

export const Hero = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlaySound = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/troong.mp3");
    }
    audioRef.current.currentTime = 0;
    audioRef.current.play();
  };
  return (
    <section className="relative">
      <div id="hero" className="mt-20 mb-16">
        <h1 className="flex items-center gap-4 text-4xl font-bold tracking-[-0.03em]">
          <span className="minimal:hidden">
            Hey, <ScrambleHero text="I'm Trung" />
          </span>
          <span className="minimal:inline hidden">Hey, I&apos;m Trung</span>
          <Button
            variant="ghost"
            className="group !p-0"
            onClick={handlePlaySound}
            aria-label={`Pronounce my name: Trung`}
          >
            /troong/
            <Volume1 className="group-hover:hidden" />
            <Volume2 className="hidden group-hover:block" />
          </Button>
        </h1>
        <div className="max-w-prose">
          <p className="mt-2 text-lg">
            I&apos;m a <b>fullstack developer</b> based in <b>Helsinki</b>. I
            help teams ship fast, clean, and reliable web apps.
          </p>
          <div className="mt-9 flex flex-row flex-wrap gap-4">
            <Button asChild size="lg" className="shiny-hover">
              <Link href="#contact">Contact me</Link>
            </Button>
            <Button variant="outline" asChild size="lg" className="">
              <Link href="#about">More about me</Link>
            </Button>
          </div>
        </div>
      </div>
      <div
        aria-hidden
        className="color-rays minimal:hidden animate-rays absolute top-0 right-0 left-0 -z-10 -mt-20 h-[180%] w-screen mix-blend-multiply dark:mix-blend-darken"
        style={{
          marginLeft: "calc(-50vw + 50%)",
          marginRight: "calc(-50vw + 50%)",
        }}
      />
    </section>
  );
};
