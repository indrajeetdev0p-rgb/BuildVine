import { getLikedProjects } from "@/lib/actions/project";
import Link from "next/link";
import { Telescope, Heart } from "lucide-react";
import { Button } from "@/components/ui";
import { ProjectCard } from "@/components/project/ProjectCard";
import { getSession } from "@/lib/session";

export const metadata = {
  title: "Liked Projects | Dashboard",
};

export default async function LikedProjectsPage() {
  const session = await getSession();
  const projects = await getLikedProjects();

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-text-primary flex items-center gap-2">
            <Heart className="text-accent fill-accent" size={28} />
            Liked Projects
          </h1>
          <p className="text-text-secondary">
            All the projects you have upvoted across the community.
          </p>
        </div>
        <Link href="/explore">
          <Button leftIcon={<Telescope size={18} />} variant="secondary">
            Explore More
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
              <Heart size={24} />
            </div>
            <h3 className="text-lg font-medium text-text-primary mb-2">
              No liked projects yet
            </h3>
            <p className="text-text-secondary mb-6 max-w-sm mx-auto">
              You haven't upvoted any projects. Head over to the Explore page to find inspiration!
            </p>
            <Link href="/explore">
              <Button leftIcon={<Telescope size={18} />}>Explore Projects</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
