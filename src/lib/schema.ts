import { BlogPost } from "./blogs";

export function generateBlogSchema(blog: BlogPost, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "description": blog.description,
    "image": blog.coverImage,
    "datePublished": blog.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "author": {
      "@type": "Person",
      "name": "Trung Ung" // Replace with your actual name
    }
  };
}
