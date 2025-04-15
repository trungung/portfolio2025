"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "../ui/badge";
import { Gallery } from "./Galery";
import { Project } from "./project";

interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal = ({
  project,
  isOpen,
  onClose,
}: ProjectModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="max-h-[90vh] gap-0 overflow-y-auto sm:max-w-3xl"
        aria-labelledby={`dialog-title-${project.id}`}
        aria-describedby={`dialog-description-${project.id}`}
      >
        <DialogTitle className="flex items-center gap-2 text-xl font-bold md:text-2xl">
          {project.title} <Badge>{project.type}</Badge>
        </DialogTitle>

        <span className="text-muted-foreground text-xs font-medium">
          {project.duration}
        </span>

        <Gallery pictures={project.pictures} title={project.title} />

        <div
          id={`dialog-description-${project.id}`}
          className="prose prose-sm dark:prose-invert max-w-none"
        >
          {project.extendedDescription}
        </div>

        <div className="mt-6">
          <h3 className="mb-2 text-lg font-semibold">Technologies</h3>
          <div className="flex flex-wrap gap-2">
            {project.stacks.map((tech, index) => (
              <span
                key={index}
                className="bg-secondary/30 hover:bg-secondary/50 rounded-full px-3 py-1 text-sm transition-all"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {project.sources.length > 0 && (
          <div className="mt-6">
            <h3 className="mb-2 text-lg font-semibold">Links</h3>
            <div className="flex flex-wrap gap-3">
              {project.sources.map((source, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  asChild
                  className="group"
                >
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${source.name} (opens in new tab)`}
                    className="inline-flex items-center gap-2"
                  >
                    <span>{source.name}</span>
                    <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </Button>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
