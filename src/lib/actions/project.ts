"use server";

import { db } from "@/lib/db";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// CREATE
export async function createProject(formData: FormData) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  const name = formData.get("name") as string;
  let slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  
  // ensure unique slug
  let uniqueSlug = slug;
  let counter = 1;
  while (await db.project.findUnique({ where: { slug: uniqueSlug } })) {
    uniqueSlug = `${slug}-${counter}`;
    counter++;
  }
  slug = uniqueSlug;

  const project = await db.project.create({
    data: {
      name,
      slug,
      tagline: formData.get("tagline") as string || null,
      description: formData.get("description") as string || null,
      status: (formData.get("status") as any) || "IDEA",
      website: formData.get("website") as string || null,
      github: formData.get("github") as string || null,
      liveDemo: formData.get("liveDemo") as string || null,
      docs: formData.get("docs") as string || null,
      logo: formData.get("logo") as string || null,
      coverImage: formData.get("coverImage") as string || null,
      userId: session.user.id,
    },
  });

  const techStack = formData.getAll("techStack") as string[];
  if (techStack.length > 0) {
    await db.projectTechStack.createMany({
      data: techStack.map((tech) => ({
        projectId: project.id,
        techName: tech,
      })),
    });
  }

  const featuresJson = formData.get("features") as string;
  if (featuresJson) {
    try {
      const features = JSON.parse(featuresJson);
      if (features.length > 0) {
        await db.projectFeature.createMany({
          data: features.map((f: any) => ({
            projectId: project.id,
            icon: f.icon || null,
            title: f.title,
            description: f.description,
          })),
        });
      }
    } catch (e) {
      console.error("Failed to parse features:", e);
    }
  }

  const timelineJson = formData.get("timeline") as string;
  if (timelineJson) {
    try {
      const timeline = JSON.parse(timelineJson);
      if (timeline.length > 0) {
        await db.projectTimeline.createMany({
          data: timeline.map((t: any) => ({
            projectId: project.id,
            icon: t.icon || null,
            date: t.date,
            title: t.title,
          })),
        });
      }
    } catch (e) {
      console.error("Failed to parse timeline:", e);
    }
  }

  // === NOTIFICATION SYSTEM ===
  // Generate a notification for all followers
  if (project.isPublic) {
    const followers = await db.follow.findMany({
      where: { followingId: session.user.id },
      select: { followerId: true },
    });

    if (followers.length > 0) {
      const notifications = followers.map((f: { followerId: string }) => ({
        type: "NEW_PROJECT",
        title: `${session.user.name} launched a new project: ${project.name}`,
        link: `/public/project/${project.slug}`,
        userId: f.followerId,
        actorId: session.user.id,
      }));
      
      await db.notification.createMany({
        data: notifications
      });
    }
  }

  revalidatePath("/dashboard");
  redirect(`/project/${project.slug}`);
}

// READ — Get user's projects
export async function getUserProjects() {
  const session = await getSession();
  if (!session) return [];

  return db.project.findMany({
    where: { userId: session.user.id },
    include: { 
      techStack: true, 
      categories: true,
      _count: { select: { upvotes: true } },
      upvotes: true
    },
    orderBy: { updatedAt: "desc" },
  });
}

// READ — Get all public projects (for Explore page)
export async function getAllPublicProjects(params?: { query?: string, tech?: string }) {
  const where: any = {};
  
  if (params?.query) {
    where.OR = [
      { name: { contains: params.query } },
      { description: { contains: params.query } },
      { tagline: { contains: params.query } },
    ];
  }

  if (params?.tech) {
    where.techStack = {
      some: { techName: { contains: params.tech } }
    };
  }

  return db.project.findMany({
    where,
    include: {
      user: { select: { name: true, username: true, avatar: true, image: true } },
      techStack: true,
      categories: true,
      _count: { select: { upvotes: true } },
      upvotes: true
    },
    orderBy: { createdAt: "desc" },
  });
}

// READ — Get trending projects (for Trending page)
export async function getTrendingProjects() {
  const projects = await db.project.findMany({
    include: {
      user: { 
        select: { 
          name: true, 
          username: true, 
          avatar: true, 
          image: true,
          _count: { select: { followers: true } }
        } 
      },
      techStack: true,
      categories: true,
      _count: { select: { upvotes: true } },
      upvotes: true
    },
  });

  // Calculate trending score: (Upvotes * 3) + (Views * 1) + (Creator Followers * 2)
  return projects.sort((a: any, b: any) => {
    const scoreA = (a._count.upvotes * 3) + (a.views * 1) + ((a.user._count?.followers || 0) * 2);
    const scoreB = (b._count.upvotes * 3) + (b.views * 1) + ((b.user._count?.followers || 0) * 2);
    return scoreB - scoreA; // Descending
  });
}

// READ — Get project by slug (public)
export async function getProjectBySlug(slug: string) {
  return db.project.findUnique({
    where: { slug },
    include: {
      user: { select: { name: true, username: true, avatar: true, image: true } },
      techStack: true,
      categories: true,
      _count: { select: { upvotes: true } },
      upvotes: true
    },
  });
}

// UPDATE
export async function updateProject(projectId: string, formData: FormData) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  // Verify ownership
  const existing = await db.project.findFirst({
    where: { id: projectId, userId: session.user.id },
  });
  if (!existing) throw new Error("Not found");

  const techStackJson = formData.get("techStack") as string;
  const techStack = techStackJson ? JSON.parse(techStackJson) : [];
  const featuresJson = formData.get("features") as string;
  const features = featuresJson ? JSON.parse(featuresJson) : [];
  const timelineJson = formData.get("timeline") as string;
  const timeline = timelineJson ? JSON.parse(timelineJson) : [];

  await db.$transaction(async (tx: any) => {
    // 1. Update basic fields
    await tx.project.update({
      where: { id: projectId },
      data: {
        name: formData.get("name") as string,
        tagline: formData.get("tagline") as string || null,
        description: formData.get("description") as string || null,
        status: formData.get("status") as any,
        website: formData.get("website") as string || null,
        github: formData.get("github") as string || null,
        liveDemo: formData.get("liveDemo") as string || null,
        docs: formData.get("docs") as string || null,
        downloadUrl: formData.get("downloadUrl") as string || null,
        logo: formData.get("logo") as string || null,
        coverImage: formData.get("coverImage") as string || null,
      },
    });

    // 2. Delete existing relations
    await tx.projectTechStack.deleteMany({ where: { projectId } });
    await tx.projectFeature.deleteMany({ where: { projectId } });
    await tx.projectTimeline.deleteMany({ where: { projectId } });

    // 3. Recreate relations
    if (techStack.length > 0) {
      await tx.projectTechStack.createMany({
        data: techStack.map((techName: string) => ({
          projectId,
          techName
        }))
      });
    }
    
    if (features.length > 0) {
      await tx.projectFeature.createMany({
        data: features.map((f: any) => ({
          projectId,
          title: f.title,
          description: f.description,
          icon: f.icon || null
        }))
      });
    }

    if (timeline.length > 0) {
      await tx.projectTimeline.createMany({
        data: timeline.map((t: any) => ({
          projectId,
          title: t.title,
          date: t.date,
          icon: t.icon || null
        }))
      });
    }
  });

  revalidatePath(`/project/${existing.slug}`);
  revalidatePath("/dashboard");
  redirect(`/project/${existing.slug}`);
}

// DELETE
export async function deleteProject(projectId: string) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  const existing = await db.project.findFirst({
    where: { id: projectId, userId: session.user.id },
  });
  if (!existing) throw new Error("Not found");

  await db.project.delete({ where: { id: projectId } });

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

// READ — Get projects liked/upvoted by the user
export async function getLikedProjects() {
  const session = await getSession();
  if (!session) return [];

  const upvotes = await db.upvote.findMany({
    where: { userId: session.user.id },
    select: { projectId: true },
  });

  const projectIds = upvotes.map((u: any) => u.projectId);

  if (projectIds.length === 0) return [];

  return db.project.findMany({
    where: { id: { in: projectIds } },
    include: {
      user: { select: { name: true, username: true, avatar: true, image: true } },
      techStack: true,
      categories: true,
      _count: { select: { upvotes: true } },
      upvotes: true
    },
    orderBy: { createdAt: "desc" },
  });
}

// UPDATE — Increment project views
export async function incrementProjectViews(projectId: string) {
  try {
    await db.project.update({
      where: { id: projectId },
      data: {
        views: {
          increment: 1,
        },
      },
    });
  } catch (error) {
    console.error("Failed to increment views", error);
  }
}
