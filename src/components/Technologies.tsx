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
} from "@icons-pack/react-simple-icons";

import { Button } from "./ui/button";
import { PlaywrightIcon } from "./icons/playwright";
import { AzureIcon } from "./icons/azure";
import { AwsIcon } from "./icons/aws";

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
    <Button asChild variant="outline" size="sm" className="text-md">
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
      href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      icon: <SiJavascript color="default" className="inline-block" />,
      name: "JavaScript",
    },
    {
      href: "https://typescriptlang.org/",
      icon: <SiTypescript color="default" className="inline-block" />,
      name: "TypeScript",
    },
    {
      href: "https://reactjs.org/",
      icon: <SiReact color="default" className="inline-block" />,
      name: "React",
    },
    {
      href: "https://nextjs.org/",
      icon: <SiNextdotjs color="default" className="inline-block" />,
      name: "Next.js",
    },
    {
      href: "https://vuejs.org/",
      icon: <SiVuedotjs color="default" className="inline-block" />,
      name: "Vue.js",
    },
    {
      href: "https://tailwindcss.com/",
      icon: <SiTailwindcss color="default" className="inline-block" />,
      name: "Tailwind CSS",
    },
    {
      href: "https://mui.com/",
      icon: <SiMui color="default" className="inline-block" />,
      name: "Material UI",
    },
    {
      href: "https://nodejs.org/",
      icon: <SiNodedotjs color="default" className="inline-block" />,
      name: "Node.js",
    },
    {
      href: "https://expressjs.com/",
      icon: <SiExpress color="default" className="inline-block" />,
      name: "Express.js",
    },
    {
      href: "https://git-scm.com/",
      icon: <SiGit color="default" className="inline-block" />,
      name: "Git",
    },
    {
      href: "https://github.com/ung-trung",
      icon: <SiGithub color="default" className="inline-block" />,
      name: "GitHub",
    },
    {
      href: "https://azure.microsoft.com/",
      icon: <AzureIcon className="inline-block" />,
      name: "Azure",
    },
    {
      href: "https://aws.amazon.com/",
      icon: <AwsIcon className="inline-block" />,
      name: "AWS",
    },
    {
      href: "https://restapi.com/",
      icon: null,
      name: "REST API",
    },
    {
      href: "https://graphql.org/",
      icon: <SiGraphql color="default" className="inline-block" />,
      name: "GraphQL",
    },
    {
      href: "https://www.postgresql.org/",
      icon: <SiPostgresql color="default" className="inline-block" />,
      name: "PostgreSQL",
    },
    {
      href: "https://www.mysql.com/",
      icon: <SiMysql color="default" className="inline-block" />,
      name: "MySQL",
    },
    {
      href: "https://www.mongodb.com/",
      icon: <SiMongodb color="default" className="inline-block" />,
      name: "MongoDB",
    },
    {
      href: "https://redis.io/",
      icon: <SiRedis color="default" className="inline-block" />,
      name: "Redis",
    },
    {
      href: "https://jestjs.io/",
      icon: <SiJest color="default" className="inline-block" />,
      name: "Jest",
    },
    {
      href: "https://playwright.dev/",
      icon: <PlaywrightIcon className="inline-block" />,
      name: "Playwright",
    },
    {
      href: "https://www.cypress.io/",
      icon: <SiCypress color="default" className="inline-block" />,
      name: "Cypress",
    },
  ];
  return (
    <section id="technologies" className="mt-20 mb-16 scroll-mt-20">
      <h2 className="mb-2 box-decoration-clone bg-clip-text text-[1.7rem] font-bold">
        Technologies I use
        <span className="bg-gradient-to-r from-yellow-300 to-yellow-600 box-decoration-clone bg-clip-text text-transparent">
          .
        </span>
      </h2>
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
