"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Volume1, Volume2 } from "lucide-react";
import { motion } from "framer-motion";

import { useRef } from "react";

const animConfig = {
  pathLength: {
    duration: 0.8,
    ease: "easeInOut",
    delayIncrement: 0.1,
  },
  fill: {
    duration: 0.8,
    ease: [0, 0, 0.2, 1] as const,
    delayOffset: 0.6,
  },
};

const getAnimationProps = (index: number) => {
  const pathDelay = index * animConfig.pathLength.delayIncrement;
  const fillDelay = pathDelay + animConfig.fill.delayOffset;

  return {
    initial: { pathLength: 0, fillOpacity: 0 },
    animate: {
      pathLength: 1,
      fillOpacity: 1,
      transition: {
        pathLength: {
          delay: pathDelay,
          duration: animConfig.pathLength.duration,
          ease: animConfig.pathLength.ease,
        },
        fillOpacity: {
          delay: fillDelay,
          duration: animConfig.fill.duration,
          ease: animConfig.fill.ease,
        },
      },
    },
  };
};

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
        <h1 className="flex flex-wrap items-center gap-4 text-4xl font-bold tracking-[-0.03em]">
          <span className="minimal:hidden">
            Hey, I&apos;m{" "}
            <span className="rounded-xl bg-gray-500/10 px-4 py-2 backdrop-blur-sm dark:bg-gray-200/10">
              <motion.svg
                width="106"
                height="32"
                viewBox="0 0 106 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="inline"
                initial="hidden"
                animate="visible"
              >
                <motion.path
                  id="T"
                  d="M7.244 26V5.048H0.440002V0.440002H19.16V5.048H12.356V26H7.244Z"
                  stroke="var(--foreground)"
                  strokeWidth="1"
                  fill="var(--foreground)"
                  {...getAnimationProps(0)}
                />
                <motion.path
                  id="R"
                  d="M27.7859 26V6.70399H31.3859L31.7819 11.744H31.4579C31.6499 10.064 32.1299 8.804 32.8979 7.96399C33.6899 7.124 34.8419 6.70399 36.3539 6.70399H40.6739V10.7H36.7139C35.8019 10.7 35.0459 10.856 34.4459 11.168C33.8459 11.48 33.4019 11.948 33.1139 12.572C32.8259 13.196 32.6819 13.976 32.6819 14.912V26H27.7859ZM23.1779 26V22.112H38.5499V26H23.1779ZM23.1779 10.592V6.70399H30.7019V10.592H23.1779Z"
                  stroke="var(--foreground)"
                  strokeWidth="1"
                  fill="var(--foreground)"
                  {...getAnimationProps(1)}
                />
                <motion.path
                  id="U"
                  d="M50.7039 26.432C48.9039 26.432 47.4759 25.832 46.4199 24.632C45.3639 23.408 44.8359 21.644 44.8359 19.34V6.70399H49.7319V18.116C49.7319 19.604 49.9719 20.672 50.4519 21.32C50.9559 21.968 51.6759 22.292 52.6119 22.292C53.5959 22.292 54.4239 21.92 55.0959 21.176C55.7919 20.432 56.1399 19.34 56.1399 17.9V6.70399H60.9999V26H56.4999L56.3919 20.456L56.9679 20.6C56.7039 22.448 56.0199 23.888 54.9159 24.92C53.8359 25.928 52.4319 26.432 50.7039 26.432Z"
                  stroke="var(--foreground)"
                  strokeWidth="1"
                  fill="var(--foreground)"
                  {...getAnimationProps(2)}
                />
                <motion.path
                  id="N"
                  d="M66.3498 26V6.704H70.8138L70.9578 11.96L70.4538 11.744C70.6938 10.496 71.1018 9.464 71.6778 8.648C72.2778 7.832 73.0098 7.232 73.8738 6.848C74.7378 6.464 75.6978 6.272 76.7538 6.272C78.1458 6.272 79.2738 6.584 80.1378 7.208C81.0258 7.832 81.6858 8.684 82.1178 9.764C82.5498 10.844 82.7658 12.092 82.7658 13.508V26H77.8698V14.624C77.8698 13.16 77.6178 12.092 77.1138 11.42C76.6338 10.748 75.9018 10.412 74.9178 10.412C74.2458 10.412 73.6338 10.58 73.0818 10.916C72.5298 11.252 72.0858 11.744 71.7498 12.392C71.4138 13.04 71.2458 13.856 71.2458 14.84V26H66.3498Z"
                  stroke="var(--foreground)"
                  strokeWidth="1"
                  fill="var(--foreground)"
                  {...getAnimationProps(3)}
                />
                <motion.path
                  id="G"
                  d="M95.9997 31.832C94.4397 31.832 93.0718 31.604 91.8958 31.148C90.7438 30.692 89.7958 30.044 89.0518 29.204C88.3318 28.388 87.8277 27.416 87.5397 26.288L92.6517 26C92.8677 26.576 93.2398 27.032 93.7678 27.368C94.2958 27.704 95.0397 27.872 95.9997 27.872C97.3677 27.872 98.3997 27.56 99.0957 26.936C99.8157 26.336 100.176 25.448 100.176 24.272V22.04C99.7438 22.928 99.0837 23.648 98.1957 24.2C97.3077 24.728 96.1917 24.992 94.8477 24.992C93.3117 24.992 91.9317 24.608 90.7077 23.84C89.5077 23.048 88.5597 21.968 87.8637 20.6C87.1917 19.208 86.8558 17.612 86.8558 15.812C86.8558 13.868 87.1917 12.188 87.8637 10.772C88.5357 9.332 89.4597 8.228 90.6357 7.46C91.8358 6.668 93.2038 6.272 94.7398 6.272C96.0358 6.272 97.1518 6.572 98.0878 7.172C99.0478 7.748 99.7677 8.576 100.248 9.656L100.32 6.704H105.072V23.66C105.072 25.46 104.7 26.96 103.956 28.16C103.212 29.384 102.156 30.296 100.788 30.896C99.4438 31.52 97.8477 31.832 95.9997 31.832ZM96.0717 21.068C97.2957 21.068 98.2797 20.624 99.0238 19.736C99.7918 18.824 100.176 17.48 100.176 15.704C100.2 14.504 100.032 13.508 99.6718 12.716C99.3358 11.9 98.8558 11.288 98.2318 10.88C97.6078 10.448 96.8877 10.232 96.0717 10.232C94.7517 10.232 93.7317 10.7 93.0117 11.636C92.2917 12.572 91.9317 13.928 91.9317 15.704C91.9317 17.48 92.2917 18.824 93.0117 19.736C93.7557 20.624 94.7757 21.068 96.0717 21.068Z"
                  stroke="var(--foreground)"
                  strokeWidth="1"
                  fill="var(--foreground)"
                  {...getAnimationProps(4)}
                />
              </motion.svg>
            </span>
          </span>
          <span className="minimal:inline hidden">Hey, I&apos;m Trung</span>
          <Button
            variant="ghost"
            className="group !px-1"
            onClick={handlePlaySound}
            aria-label={`Pronounce my name: Trung`}
          >
            /troong/
            <Volume1 className="group-hover:hidden" />
            <Volume2 className="hidden group-hover:block" />
          </Button>
        </h1>
        <div className="max-w-prose">
          <p className="mt-4 text-lg">
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
