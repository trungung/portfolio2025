"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";

type TechnologyButtonProps = {
  href: string;
  icon: React.ReactNode;
  name: string;
};

const TechnologyButton = ({ href, icon, name }: TechnologyButtonProps) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 12 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Button
        asChild
        variant="outline"
        size="sm"
        className="text-md group"
        tabIndex={-1}
      >
        <a href={href} target="_blank" rel="noopener noreferrer">
          {icon}
          {name}
        </a>
      </Button>
    </motion.div>
  );
};

export const TechnologyList = ({
  buttons,
}: {
  buttons: TechnologyButtonProps[];
}) => {
  return (
    <motion.div
      className="mt-4 flex flex-wrap gap-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.05,
            delayChildren: 0.1,
          },
        },
      }}
    >
      {buttons.map((button) => (
        <TechnologyButton key={button.name} {...button} />
      ))}
    </motion.div>
  );
};
