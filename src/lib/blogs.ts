import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { z } from "zod";

export const BlogFrontmatterSchema = z.object({
  title: z.string(),
  date: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  published: z.boolean().default(false),
  coverImage: z.string(),
});

export type BlogFrontmatter = z.infer<typeof BlogFrontmatterSchema>;

export type BlogPost = BlogFrontmatter & {
  slug: string;
  content: string;
};

const BLOGS_PATH = path.join(process.cwd(), "src/content/blogs");

export function getBlogSlugs(): string[] {
  const files = fs.readdirSync(BLOGS_PATH);
  return files
    .filter((file) => /\.(mdx|md)$/.test(file))
    .map((file) => file.replace(/\.(mdx|md)$/, ""));
}

export function getBlogBySlug(slug: string): BlogPost {
  const filePath = path.join(BLOGS_PATH, `${slug}.mdx`);
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);

  const frontmatter = BlogFrontmatterSchema.parse(data);

  return {
    ...frontmatter,
    slug,
    content,
  };
}

export function getAllBlogs(publishedOnly: boolean = true): BlogPost[] {
  const slugs = getBlogSlugs();
  const blogs = slugs.map((slug) => getBlogBySlug(slug));

  const filteredBlogs = publishedOnly
    ? blogs.filter((blog) => blog.published)
    : blogs;
  return filteredBlogs.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getRecentBlogs(count: number = 3): BlogPost[] {
  return getAllBlogs().slice(0, count);
}

export function getBlogsByTag(tag: string): BlogPost[] {
  return getAllBlogs().filter((blog) =>
    blog.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase()),
  );
}

export function getAllTags(): string[] {
  const blogs = getAllBlogs();
  const tagsSet = new Set<string>();

  blogs.forEach((blog) => {
    blog.tags.forEach((tag) => tagsSet.add(tag.toLowerCase()));
  });

  return Array.from(tagsSet);
}
