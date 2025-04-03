import { AboutMe } from "@/components/AboutMe";
import { Certificates } from "@/components/Certificates";
import { ContactMe } from "@/components/ContactMe";
import { Hero } from "@/components/Hero";
import { Highlights } from "@/components/Highlights";
import { RecentProjects } from "@/components/RecentProjects";
import { Technologies } from "@/components/Technologies";

export default function Home() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-screen-md font-mono">
      <Hero />
      <Highlights />
      <AboutMe />
      <RecentProjects />
      <Technologies />
      <Certificates />
      <ContactMe />
    </main>
  );
}
