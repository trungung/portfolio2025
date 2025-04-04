import {
  SiNodedotjs,
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiExpress,
  SiTailwindcss,
  SiMui,
  SiGit,
  SiGithub,
  SiJest,
  SiCypress,
  SiVuedotjs,
  SiGraphql,
  SiRedis,
  SiDocker,
} from "@icons-pack/react-simple-icons";

import { Button } from "./ui/button";
import { PlaywrightIcon } from "../icons/playwright";
import { AzureIcon } from "../icons/azure";
import { AwsIcon } from "../icons/aws";
import { SectionHeader } from "./SectionHeader";

const TechnologyButton = ({
  href,
  icon,
  name,
}: {
  href: string;
  icon: React.ReactNode;
  name: string;
}) => {
  return (
    <Button asChild variant="outline" size="sm" className="text-md group">
      <a href={href} target="_blank" rel="noopener noreferrer">
        {icon}
        {name}
      </a>
    </Button>
  );
};

export const Technologies = () => {
  const buttons = [
    {
      href: "https://azure.microsoft.com/",
      icon: <AzureIcon className="duration-200 group-hover:-rotate-12" />,
      name: "Azure",
    },
    {
      href: "https://aws.amazon.com/",
      icon: <AwsIcon className="duration-200 group-hover:-rotate-12" />,
      name: "AWS",
    },
    {
      href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      icon: (
        <SiJavascript
          color="default"
          className="duration-200 group-hover:-rotate-12"
        />
      ),
      name: "JavaScript",
    },
    {
      href: "https://typescriptlang.org/",
      icon: (
        <SiTypescript
          color="default"
          className="duration-200 group-hover:-rotate-12"
        />
      ),
      name: "TypeScript",
    },
    {
      href: "https://reactjs.org/",
      icon: (
        <SiReact
          color="default"
          className="duration-200 group-hover:-rotate-12"
        />
      ),
      name: "React",
    },
    {
      href: "https://nextjs.org/",
      icon: (
        <SiNextdotjs
          color="default"
          className="duration-200 group-hover:-rotate-12"
        />
      ),
      name: "Next.js",
    },
    {
      href: "https://vuejs.org/",
      icon: (
        <SiVuedotjs
          color="default"
          className="duration-200 group-hover:-rotate-12"
        />
      ),
      name: "Vue.js",
    },
    {
      href: "https://tailwindcss.com/",
      icon: (
        <SiTailwindcss
          color="default"
          className="duration-200 group-hover:-rotate-12"
        />
      ),
      name: "Tailwind CSS",
    },
    {
      href: "https://mui.com/",
      icon: (
        <SiMui
          color="default"
          className="duration-200 group-hover:-rotate-12"
        />
      ),
      name: "Material UI",
    },
    {
      href: "https://nodejs.org/",
      icon: (
        <SiNodedotjs
          color="default"
          className="duration-200 group-hover:-rotate-12"
        />
      ),
      name: "Node.js",
    },
    {
      href: "https://expressjs.com/",
      icon: (
        <SiExpress
          color="default"
          className="duration-200 group-hover:-rotate-12"
        />
      ),
      name: "Express.js",
    },
    {
      href: "https://git-scm.com/",
      icon: (
        <SiGit
          color="default"
          className="duration-200 group-hover:-rotate-12"
        />
      ),
      name: "Git",
    },
    {
      href: "https://github.com/ung-trung",
      icon: (
        <SiGithub
          color="default"
          className="duration-200 group-hover:-rotate-12"
        />
      ),
      name: "GitHub",
    },
    {
      href: "https://restapi.com/",
      icon: null,
      name: "REST API",
    },
    {
      href: "https://graphql.org/",
      icon: (
        <SiGraphql
          color="default"
          className="duration-200 group-hover:-rotate-12"
        />
      ),
      name: "GraphQL",
    },
    {
      href: "https://www.docker.com/",
      icon: (
        <SiDocker
          color="default"
          className="duration-200 group-hover:-rotate-12"
        />
      ),
      name: "Docker",
    },
    {
      href: "https://www.postgresql.org/",
      icon: (
        <SiPostgresql
          color="default"
          className="duration-200 group-hover:-rotate-12"
        />
      ),
      name: "PostgreSQL",
    },
    {
      href: "https://www.mysql.com/",
      icon: (
        <SiMysql
          color="default"
          className="duration-200 group-hover:-rotate-12"
        />
      ),
      name: "MySQL",
    },
    {
      href: "https://www.mongodb.com/",
      icon: (
        <SiMongodb
          color="default"
          className="duration-200 group-hover:-rotate-12"
        />
      ),
      name: "MongoDB",
    },
    {
      href: "https://redis.io/",
      icon: (
        <SiRedis
          color="default"
          className="duration-200 group-hover:-rotate-12"
        />
      ),
      name: "Redis",
    },
    {
      href: "https://jestjs.io/",
      icon: (
        <SiJest
          color="default"
          className="duration-200 group-hover:-rotate-12"
        />
      ),
      name: "Jest",
    },
    {
      href: "https://playwright.dev/",
      icon: <PlaywrightIcon className="duration-200 group-hover:-rotate-12" />,
      name: "Playwright",
    },
    {
      href: "https://www.cypress.io/",
      icon: (
        <SiCypress
          color="default"
          className="duration-200 group-hover:-rotate-12"
        />
      ),
      name: "Cypress",
    },
  ];
  return (
    <section id="technologies" className="mt-20 mb-16 scroll-mt-20">
      <SectionHeader title="Technologies I use" />
      <div className="max-w-prose">
        <p className="mt-4">
          Over the past 5 years, I&apos;ve gained experience across the stack.
          Below are some of the technologies I&apos;ve used along the way.
        </p>
      </div>
      <div className="mt-4 flex flex-wrap gap-4">
        {buttons.map((button) => (
          <TechnologyButton key={button.name} {...button} />
        ))}
      </div>
      <p className="mt-4 text-center">...and many more!</p>
    </section>
  );
};
