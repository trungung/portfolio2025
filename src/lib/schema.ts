import { BlogDetail } from "./blogs";

export function generateBlogSchema(blog: BlogDetail, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.meta.title,
    description: blog.meta.description,
    image: blog.meta.coverImage,
    datePublished: blog.meta.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    author: {
      "@type": "Person",
      name: "Trung Ung",
    },
  };
}
