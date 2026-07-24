import { MetadataRoute } from 'next';
import { connectToDatabase } from '@/lib/db';
import Project from '@/models/Project';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://krishnagarg.dev';

  await connectToDatabase();
  const publishedProjects = await Project.find({ published: true }, { slug: 1, updatedAt: 1 }).lean();

  const projectUrls = publishedProjects.map((p: any) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    ...projectUrls,
  ];
}
