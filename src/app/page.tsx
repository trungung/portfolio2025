import { AboutMe } from "@/components/AboutMe";
import { Certificates } from "@/components/Certificates";
import { ContactMe } from "@/components/ContactMe";
import { Hero } from "@/components/Hero";
import { Highlights } from "@/components/Highlights";
import { RecentProjects } from "@/components/RecentProjects/RecentProjects";
import { Technologies } from "@/components/Technologies";
import { getProjects } from "@/lib/projects";

const projects = getProjects();

export default function Home() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-screen-md font-mono">
      <Hero />
      <Highlights />
      <AboutMe />
      <RecentProjects projects={projects} />
      <Technologies />
      <Certificates />
      <ContactMe />
    </main>
  );
}
