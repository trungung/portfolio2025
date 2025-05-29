import { notFound } from "next/navigation";
import { serialize } from "next-mdx-remote/serialize";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { headers } from "next/headers";
import Script from "next/script";

import { getBlogBySlug, getBlogSlugs } from "@/lib/blogs";
import { MDXContent } from "@/components/MDXContent";
import { generateBlogSchema } from "@/lib/schema";
import Image from "next/image";

export async function generateStaticParams() {
  const slugs = getBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const { slug } = await params;
    const blog = getBlogBySlug(slug);
    const headersList = await headers();
    const host = headersList.get("host") || "";
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
    const url = `${protocol}://${host}/blog/${slug}`;

    return {
      title: `${blog.title} | My Portfolio`,
      description: blog.description,
      openGraph: {
        title: blog.title,
        description: blog.description,
        type: "article",
        publishedTime: blog.date,
        url: url,
        tags: blog.tags,
        ...(blog.coverImage && {
          images: [
            {
              url: blog.coverImage,
              width: 1200,
              height: 630,
              alt: blog.title,
            },
          ],
        }),
      },
      twitter: {
        card: "summary_large_image",
        title: blog.title,
        description: blog.description,
        ...(blog.coverImage && {
          images: [blog.coverImage],
        }),
      },
      alternates: {
        canonical: url,
      },
    };
  } catch {
    return {};
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const { slug } = await params;
    const blog = getBlogBySlug(slug);

    if (!blog.published && process.env.NODE_ENV === "production") {
      return notFound();
    }

    const mdxSource = (await serialize(blog.content, {
      mdxOptions: {
        development: process.env.NODE_ENV === "development",
      },
    })) as MDXRemoteSerializeResult;

    const headersList = await headers();
    const host = headersList.get("host") || "";
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
    const url = `${protocol}://${host}/blog/${slug}`;

    const schemaData = generateBlogSchema(blog, url);

    return (
      <>
        <Script id="blog-schema" type="application/ld+json">
          {JSON.stringify(schemaData)}
        </Script>
        <article className="prose dark:prose-invert mx-auto mt-20 mb-16 w-full max-w-screen-md font-mono">
          <h1>{blog.title}</h1>
          <p className="text-muted-foreground">
            {new Date(blog.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="text-muted-foreground">{blog.description}</p>
          <Image
            src={blog.coverImage}
            alt={blog.title}
            width={800}
            height={600}
            className="mt-6 rounded-xl"
          />

          <MDXContent source={mdxSource} />
        </article>
      </>
    );
  } catch {
    return notFound();
  }
}
