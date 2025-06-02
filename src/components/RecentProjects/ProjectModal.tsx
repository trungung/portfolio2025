"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCallback, useMemo, useState } from "react";
import { DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { ProjectGallery } from "./ProjectGallery";
import dynamic from "next/dynamic";
import { ProjectListItem } from "@/lib/projects";

type ProjectModalProps = {
  project: ProjectListItem;
  isOpen: boolean;
  onClose: () => void;
};

export const ProjectModal = ({
  project,
  isOpen,
  onClose,
}: ProjectModalProps) => {
  const [shouldCloseOnEscape, setShouldCloseOnEscape] = useState(true);

  const Component = useMemo(
    () =>
      dynamic(() => import(`../../content/projects/${project.slug}.mdx`), {
        ssr: false,
        loading: () => <p>Loading...</p>,
      }),
    [project.slug],
  );
  const onGridViewChange = useCallback((isGridView: boolean) => {
    setShouldCloseOnEscape(isGridView);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="max-h-[90vh] gap-0 overflow-y-auto font-mono sm:max-w-3xl"
        aria-labelledby={`dialog-title-${project.slug}`}
        aria-describedby={`dialog-description-${project.slug}`}
        onEscapeKeyDown={(e) => {
          if (shouldCloseOnEscape) return;
          e.preventDefault();
        }}
      >
        <DialogTitle className="flex items-center gap-4 p-6 pb-0 text-xl font-bold md:text-2xl">
          {project.meta.title}{" "}
          {project.meta.isNda && (
            <Badge className="bg-yellow-500 text-sm text-black">
              NDA Project
            </Badge>
          )}
        </DialogTitle>
        <div className="px-6">
          <DialogDescription className="text-muted-foreground text-sm">
            {project.meta.duration}
          </DialogDescription>
          <div className="mt-4 flex max-w-prose flex-wrap gap-2">
            {project.meta.stacks.map((tech: string, index: number) => (
              <Badge variant="outline" key={index} className="text-sm">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6 px-2 py-6 sm:px-4 md:px-6">
          <section className="prose prose-sm dark:prose-invert">
            <h3>Quick summary</h3>
            <blockquote>{project.meta.quickSummary}</blockquote>
          </section>

          {project.meta.pictures.length > 0 && (
            <ProjectGallery
              pictures={project.meta.pictures}
              title={project.meta.title}
              onGridViewChange={onGridViewChange}
            />
          )}

          <section
            id={`dialog-description-${project.slug}`}
            className="prose prose-sm dark:prose-invert"
          >
            {Component ? (
              <Component />
            ) : (
              <p>Project content is not available.</p>
            )}
          </section>

          {project.meta.sources.length > 0 && (
            <section className="mt-7">
              <h3 className="mb-2 text-lg font-semibold">Links</h3>
              <div className="flex flex-wrap gap-3">
                {project.meta.sources.map((source, index) => (
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
            </section>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
