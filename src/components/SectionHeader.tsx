"use client";

import { motion } from "framer-motion";
import { MotionAware } from "./MotionAware";

export const SectionHeader = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center gap-3" role="heading" aria-level={2}>
      <MotionAware
        motionSafe={
          <motion.div
            className="bg-primary h-[1.7rem] w-1 origin-bottom"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.5 }}
            viewport={{ once: true }}
            aria-hidden="true"
          />
        }
        motionReduce={
          <div
            className="bg-primary h-[1.7rem] w-1 origin-bottom"
            aria-hidden="true"
          />
        }
      />
      <h2 className="text-[1.7rem] leading-none font-bold">
        {title}
        <span className="bg-gradient-to-r from-yellow-300 to-yellow-600 bg-clip-text text-transparent">
          .
        </span>
      </h2>
    </div>
  );
};
