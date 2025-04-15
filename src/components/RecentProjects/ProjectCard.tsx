"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { Project } from "./project";

export const ProjectCard = ({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: (project: Project) => void;
}) => {
  const hasImages = project.pictures && project.pictures.length > 0;
  const isNda = project.type.includes("nda");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="h-full"
    >
      <Card
        className={cn(
          "group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-md border py-0 transition-all duration-300",
          "hover:border-primary/20 hover:-translate-y-1 hover:shadow-md",
        )}
        onClick={() => onClick(project)}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick(project);
          }
        }}
        role="button"
        aria-label={`View details for ${project.title}`}
      >
        {/* Thumbnail with layered depth effect */}
        <div className="relative aspect-[5/3] w-full overflow-hidden">
          {hasImages && !isNda ? (
            <div className="relative h-full w-full">
              {/* Gradient overlay that reveals on hover */}
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-30 transition-opacity duration-300 ease-in-out group-hover:opacity-70" />

              {/* Main image */}
              <Image
                src={project.pictures[0]}
                alt={`Thumbnail for ${project.title}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                priority={index < 4}
              />

              {/* Duration "sticker" that slides in on hover */}
              <div className="bg-background/80 absolute top-3 -right-full z-20 rounded-l-full px-3 py-1 text-xs font-medium backdrop-blur-sm transition-all duration-300 group-hover:right-0">
                {project.duration}
              </div>
            </div>
          ) : (
            <div className="relative h-full w-full">
              {/* nda placeholder image */}
              <Image
                src="/images/nda-placeholder.png"
                alt="nda Project"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover blur-sm"
                priority={index < 4}
              />

              {/* Semi-transparent overlay for better text readability */}
              <div className="absolute inset-0 bg-black/10"></div>

              {/* nda indicator */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-background/60 rounded-lg px-4 py-2 shadow-sm backdrop-blur-sm">
                  <p className="text-sm font-medium">🔒 nda Project</p>
                </div>
              </div>

              {/* Duration "sticker" that slides in on hover */}
              <div className="bg-background/80 absolute top-3 -right-full z-20 rounded-l-full px-3 py-1 text-xs font-medium backdrop-blur-sm transition-all duration-300 group-hover:right-0">
                {project.duration}
              </div>
            </div>
          )}

          {/* Project type badge positioned on top of the image */}
          <div className="absolute top-3 left-3 z-20">
            <Badge
              variant={isNda ? "destructive" : "secondary"}
              className="px-2 py-0.5 text-xs opacity-90"
            >
              {project.type}
            </Badge>
          </div>
        </div>

        {/* Content section with improved spacing */}
        <div className="flex flex-1 flex-col px-5 pb-3">
          {/* Title that grows slightly on hover */}
          <h3 className="text-lg leading-tight font-semibold">
            {project.title}
          </h3>

          {/* Description with slightly increased visibility on hover */}
          <p className="text-muted-foreground mt-2 line-clamp-2 text-sm transition-opacity duration-300">
            {project.description}
          </p>

          {/* Tech stack with animated reveal */}
          <div className="mt-auto pt-4">
            <div className="flex flex-wrap gap-1.5">
              {project.stacks.slice(0, 3).map((tech, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.1, duration: 0.3 }}
                  viewport={{ once: true }}
                  className="bg-background border-secondary/10 text-secondary-foreground hover:bg-secondary/5 flex items-center rounded-full border px-2.5 py-1 text-xs transition-colors duration-300"
                >
                  <span className="relative mr-1.5 flex h-1.5 w-1.5">
                    <span className="bg-secondary/40 absolute inline-flex h-full w-full rounded-full opacity-75"></span>
                    <span className="bg-secondary relative inline-flex h-1 w-1 rounded-full"></span>
                  </span>
                  {tech}
                </motion.span>
              ))}
              {project.stacks.length > 3 && (
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                  viewport={{ once: true }}
                  className="text-muted-foreground border-secondary/10 rounded-full border px-2.5 py-1 text-xs"
                >
                  +{project.stacks.length - 3}
                </motion.span>
              )}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
