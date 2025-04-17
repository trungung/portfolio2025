"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Project } from "./project";
import { Badge } from "../ui/badge";
import { useSettings } from "@/lib/store/settings";

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
  const { minimalMode } = useSettings();
  const cardContent = (
    <Card
      className={cn(
        "group relative flex h-full cursor-pointer flex-col overflow-hidden border py-0 transition-all duration-300",
        "hover:border-primary/70 p-3",
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
      <div className="relative aspect-[5/3] w-full overflow-hidden rounded-sm">
        <div className="relative h-full w-full">
          {hasImages ? (
            <Image
              src={project.pictures[0]}
              alt={`Thumbnail for ${project.title}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={cn(
                "object-cover transition-transform duration-700 ease-out group-hover:scale-105 dark:brightness-90",
                project.isNda && "blur-[2px]",
              )}
              priority={index < 4}
            />
          ) : (
            <Image
              src="/images/placeholder-nda.png"
              alt="nda Project"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover blur-sm transition-transform duration-700 ease-out group-hover:scale-105 dark:brightness-90"
              priority={index < 4}
            />
          )}
          {project.isNda && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-background/60 rounded-lg px-4 py-2 shadow-sm backdrop-blur-sm">
                <p className="text-sm font-medium">🔒 NDA Project</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div
        className={
          "bg-background/80 minimal:right-0 absolute top-3 -right-full z-20 rounded-l-full px-3 py-1 text-xs font-medium backdrop-blur-sm transition-all duration-300 group-hover:right-0"
        }
      >
        {project.duration}
      </div>

      {/* Content section with improved spacing */}
      <div className="3 flex flex-1 flex-col px-2">
        {/* Title that grows slightly on hover */}
        <h3 className="text-lg leading-tight font-semibold">{project.title}</h3>

        {/* Description with slightly increased visibility on hover */}
        <p className="text-muted-foreground mt-2 line-clamp-3 text-sm transition-opacity duration-300">
          {project.description}
        </p>

        {/* Tech stack with animated reveal */}
        <div className="mt-auto pt-4">
          <div className="flex flex-wrap gap-1.5">
            {project.stacks.slice(0, 3).map((tech) => (
              <Badge
                key={tech}
                variant="outline"
                className="px-2.5 py-1 text-xs"
              >
                {tech}
              </Badge>
            ))}
            {project.stacks.length > 3 && (
              <Badge
                variant="outline"
                className="px-2.5 py-1 text-xs opacity-70"
              >
                +{project.stacks.length - 3}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Card>
  );

  return minimalMode ? (
    <div className="h-full">{cardContent}</div>
  ) : (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      className="h-full"
    >
      {cardContent}
    </motion.div>
  );
};
