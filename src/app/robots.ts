import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourportfolio.com'; // Replace with your actual domain
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
