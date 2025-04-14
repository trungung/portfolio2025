import { AwsIcon } from "../icons/aws";
import { AzureIcon } from "../icons/azure";
import { CalendarDays, ExternalLink } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "./ui/hover-card";

export const Certificates = () => {
  const certs = [
    {
      name: "Microsoft Certified: Azure Developer Associate (AZ-204)",
      icon: <AzureIcon className="inline-block h-4 w-4" />,
      href: "https://learn.microsoft.com/en-gb/users/ungkientrung/credentials/80b2dbefdea4b25",
      issuedBy: "Microsoft",
      issuedDate: "31 October 2024",
      credentialId: "80B2DBEFDEA4B25",
    },
    {
      name: "Microsoft Certified: Azure AI Fundamentals (AI-900)",
      icon: <AzureIcon className="inline-block h-4 w-4" />,
      href: "https://learn.microsoft.com/en-gb/users/ungkientrung/credentials/CC387F2EE1761008",
      issuedBy: "Microsoft",
      issuedDate: "26 November 2024",
      credentialId: "CC387F2EE1761008",
    },
    {
      name: "Microsoft Certified: Azure Fundamentals (AZ 900)",
      icon: <AzureIcon className="inline-block h-4 w-4" />,
      href: "https://learn.microsoft.com/en-us/users/ungkientrung/credentials/b4e25f390b95e0c2",
      issuedBy: "Microsoft",
      issuedDate: "25 October 2022",
      credentialId: "B4E25F390B95E0C2",
    },
    {
      name: "AWS Certified Solutions Architect - Associate",
      icon: <AwsIcon className="inline-block h-4 w-4" />,
      href: "https://www.credly.com/badges/de2977b7-a2c3-4b80-9c53-d9b1279b9689/public_url",
      issuedBy: "AWS",
      issuedDate: "24 May 2022",
      credentialId: "T6YDQOLBFM44QE3Y",
    },
    {
      name: "AWS Certified Cloud Practitioner",
      icon: <AwsIcon className="inline-block h-4 w-4" />,
      href: "https://www.credly.com/badges/c9a6e540-1e48-4ecd-817d-1933192783a3/public_url",
      issuedBy: "AWS",
      issuedDate: "03 May 2022",
      credentialId: "Y64SBMMBHEEQQH33",
    },
    {
      name: "Professional Scrum Master™ I Certification",
      icon: <span className="inline-block">🌀</span>,
      href: "https://www.scrum.org/user/1208173",
      issuedBy: "Scrum.org",
      issuedDate: "03 March 2023",
      credentialId: null,
    },
  ];
  return (
    <section id="certificates" className="mt-20 mb-16 scroll-mt-20">
      <SectionHeader title="Certificates" />
      <ul className="mt-4 flex flex-col items-start gap-2">
        {certs.map((cert) => (
          <li key={cert.name}>
            <HoverCard openDelay={200}>
              <HoverCardTrigger asChild>
                <button
                  role="button"
                  aria-label={`More info about ${cert.name} - Issued date: ${cert.issuedDate} - Credential ID: ${cert.credentialId}`}
                  className="group inline-flex items-center gap-2 transition hover:text-yellow-600"
                >
                  {cert.icon}
                  <span className="underline decoration-dotted underline-offset-4">
                    {cert.name}
                  </span>
                  <span className="hidden transition-transform group-hover:translate-x-1 sm:inline-block">
                    <ExternalLink size={12} />
                  </span>
                </button>
              </HoverCardTrigger>
              <HoverCardContent className="border-border w-80 rounded-md border p-4 shadow-xl">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 font-semibold">
                    {cert.icon} {cert.issuedBy}
                  </div>
                  <div>
                    <p>{cert.name}</p>
                    {cert.credentialId && (
                      <p className="text-muted-foreground text-xs">
                        Credential ID:{" "}
                        <span className="font-mono">{cert.credentialId}</span>
                      </p>
                    )}
                  </div>
                  <a
                    href={cert.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium transition-colors hover:underline"
                  >
                    Go to certificate <ExternalLink size={12} />
                  </a>
                  <div className="text-muted-foreground flex items-center pt-2 text-xs">
                    <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
                    Issued on {cert.issuedDate}
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </li>
        ))}
      </ul>
    </section>
  );
};
