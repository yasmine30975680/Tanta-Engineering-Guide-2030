import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/results', '/report', '/saved', '/rank'],
    },
    sitemap: 'https://bmt2030.example.com/sitemap.xml',
  };
}
