import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { incrementProjectViews } from "@/lib/actions/project";
import PublicProjectContent from "./PublicProjectContent";
import { Metadata } from "next";
import { getSession } from "@/lib/session";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await db.project.findUnique({
    where: { slug },
    include: {
      user: true,
    }
  });

  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.name} | BuildVine`,
    description: project.tagline || project.description,
  };
}

export default async function PublicProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Note: No session check here! This is explicitly a public read-only route.
  // Triggering hot reload for Turbopack
  
  const project = await db.project.findUnique({
    where: { slug },
    include: {
      user: true,
      techStack: true,
      timeline: {
        orderBy: { date: "desc" },
        take: 10
      },
      comments: {
        include: { user: true },
        orderBy: { createdAt: "desc" }
      },
      _count: { select: { upvotes: true } },
      upvotes: true
    },
  });

  if (!project || !project.isPublic) {
    notFound();
  }

  const session = await getSession();
  if (!session || project.userId !== session.user.id) {
    await incrementProjectViews(project.id);
  }

  return <PublicProjectContent project={project} />;
}
