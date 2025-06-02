import fs from "fs";
import path from "path";
import { z } from "zod";
import type { ComponentType } from "react";

export const BlogMetaSchema = z.object({
  title: z.string(),
  date: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  published: z.boolean().default(false),
  coverImage: z.string(),
});

export const BlogListItemSchema = z.object({
  slug: z.string(),
  meta: BlogMetaSchema,
});

export const BlogDetailSchema = z.object({
  slug: z.string(),
  meta: BlogMetaSchema,
  content: z.custom<ComponentType>(),
});

export type BlogMeta = z.infer<typeof BlogMetaSchema>;
export type BlogListItem = z.infer<typeof BlogListItemSchema>;
export type BlogDetail = z.infer<typeof BlogDetailSchema>;

const BLOGS_PATH = path.join(process.cwd(), "src/content/blogs");

export const getBlogSlugs = (): string[] => {
  return fs
    .readdirSync(BLOGS_PATH)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
};

export const getBlogBySlug = async (slug: string): Promise<BlogDetail> => {
  const fileName = `${slug}.mdx`;
  const blogModule = await import(`@/content/blogs/${fileName}`);

  if (!blogModule || !blogModule.metadata || !blogModule.default) {
    throw new Error(
      `Failed to load blog post: ${slug}. MDX module or its exports are missing.`,
    );
  }

  const blog = {
    slug,
    meta: blogModule.metadata,
    content: blogModule.default,
  };

  const parsedBlog = BlogDetailSchema.parse(blog);

  return parsedBlog;
};

export const getBlogList = async (
  publishedOnly = true,
): Promise<BlogListItem[]> => {
  const slugs = getBlogSlugs();

  const blogsPromises = slugs.map(async (slug) => {
    const blogModule = await import(`@/content/blogs/${slug}.mdx`);
    if (!blogModule || !blogModule.metadata) {
      throw new Error(
        `Failed to load blog metadata: ${slug}. MDX module or its metadata export is missing.`,
      );
    }
    const blog = { slug, meta: blogModule.metadata };
    const parsedBlog = BlogListItemSchema.parse(blog);

    return parsedBlog;
  });

  const blogs = await Promise.all(blogsPromises);

  return blogs
    .filter((blog) => (publishedOnly ? blog.meta.published : true))
    .sort(
      (a, b) =>
        new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime(),
    );
};
