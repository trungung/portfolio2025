"use client";
import { useScramble } from "use-scramble";

export const ScrambleHero = () => {
  const { ref } = useScramble({
    text: "I'm Trung Ung",
    range: [65, 125],
    speed: 1,
    tick: 1,
    step: 5,
    scramble: 5,
    seed: 2,
    chance: 1,
    overdrive: false,
    overflow: false,
  });

  return (
    <>
      <span
        ref={ref}
        className="inline-block min-w-[15ch]"
        aria-hidden="true"
      />
      <span className="sr-only">I&apos;m Trung Ung</span>
    </>
  );
};
