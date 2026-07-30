import { db } from "@/lib/db";
import { getSession } from "@/lib/session";
import { notFound, redirect } from "next/navigation";
import { ProjectForm } from "@/components/forms/ProjectForm";

export const metadata = {
  title: "Edit Project | BuildVine",
};

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  
  if (!session) {
    redirect("/login");
  }

  const { id } = await params;

  const project = await db.project.findUnique({
    where: { id },
    include: {
      techStack: true,
      features: true,
      timeline: true
    }
  });

  if (!project) {
    notFound();
  }

  if (project.userId !== session.user.id) {
    redirect("/dashboard");
  }

  return <ProjectForm initialData={project} />;
}
