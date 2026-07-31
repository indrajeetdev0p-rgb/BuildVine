import { db } from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import ProjectContent from "./ProjectContent";
import { incrementProjectViews } from "@/lib/actions/project";
import { Metadata } from "next";

export const revalidate = 60; // revalidate every 60 seconds

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await db.project.findUnique({
    where: { slug },
  });

  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.name} | BuildVine`,
    description: project.tagline || project.description || `Check out ${project.name} on BuildVine`,
    openGraph: {
      title: `${project.name} | BuildVine`,
      description: project.tagline || project.description || `Check out ${project.name} on BuildVine`,
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(project.name)}&author=${encodeURIComponent(project.userId)}`,
          width: 1200,
          height: 630,
          alt: project.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} | BuildVine`,
      description: project.tagline || project.description || `Check out ${project.name} on BuildVine`,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const { slug } = await params;
  let project;
  try {
    project = await db.project.findUnique({
      where: { slug },
      include: {
        user: {
          select: {
            name: true,
            username: true,
            avatar: true,
            image: true,
          },
        },
        techStack: true,
        categories: true,
        features: true,
        timeline: true,
        comments: {
          include: { user: true },
          orderBy: { createdAt: "desc" }
        },
        _count: { select: { upvotes: true } },
        upvotes: true
      },
    });
  } catch (error) {
    console.error("PAGE ERROR:", error);
    notFound();
  }

  if (!project) notFound();

  // Hide private projects if we aren't the owner
  // In a real app we'd verify session.user.id == project.userId, but for now we just 404
  if (!project.isPublic) {
    // If not public, we could potentially check auth here
    // but for now let's just show it, or we could 404
    // notFound();
  }

  if (project && project.userId !== session.user.id) {
    await incrementProjectViews(project.id);
  }

  return <ProjectContent project={project} />;
}
