import { db } from "@/lib/db";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { FeedContent } from "./FeedContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Following Feed | BuildVine",
};

export default async function FeedPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  // Get all user IDs the current user is following
  const following = await db.follow.findMany({
    where: { followerId: session.user.id },
    select: { followingId: true },
  });

  const followingIds = following.map((f: { followingId: string }) => f.followingId);

  // Fetch recent projects from followed users
  const projects = await db.project.findMany({
    where: {
      userId: { in: followingIds },
      isPublic: true,
    },
    include: {
      user: { select: { name: true, username: true, avatar: true, image: true } },
      techStack: true,
      categories: true,
      _count: { select: { upvotes: true } },
      upvotes: true,
    },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  // Fetch recent timeline updates from followed users
  const timelineUpdates = await db.projectTimeline.findMany({
    where: {
      project: {
        userId: { in: followingIds },
        isPublic: true,
      }
    },
    include: {
      project: {
        include: {
          user: { select: { name: true, username: true, avatar: true, image: true } }
        }
      }
    },
    orderBy: { date: "desc" },
    take: 20,
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-text-primary tracking-tight font-heading">
          Your Feed
        </h1>
        <p className="mt-2 text-text-secondary">
          Stay up to date with the developers you follow.
        </p>
      </div>

      <FeedContent initialProjects={projects} initialUpdates={timelineUpdates} />
    </div>
  );
}
