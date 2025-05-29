import { MetadataRoute } from 'next';
import { getAllBlogs } from '@/lib/blogs';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourportfolio.com'; // Replace with your actual domain
  
  // Get all blog posts
  const blogs = getAllBlogs();
  
  // Generate sitemap entries for blog posts
  const blogEntries = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: new Date(blog.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    // Add other static pages as needed
  ];
  
  return [...staticPages, ...blogEntries];
}
