"use client";

import { useState } from "react";
import { SectionHeader } from "../SectionHeader";
import { Button } from "../ui/button";
import { ProjectModal } from "./ProjectModal";
import { ProjectCard } from "./ProjectCard";
import { Project, projects } from "./project";

export const RecentProjects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showAll, setShowAll] = useState(false);

  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
  };

  const displayedProjects = showAll ? projects : projects.slice(0, 6);

  return (
    <section
      id="projects"
      className="relative right-1/2 left-1/2 mt-20 mr-[-50vw] mb-16 ml-[-50vw] w-screen scroll-mt-20 px-4"
    >
      <div className="mx-auto max-w-screen-md">
        <SectionHeader title="Recent projects" />
        <p className="mt-4 max-w-prose">
          Here are a few highlights of projects I&apos;ve worked on lately.
        </p>
      </div>
      <div className="mx-auto max-w-screen-md lg:max-w-screen-lg">
        <div className="grid grid-cols-1 gap-6 pt-12 pb-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {displayedProjects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onClick={openProjectModal}
            />
          ))}
        </div>
        {projects.length > 6 && (
          <div className="mt-8 flex justify-center">
            <Button
              onClick={() => setShowAll(!showAll)}
              className="px-6"
              variant="outline"
            >
              {showAll ? "Show Less" : "See All Projects"}
            </Button>
          </div>
        )}
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={closeProjectModal}
        />
      )}
    </section>
  );
};
