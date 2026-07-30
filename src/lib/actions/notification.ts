"use server";

import { db } from "@/lib/db";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";

export async function getUnreadNotifications() {
  const session = await getSession();
  if (!session) return [];

  return db.notification.findMany({
    where: { 
      userId: session.user.id,
      isRead: false
    },
    orderBy: { createdAt: "desc" },
    take: 20
  });
}

export async function getAllNotifications() {
  const session = await getSession();
  if (!session) return [];

  return db.notification.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 50,
    include: {
      user: { select: { name: true, avatar: true, image: true, username: true } }
    }
  });
}

export async function markAsRead(notificationId: string) {
  const session = await getSession();
  if (!session) return;

  await db.notification.update({
    where: { id: notificationId, userId: session.user.id },
    data: { isRead: true }
  });

  revalidatePath("/dashboard");
}

export async function markAllAsRead() {
  const session = await getSession();
  if (!session) return;

  await db.notification.updateMany({
    where: { userId: session.user.id, isRead: false },
    data: { isRead: true }
  });

  revalidatePath("/dashboard");
}

export async function clearAllNotifications() {
  const session = await getSession();
  if (!session) return;

  await db.notification.deleteMany({
    where: { userId: session.user.id }
  });

  revalidatePath("/dashboard");
}
