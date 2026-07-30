import { getTrendingProjects } from "@/lib/actions/project";
import { getSession } from "@/lib/session";
import { ProjectCard } from "@/components/project/ProjectCard";
import { Flame } from "lucide-react";

export const metadata = {
  title: "Trending Projects | BuildVine",
  description: "See what's hot right now in the developer community.",
};

export default async function TrendingPage() {
  const session = await getSession();
  const projects = await getTrendingProjects();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-border-default">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-text-primary font-heading flex items-center gap-3">
            <Flame className="text-red-500" size={28} />
            Trending Now
          </h1>
          <p className="text-text-secondary mt-2">
            Projects ranked by a combination of upvotes, views, and creator following.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {projects.map((project: any) => (
          <ProjectCard key={project.id} project={project} currentUserId={session?.user.id} />
        ))}

        {projects.length === 0 && (
          <div className="col-span-full py-20 text-center border border-dashed border-border-default rounded-3xl bg-bg-secondary/50">
            <h3 className="text-xl font-medium text-text-primary mb-2">
              No projects found
            </h3>
            <p className="text-text-secondary max-w-sm mx-auto">
              It looks like there are no public projects yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
