import { db } from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import UserContent from "./UserContent";
import { Metadata } from "next";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }): Promise<Metadata> {
  const { username } = await params;
  const user = await db.user.findUnique({
    where: { username },
  });

  if (!user) return { title: "User Not Found" };

  return {
    title: `${user.name} (@${user.username}) | BuildVine`,
    description: user.bio || `Check out ${user.name}'s portfolio on BuildVine`,
  };
}

export default async function Page({ params }: { params: Promise<{ username: string }> }) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const { username } = await params;
  const user = await db.user.findUnique({
    where: { username },
    include: {
      _count: {
        select: { followers: true, following: true }
      },
      followers: { include: { follower: { select: { name: true, username: true, avatar: true, image: true } } } },
      following: { include: { following: { select: { name: true, username: true, avatar: true, image: true } } } },
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

  return <UserContent user={user} />;
}
