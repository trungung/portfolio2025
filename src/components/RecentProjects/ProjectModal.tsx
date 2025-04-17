"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Gallery } from "./Galery";
import { Project } from "./project";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Badge } from "../ui/badge";
import { useCallback, useState } from "react";

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
  const [shouldCloseOnEscape, setShouldCloseOnEscape] = useState(true);
  const onGridViewChange = useCallback((isGridView: boolean) => {
    setShouldCloseOnEscape(isGridView);
  }, []);
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="max-h-[90vh] gap-0 overflow-y-auto sm:max-w-3xl"
        aria-labelledby={`dialog-title-${project.id}`}
        aria-describedby={`dialog-description-${project.id}`}
        onEscapeKeyDown={(e) => {
          if (shouldCloseOnEscape) return;
          e.preventDefault();
        }}
      >
        <DialogTitle className="flex items-center gap-2 text-xl font-bold md:text-2xl">
          {project.title}
        </DialogTitle>
        <DialogDescription> {project.duration}</DialogDescription>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.stacks.map((tech, index) => (
            <Badge variant="outline" key={index} className="text-sm">
              {tech}
            </Badge>
          ))}
        </div>
        <section className="prose prose-sm dark:prose-invert">
          <h3 className="mt-7">Quick summary</h3>
          <blockquote>{project.quickSummary}</blockquote>
        </section>

        {!project.isNda && project.pictures.length > 0 && (
          <Gallery
            pictures={project.pictures}
            title={project.title}
            onGridViewChange={onGridViewChange}
          />
        )}

        <div
          id={`dialog-description-${project.id}`}
          className="prose prose-sm dark:prose-invert"
        >
          {project.extendedDescription}
        </div>

        {project.sources.length > 0 && (
          <div className="mt-7">
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
