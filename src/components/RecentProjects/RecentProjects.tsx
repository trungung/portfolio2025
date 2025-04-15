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
    <section id="projects" className="mt-20 mb-16 scroll-mt-20">
      <SectionHeader title="Recent projects" />
      <p className="mt-4 max-w-prose">
        Here are a few highlights of projects I&apos;ve worked on lately.
      </p>

      <div className="mt-9 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
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
            {showAll ? "Show Less" : "Show All Projects"}
          </Button>
        </div>
      )}

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
