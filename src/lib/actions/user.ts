"use server";

import { db } from "@/lib/db";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";

export async function updateProfile(formData: FormData) {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const name = formData.get("name") as string;
  const username = formData.get("username") as string;
  const bio = formData.get("bio") as string;
  const website = formData.get("website") as string;
  const github = formData.get("github") as string;
  const twitter = formData.get("twitter") as string;
  let avatar = formData.get("avatar") as string;
  const avatarFile = formData.get("avatarFile") as File | null;

  if (avatarFile && avatarFile.size > 0) {
    if (avatarFile.size > 2 * 1024 * 1024) {
      throw new Error("Avatar file is too large. Max size is 2MB.");
    }
    const buffer = Buffer.from(await avatarFile.arrayBuffer());
    const base64 = buffer.toString("base64");
    avatar = `data:${avatarFile.type};base64,${base64}`;
  }

  if (!name || !username) {
    throw new Error("Name and Username are required.");
  }

  // Check if username is taken by someone else
  const existingUser = await db.user.findUnique({
    where: { username },
  });

  if (existingUser && existingUser.id !== session.user.id) {
    throw new Error("Username is already taken.");
  }

  await db.user.update({
    where: { id: session.user.id },
    data: {
      name,
      username,
      bio: bio || null,
      website: website || null,
      github: github || null,
      twitter: twitter || null,
      avatar: avatar || null,
    },
  });

  revalidatePath("/dashboard/settings");
  revalidatePath(`/${username}`);
  return { success: true };
}

// READ — Get developers (for Developers page, with search and pagination)
export async function getDevelopers(searchQuery: string = "", page: number = 1) {
  const limit = 12;
  const skip = (page - 1) * limit;

  // Filter conditions
  const whereCondition: any = {};

  if (searchQuery.trim() !== "") {
    // If searching, find ANY user matching the query (ignore project count)
    whereCondition.OR = [
      { name: { contains: searchQuery } },
      { username: { contains: searchQuery } }
    ];
  } else {
    // If not searching, only list users with at least 1 public project
    whereCondition.projects = {
      some: {
        isPublic: true,
      }
    };
  }

  const users = await db.user.findMany({
    where: whereCondition,
    include: {
      _count: {
        select: { followers: true, projects: true }
      }
    },
    orderBy: {
      followers: {
        _count: 'desc'
      }
    },
    skip,
    take: limit + 1, // Fetch one extra to check if there is a next page
  });

  const hasNextPage = users.length > limit;
  if (hasNextPage) {
    users.pop(); // Remove the extra item
  }

  return {
    users,
    hasNextPage,
  };
}
