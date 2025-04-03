import { Award, Briefcase, PackageOpen, ShieldCheck } from "lucide-react";

export const Highlights = () => {
  return (
    <section id="highlights" className="mb-16">
      <div className="text-primary-foreground/70 flex flex-col justify-between gap-4 sm:flex-row">
        <div className="text-xs font-bold">
          <Briefcase className="inline-block" /> 5+ years experience
        </div>
        <div className="text-xs font-bold">
          <ShieldCheck className="inline-block" />{" "}
          <a
            className="underline"
            href="https://learn.microsoft.com/api/credentials/share/en-us/ungkientrung/80B2DBEFDEA4B25?sharingId=B3FE2FE1B9855E8"
            target="_blank"
          >
            Azure
          </a>{" "}
          &{" "}
          <a
            className="underline"
            href="https://www.credly.com/badges/de2977b7-a2c3-4b80-9c53-d9b1279b9689/public_url"
            target="_blank"
          >
            AWS
          </a>{" "}
          certified
        </div>
        <div className="text-xs font-bold">
          <Award className="inline-block" /> 2× award winner
        </div>
        <div className="text-xs font-bold">
          <PackageOpen className="inline-block" /> 6+ products delivered
        </div>
      </div>
    </section>
  );
};
