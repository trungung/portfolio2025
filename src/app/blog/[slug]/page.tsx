import { notFound } from "next/navigation";
import { headers } from "next/headers";
import Script from "next/script";

import { getBlogBySlug, getBlogSlugs } from "@/lib/blogs";
import { generateBlogSchema } from "@/lib/schema";
import Image from "next/image";

export async function generateStaticParams() {
  const slugs = getBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  try {
    const { slug } = await params;
    const blog = await getBlogBySlug(slug);
    const headersList = await headers();
    const host = headersList.get("host") || "";
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
    const url = `${protocol}://${host}/blog/${slug}`;

    return {
      title: `${blog.meta.title} | My Portfolio`,
      description: blog.meta.description,
      openGraph: {
        title: blog.meta.title,
        description: blog.meta.description,
        type: "article",
        publishedTime: blog.meta.date,
        url: url,
        tags: blog.meta.tags,
        ...(blog.meta.coverImage && {
          images: [
            {
              url: blog.meta.coverImage,
              width: 1200,
              height: 630,
              alt: blog.meta.title,
            },
          ],
        }),
      },
      twitter: {
        card: "summary_large_image",
        title: blog.meta.title,
        description: blog.meta.description,
        ...(blog.meta.coverImage && {
          images: [blog.meta.coverImage],
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
  params: Promise<{ slug: string }>;
}) {
  try {
    const { slug } = await params;
    const blog = await getBlogBySlug(slug);

    if (!blog.meta.published && process.env.NODE_ENV === "production") {
      notFound();
    }

    const BlogContentComponent = blog.content;

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
          <h1>{blog.meta.title}</h1>
          <p className="text-muted-foreground">
            {new Date(blog.meta.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="text-muted-foreground">{blog.meta.description}</p>
          <Image
            src={blog.meta.coverImage}
            alt={blog.meta.title}
            width={800}
            height={600}
            className="mt-6 rounded-xl"
          />

          <BlogContentComponent />
        </article>
      </>
    );
  } catch {
    return notFound();
  }
}
