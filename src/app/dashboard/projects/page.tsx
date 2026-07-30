import { getUserProjects } from "@/lib/actions/project";
import Link from "next/link";
import { Plus, Folder } from "lucide-react";
import { Button } from "@/components/ui";
import { ProjectCard } from "@/components/project/ProjectCard";
import { getSession } from "@/lib/session";

export default async function ProjectsPage() {
  const session = await getSession();
  const projects = await getUserProjects();

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-text-primary">
            All Projects
          </h1>
          <p className="text-text-secondary">
            Manage and view all your projects here.
          </p>
        </div>
        <Link href="/dashboard/projects/new">
          <Button leftIcon={<Plus size={18} />} variant="primary">
            New Project
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project: any) => (
          <ProjectCard key={project.id} project={project} currentUserId={session?.user.id} />
        ))}

        {projects.length === 0 && (
          <div className="col-span-full py-16 text-center border border-dashed border-border-default rounded-[var(--radius-lg)] bg-bg-secondary/50">
            <div className="w-16 h-16 bg-bg-tertiary rounded-full flex items-center justify-center mx-auto mb-4 text-text-tertiary">
              <Folder size={24} />
            </div>
            <h3 className="text-lg font-medium text-text-primary mb-2">
              No projects found
            </h3>
            <p className="text-text-secondary mb-6 max-w-sm mx-auto">
              You haven't created any projects yet. Get started by creating your first project!
            </p>
            <Link href="/dashboard/projects/new">
              <Button leftIcon={<Plus size={18} />}>Create Project</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
