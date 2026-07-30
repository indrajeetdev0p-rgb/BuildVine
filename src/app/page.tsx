import { db } from "@/lib/db";
import LandingContent from "./LandingContent";

// Prevent this page from being entirely static at build time
// so that newly published projects show up without a full redeploy
export const revalidate = 60; // revalidate every 60 seconds

export default async function Page() {
  // Fetch public projects from the database
  const publicProjects = await db.project.findMany({
    where: {
      isPublic: true,
      status: {
        in: ["LIVE", "BETA", "IN_PROGRESS"], // Don't show IDEA or ARCHIVED on main feed by default
      }
    },
    include: {
      user: {
        select: {
          username: true,
          name: true,
          avatar: true,
        },
      },
      techStack: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 12, // limit to 12 on the homepage
  });

  return <LandingContent publicProjects={publicProjects} />;
}
