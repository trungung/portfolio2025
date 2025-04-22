"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectGallery } from "./ProjectGallery";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Badge } from "../ui/badge";
import { useCallback, useState, useEffect } from "react";
import { Project } from "@/lib/projects";
import { Suspense } from "react";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";

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
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(
    null,
  );

  useEffect(() => {
    const prepareMdx = async () => {
      if (project && project.content) {
        const mdxSource = await serialize(project.content);
        setMdxSource(mdxSource);
      }
    };

    prepareMdx();
  }, [project]);

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
        <DialogTitle className="flex items-center gap-4 text-xl font-bold md:text-2xl">
          {project.frontmatter.title}{" "}
          {project.frontmatter.isNda && (
            <Badge className="bg-yellow-500 text-sm text-black">
              NDA Project
            </Badge>
          )}
        </DialogTitle>
        <DialogDescription> {project.frontmatter.duration}</DialogDescription>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.frontmatter.stacks.map((tech, index) => (
            <Badge variant="outline" key={index} className="text-sm">
              {tech}
            </Badge>
          ))}
        </div>
        <section className="prose prose-sm dark:prose-invert">
          <h3 className="mt-7">Quick summary</h3>
          <blockquote>{project.frontmatter.quickSummary}</blockquote>
        </section>

        {project.frontmatter.pictures.length > 0 && (
          <ProjectGallery
            pictures={project.frontmatter.pictures}
            title={project.frontmatter.title}
            onGridViewChange={onGridViewChange}
          />
        )}

        <div
          id={`dialog-description-${project.slug}`}
          className="prose prose-sm dark:prose-invert [&>h3:first-of-type]:mt-7"
        >
          <Suspense fallback={<p>Loading content...</p>}>
            {mdxSource ? (
              <MDXRemote {...mdxSource} />
            ) : (
              <p>Loading content...</p>
            )}
          </Suspense>
        </div>

        {project.frontmatter.sources.length > 0 && (
          <div className="mt-7">
            <h3 className="mb-2 text-lg font-semibold">Links</h3>
            <div className="flex flex-wrap gap-3">
              {project.frontmatter.sources.map((source, index) => (
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
