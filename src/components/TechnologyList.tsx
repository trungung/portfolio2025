"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

type TechnologyButtonProps = {
  href: string;
  icon: React.ReactNode;
  name: string;
};

const TechnologyButton = ({ href, icon, name }: TechnologyButtonProps) => {
  return (
    <Button
      asChild
      variant="outline"
      size="sm"
      className="text-md group"
      tabIndex={-1}
    >
      <Link href={href} target="_blank" rel="noopener noreferrer">
        {icon}
        {name}
      </Link>
    </Button>
  );
};

export const TechnologyList = ({
  buttons,
}: {
  buttons: TechnologyButtonProps[];
}) => {
  return (
    <div className="mt-4 flex flex-wrap gap-4">
      {buttons.map((button) => (
        <TechnologyButton key={button.name} {...button} />
      ))}
    </div>
  );
};
