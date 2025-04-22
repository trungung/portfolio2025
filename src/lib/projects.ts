import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface ProjectFrontmatter {
  index: number;
  title: string;
  duration: string;
  stacks: string[];
  isNda: boolean;
  thumbnail: string;
  pictures: string[];
  sources: {
    name: string;
    url: string;
  }[];
  cardDescription: string;
  quickSummary: string;
}

export interface Project {
  slug: string;
  frontmatter: ProjectFrontmatter;
  content: string;
}

export function getProjects(): Project[] {
  const projectDirectory = path.join(
    process.cwd(),
    "src/components/RecentProjects/project-content",
  );

  const mdxFiles = fs
    .readdirSync(projectDirectory)
    .filter((file) => file.endsWith(".mdx"));

  const projects = mdxFiles.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, "");

    const filePath = path.join(projectDirectory, fileName);
    const fileContent = fs.readFileSync(filePath, "utf8");

    const { data, content } = matter(fileContent);

    return {
      slug,
      frontmatter: data as ProjectFrontmatter,
      content,
    };
  });

  return projects.sort((a, b) => a.frontmatter.index - b.frontmatter.index);
}
