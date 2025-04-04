import { Award, Briefcase, PackageOpen, ShieldCheck } from "lucide-react";
import { AnimatedNumber } from "./AnimatedNumber";

export const Highlights = () => {
  return (
    <section id="highlights" className="mb-16">
      <div className="text-primary-foreground/70 flex flex-col justify-between gap-4 sm:flex-row">
        <div className="hover:text-primary-foreground text-xs font-bold">
          <Briefcase className="inline-block" />{" "}
          <AnimatedNumber duration={3.5} to={5} />+ years experience
        </div>
        <a
          href="#certificates"
          className="hover:text-primary-foreground text-xs font-bold"
        >
          <ShieldCheck className="inline-block" /> Azure & AWS certified
        </a>
        <div className="hover:text-primary-foreground text-xs font-bold">
          <Award className="inline-block" />{" "}
          <AnimatedNumber duration={3.5} to={2} />× award winner
        </div>
        <a
          href="#projects"
          className="hover:text-primary-foreground text-xs font-bold"
        >
          <PackageOpen className="inline-block" />{" "}
          <AnimatedNumber duration={3.5} to={6} />+ products delivered{" "}
        </a>
      </div>
    </section>
  );
};
