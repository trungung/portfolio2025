import { AboutMe } from "@/components/AboutMe";
import { Certificates } from "@/components/Certificates";
import { ContactMe } from "@/components/ContactMe";
import { Hero } from "@/components/Hero";
import { Highlights } from "@/components/Highlights";
import { RecentProjects } from "@/components/RecentProjects/RecentProjects";
import { Technologies } from "@/components/Technologies";
import { getProjectList } from "@/lib/projects";

export default async function Home() {
  const projects = await getProjectList();

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
