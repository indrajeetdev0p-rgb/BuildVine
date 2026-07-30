import { getUserProjects } from "@/lib/actions/project";
import DashboardContent from "./DashboardContent";
import { getSession } from "@/lib/session";
import { db } from "@/lib/db";

export default async function DashboardPage() {
  const session = await getSession();
  const projects = await getUserProjects();
  
  let followerCount = 0;
  if (session?.user?.id) {
    followerCount = await db.follow.count({
      where: { followingId: session.user.id }
    });
  }

  return <DashboardContent initialProjects={projects} userName={session?.user?.name || "Builder"} followerCount={followerCount} />;
}
