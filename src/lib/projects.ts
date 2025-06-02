import fs from "fs";
import path from "path";
import { z } from "zod";
import type { ComponentType } from "react";

export const ProjectMetaSchema = z.object({
  index: z.number(),
  title: z.string(),
  duration: z.string(),
  stacks: z.array(z.string()),
  isNda: z.boolean().optional(),
  thumbnail: z.string(),
  pictures: z.array(z.string()),
  sources: z.array(
    z.object({
      name: z.string(),
      url: z.string(),
    }),
  ),
  cardDescription: z.string(),
  quickSummary: z.string(),
});

export const ProjectListItemSchema = z.object({
  slug: z.string(),
  meta: ProjectMetaSchema,
});

export const ProjectDetailSchema = z.object({
  slug: z.string(),
  meta: ProjectMetaSchema,
  content: z.custom<ComponentType>(),
});

export type ProjectMeta = z.infer<typeof ProjectMetaSchema>;
export type ProjectListItem = z.infer<typeof ProjectListItemSchema>;
export type ProjectDetail = z.infer<typeof ProjectDetailSchema>;

const PROJECT_PATH = path.join(process.cwd(), "src/content/projects");

export async function getProjectList(): Promise<ProjectListItem[]> {
  const mdxFiles = fs
    .readdirSync(PROJECT_PATH)
    .filter((file) => file.endsWith(".mdx"));

  const projectsPromises = mdxFiles.map(async (fileName) => {
    const slug = fileName.replace(/\.mdx$/, "");

    const projectModule = await import(`@/content/projects/${fileName}`);

    if (!projectModule || !projectModule.metadata) {
      throw new Error(
        `Failed to load project metadata: ${slug}. MDX module or its metadata export is missing.`,
      );
    }

    const project = { meta: projectModule.metadata, slug };
    const parsedProject = ProjectListItemSchema.parse(project);

    return parsedProject;
  });

  const projects = await Promise.all(projectsPromises);

  return projects.sort((a, b) => a.meta.index - b.meta.index);
}
