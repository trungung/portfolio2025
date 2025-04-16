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
    <section id="hero" className="mt-20 mb-16">
      <h1 className="flex items-center gap-4 text-4xl font-bold tracking-[-0.03em]">
        <span className="minimal:hidden">
          Hey, <ScrambleHero text="I'm Trung" />
        </span>
        <span className="minimal:inline hidden">Hey, I&apos;m Trung</span>
        <Button variant="ghost" className="group" onClick={handlePlaySound}>
          /troong/
          <Volume1 className="group-hover:hidden" />
          <Volume2 className="hidden group-hover:block" />
        </Button>
      </h1>
      <div className="max-w-prose">
        <p className="mt-2 text-lg">
          I&apos;m a <b>fullstack developer</b> based in <b>Helsinki</b>. I help
          teams ship fast, clean, and reliable web apps.
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
    </section>
  );
};
