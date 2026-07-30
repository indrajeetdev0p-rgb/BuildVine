"use server";

import { db } from "@/lib/db";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { sendEmailNotification } from "@/lib/email";

// ----------------------------------------------------------------
// UPVOTES
// ----------------------------------------------------------------
export async function toggleUpvote(projectId: string, currentPath: string = "/explore") {
  try {
    const session = await getSession();
    if (!session) throw new Error("Unauthorized");

    const existing = await db.upvote.findUnique({
      where: {
        userId_projectId: {
          userId: session.user.id,
          projectId
        }
      }
    });

    if (existing) {
      await db.upvote.delete({
        where: { id: existing.id }
      });
    } else {
      await db.upvote.create({
        data: {
          userId: session.user.id,
          projectId
        }
      });

      // Also notify the project owner
      const project = await db.project.findUnique({ where: { id: projectId }, select: { userId: true, name: true, slug: true } });
      if (project && project.userId !== session.user.id) {
        await db.notification.create({
          data: {
            type: "NEW_UPVOTE",
            title: `${session.user.name || "Someone"} upvoted your project!`,
            content: `${session.user.name || "Someone"} upvoted ${project.name}`,
            link: `/project/${project.slug}`,
            userId: project.userId,
            actorId: session.user.id
          }
        });
      }
    }

    revalidatePath(currentPath);
    revalidatePath(`/project/${projectId}`);
    return { success: true };
  } catch (error: any) {
    console.error("Error toggling upvote:", error);
    return { error: error.message || "Failed to upvote project" };
  }
}

// ----------------------------------------------------------------
// FOLLOWS
// ----------------------------------------------------------------
export async function toggleFollow(followingId: string, currentPath: string = "/dashboard") {
  try {
    const session = await getSession();
    if (!session) throw new Error("Unauthorized");

    if (session.user.id === followingId) {
      throw new Error("You cannot follow yourself");
    }

    const existing = await db.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: session.user.id,
          followingId
        }
      }
    });

    if (existing) {
      await db.follow.delete({
        where: { id: existing.id }
      });
    } else {
      await db.follow.create({
        data: {
          followerId: session.user.id,
          followingId
        }
      });

      await db.notification.create({
        data: {
          type: "NEW_FOLLOWER",
          title: `${session.user.name || "Someone"} started following you!`,
          content: `${session.user.name || "Someone"} started following you`,
          link: `/portfolio/${(session.user as any).username || session.user.id}`,
          userId: followingId,
          actorId: session.user.id
        }
      });
    }

    revalidatePath(currentPath);
    revalidatePath("/dashboard/feed");
    return { success: true };
  } catch (error: any) {
    console.error("Error toggling follow:", error);
    return { error: error.message || "Failed to follow user" };
  }
}

// ----------------------------------------------------------------
// COMMENTS
// ----------------------------------------------------------------
export async function postComment(projectId: string, content: string, currentPath: string) {
  try {
    const session = await getSession();
    if (!session) throw new Error("Unauthorized");
    if (!content || content.trim() === "") throw new Error("Comment cannot be empty");

    const comment = await db.comment.create({
      data: {
        content: content.trim(),
        userId: session.user.id,
        projectId
      }
    });

    // Notify project owner
    const project = await db.project.findUnique({ where: { id: projectId }, select: { userId: true, name: true, slug: true } });
    if (project && project.userId !== session.user.id) {
      await db.notification.create({
        data: {
          type: "NEW_COMMENT",
          title: `New comment on ${project.name}`,
          content: `${session.user.name || "Someone"} commented on your project`,
          link: `/project/${project.slug}`,
          userId: project.userId,
          actorId: session.user.id
        }
      });
      
      const ownerUser = await db.user.findUnique({ where: { id: project.userId }, select: { email: true } });
      if (ownerUser?.email) {
        await sendEmailNotification(
          ownerUser.email,
          `New comment on ${project.name}`,
          `<p><b>${session.user.name || "Someone"}</b> commented on your project <b>${project.name}</b>.</p><p>"${content}"</p><p><a href="https://buildvine.tech/project/${project.slug}">View Project</a></p>`
        );
      }
    }

    revalidatePath(currentPath);
    return { success: true, comment };
  } catch (error: any) {
    console.error("Error posting comment:", error);
    return { error: error.message || "Failed to post comment" };
  }
}

export async function deleteComment(commentId: string, currentPath: string) {
  try {
    const session = await getSession();
    if (!session) throw new Error("Unauthorized");

    const comment = await db.comment.findUnique({
      where: { id: commentId }
    });

    if (!comment) throw new Error("Not found");
    if (comment.userId !== session.user.id) throw new Error("Unauthorized");

    await db.comment.delete({
      where: { id: commentId }
    });

    revalidatePath(currentPath);
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting comment:", error);
    return { error: error.message || "Failed to delete comment" };
  }
}
