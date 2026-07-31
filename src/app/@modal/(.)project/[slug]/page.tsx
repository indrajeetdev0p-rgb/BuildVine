import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import ProjectContent from "@/app/project/[slug]/ProjectContent";
import { ModalWrapper } from "@/components/ui/ModalWrapper";
import { getSession } from "@/lib/session";

export default async function ProjectModalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const session = await getSession();

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
    console.error("MODAL PAGE ERROR:", error);
    notFound();
  }

  if (!project) notFound();

  return (
    <ModalWrapper>
      <ProjectContent project={project} isModal={true} />
    </ModalWrapper>
  );
}
