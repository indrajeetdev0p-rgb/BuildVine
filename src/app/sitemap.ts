import { MetadataRoute } from "next";
import { db } from "@/lib/db";

const BASE_URL = "https://buildvine.tech";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/explore`, lastModified: new Date(), changeFrequency: "hourly", priority: 0.9 },
    { url: `${BASE_URL}/trending`, lastModified: new Date(), changeFrequency: "hourly", priority: 0.9 },
    { url: `${BASE_URL}/developers`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/docs`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
  ];

  // Dynamic project pages
  let projectPages: MetadataRoute.Sitemap = [];
  try {
    const projects = await db.project.findMany({
      where: { isPublic: true },
      select: { slug: true, updatedAt: true },
    });
    projectPages = projects.map((p) => ({
      url: `${BASE_URL}/project/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch {}

  // Dynamic user portfolio pages
  let userPages: MetadataRoute.Sitemap = [];
  try {
    const users = await db.user.findMany({
      where: { username: { not: null } },
      select: { username: true, updatedAt: true },
    });
    userPages = users
      .filter((u) => u.username)
      .map((u) => ({
        url: `${BASE_URL}/${u.username}`,
        lastModified: u.updatedAt,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }));
  } catch {}

  return [...staticPages, ...projectPages, ...userPages];
}
