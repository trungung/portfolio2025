import { AwsIcon } from "./icons/aws";
import { AzureIcon } from "./icons/azure";
import { ExternalLink } from "lucide-react";
export const Certificates = () => {
  const certs = [
    {
      name: "Microsoft Certified: Azure Developer Associate (AZ-204)",
      icon: <AzureIcon className="inline-block h-4 w-4" />,
      href: "https://learn.microsoft.com/en-gb/users/ungkientrung/credentials/80b2dbefdea4b25",
    },
    {
      name: "Microsoft Certified: Azure AI Fundamentals (AI-900)",
      icon: <AzureIcon className="inline-block h-4 w-4" />,
      href: "https://learn.microsoft.com/en-gb/users/ungkientrung/credentials/CC387F2EE1761008",
    },
    {
      name: "Microsoft Certified: Azure Fundamentals (AZ 900)",
      icon: <AzureIcon className="inline-block h-4 w-4" />,
      href: "https://learn.microsoft.com/en-us/users/ungkientrung/credentials/b4e25f390b95e0c2",
    },
    {
      name: "AWS Certified Solutions Architect - Associate",
      icon: <AwsIcon className="inline-block h-4 w-4" />,
      href: "https://www.credly.com/badges/de2977b7-a2c3-4b80-9c53-d9b1279b9689/public_url",
    },
    {
      name: "AWS Certified Cloud Practitioner",
      icon: <AwsIcon className="inline-block h-4 w-4" />,
      href: "https://www.credly.com/badges/c9a6e540-1e48-4ecd-817d-1933192783a3/public_url",
    },
    {
      name: "Professional Scrum Master™ I Certification",
      href: "https://www.scrum.org/user/1208173",
    },
  ];
  return (
    <section id="certificates" className="mt-20 mb-16 scroll-mt-20">
      <h2 className="mb-2 box-decoration-clone bg-clip-text text-[1.7rem] font-bold">
        Certificates
        <span className="bg-gradient-to-r from-yellow-300 to-yellow-600 box-decoration-clone bg-clip-text text-transparent">
          .
        </span>
      </h2>
      <ul className="mt-4 flex flex-col items-start gap-2">
        {certs.map((cert) => (
          <li key={cert.name}>
            <a
              href={cert.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 hover:underline"
            >
              {cert.icon}
              {cert.name}
              <ExternalLink
                size={14}
                className="hidden duration-200 group-hover:translate-x-1 sm:block"
              />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};
