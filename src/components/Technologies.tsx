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
      icon: <SiJavascript color="default" />,
      name: "JavaScript",
    },
    {
      href: "https://typescriptlang.org/",
      icon: <SiTypescript color="default" />,
      name: "TypeScript",
    },
    {
      href: "https://reactjs.org/",
      icon: <SiReact color="default" />,
      name: "React",
    },
    {
      href: "https://nextjs.org/",
      icon: <SiNextdotjs color="default" />,
      name: "Next.js",
    },
    {
      href: "https://vuejs.org/",
      icon: <SiVuedotjs color="default" />,
      name: "Vue.js",
    },
    {
      href: "https://tailwindcss.com/",
      icon: <SiTailwindcss color="default" />,
      name: "Tailwind CSS",
    },
    {
      href: "https://mui.com/",
      icon: <SiMui color="default" />,
      name: "Material UI",
    },
    {
      href: "https://nodejs.org/",
      icon: <SiNodedotjs color="default" />,
      name: "Node.js",
    },
    {
      href: "https://expressjs.com/",
      icon: <SiExpress color="default" />,
      name: "Express.js",
    },
    {
      href: "https://git-scm.com/",
      icon: <SiGit color="default" />,
      name: "Git",
    },
    {
      href: "https://github.com/ung-trung",
      icon: <SiGithub color="default" />,
      name: "GitHub",
    },
    {
      href: "https://azure.microsoft.com/",
      icon: <AzureIcon />,
      name: "Azure",
    },
    {
      href: "https://aws.amazon.com/",
      icon: <AwsIcon />,
      name: "AWS",
    },
    {
      href: "https://restapi.com/",
      icon: null,
      name: "REST API",
    },
    {
      href: "https://graphql.org/",
      icon: <SiGraphql color="default" />,
      name: "GraphQL",
    },
    {
      href: "https://www.postgresql.org/",
      icon: <SiPostgresql color="default" />,
      name: "PostgreSQL",
    },
    {
      href: "https://www.mysql.com/",
      icon: <SiMysql color="default" />,
      name: "MySQL",
    },
    {
      href: "https://www.mongodb.com/",
      icon: <SiMongodb color="default" />,
      name: "MongoDB",
    },
    {
      href: "https://redis.io/",
      icon: <SiRedis color="default" />,
      name: "Redis",
    },
    {
      href: "https://jestjs.io/",
      icon: <SiJest color="default" />,
      name: "Jest",
    },
    {
      href: "https://playwright.dev/",
      icon: <PlaywrightIcon />,
      name: "Playwright",
    },
    {
      href: "https://www.cypress.io/",
      icon: <SiCypress color="default" />,
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
