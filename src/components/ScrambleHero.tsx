"use client";
import { useScramble } from "use-scramble";
import { useSettings } from "@/lib/store/settings";

export const ScrambleHero = ({ text }: { text: string }) => {
  const { minimalMode } = useSettings();

  const { ref } = useScramble({
    text,
    range: [65, 125],
    speed: minimalMode ? 0 : 1, // Disable animation in minimal mode
    tick: 1,
    step: 5,
    scramble: 5,
    seed: 2,
    chance: 1,
    overdrive: false,
    overflow: false,
    playOnMount: !minimalMode, // Don't play animation if in minimal mode
  });

  return (
    <>
      <span ref={ref} className="inline-block" aria-hidden="true" />
      <span className="sr-only">{text}</span>
    </>
  );
};
