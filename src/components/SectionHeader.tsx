"use client";

import { motion } from "framer-motion";

export const SectionHeader = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center gap-3" role="heading" aria-level={2}>
      <div
        className="bg-primary minimal:inline hidden h-[1.7rem] w-1 origin-bottom"
        aria-hidden="true"
      />
      <motion.div
        className="bg-primary minimal:hidden h-[1.7rem] w-1 origin-bottom"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        transition={{ duration: 0.3, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        aria-hidden="true"
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
