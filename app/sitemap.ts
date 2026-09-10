import type { MetadataRoute } from 'next';
import { departments } from '@/data/departments';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://bmt2030.example.com';
  const staticPages = [
    '',
    '/departments',
    '/departments/general',
    '/departments/credit',
    '/compare',
    '/quiz',
    '/results',
    '/priorities',
    '/rank',
    '/roadmap',
    '/careers',
    '/salaries',
    '/saved',
    '/report',
    '/methodology',
    '/sources',
    '/about',
    '/privacy',
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPages.map(path => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1 : 0.8,
  }));

  const deptEntries: MetadataRoute.Sitemap = departments.map(d => ({
    url: `${baseUrl}/departments/${d.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  return [...staticEntries, ...deptEntries];
}
