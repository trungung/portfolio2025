"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";

type AnimatedNumberProps = {
  from?: number;
  to: number;
  duration?: number;
  delay?: number;
  formatter?: (value: number) => string;
  className?: string;
};

export const AnimatedNumber = ({
  to,
  from = 0,
  duration = 2,
  delay = 0,
  formatter = (value) => Math.round(value).toString(),
  className,
}: AnimatedNumberProps) => {
  const [displayValue, setDisplayValue] = useState(from);
  const elementRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(elementRef, {
    once: true,
    margin: "0px 0px -100px 0px",
  });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const startAnimation = (timestamp: number) => {
      startTime = timestamp;
      animateCount(timestamp);
    };

    const animateCount = (timestamp: number) => {
      const runtime = timestamp - startTime;
      const relativeProgress = runtime / (duration * 1000);

      if (relativeProgress < 1) {
        const easedProgress = easeOutQuart(relativeProgress);
        const currentValue = from + (to - from) * easedProgress;
        setDisplayValue(currentValue);
        animationFrame = requestAnimationFrame(animateCount);
      } else {
        setDisplayValue(to);
      }
    };

    const timeoutId = setTimeout(() => {
      animationFrame = requestAnimationFrame(startAnimation);
    }, delay * 1000);

    return () => {
      clearTimeout(timeoutId);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [from, to, duration, delay, isInView]);

  const easeOutQuart = (x: number): number => {
    return 1 - Math.pow(1 - x, 4);
  };

  return (
    <>
      <span className={cn(className, "minimal:inline hidden")}>
        {formatter(to)}
      </span>
      <span ref={elementRef} className={cn(className, "minimal:hidden")}>
        {formatter(displayValue)}
      </span>
    </>
  );
};
