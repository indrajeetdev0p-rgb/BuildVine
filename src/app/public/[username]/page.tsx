import { db } from "@/lib/db";
import { getSession } from "@/lib/session";
import { notFound } from "next/navigation";
import PortfolioContent from "./PortfolioContent";
import { Metadata } from "next";

export const revalidate = 60; // Cache for 60 seconds

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }): Promise<Metadata> {
  const { username } = await params;
  const user = await db.user.findUnique({
    where: { username },
  });

  if (!user) return { title: "Portfolio Not Found" };

  return {
    title: `${user.name} | BuildVine Portfolio`,
    description: user.bio || `Check out ${user.name}'s projects on BuildVine`,
  };
}

export default async function PublicPortfolioPage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const session = await getSession();
  
  const user = await db.user.findUnique({
    where: { username },
    include: {
      projects: {
        where: { isPublic: true },
        include: { techStack: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!user) {
    notFound();
  }

  let isFollowing = false;
  if (session) {
    const followRecord = await db.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: session.user.id,
          followingId: user.id
        }
      }
    });
    if (followRecord) isFollowing = true;
  }

  return <PortfolioContent user={user} isFollowing={isFollowing} />;
}
