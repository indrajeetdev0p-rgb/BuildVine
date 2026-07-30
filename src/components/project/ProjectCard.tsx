import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card, CardTitle, Badge } from "@/components/ui";
import { UpvoteButton } from "@/components/ui/UpvoteButton";

export function ProjectCard({ project, currentUserId }: { project: any, currentUserId?: string }) {
  return (
    <Link href={`/project/${project.slug}`} className="block h-full">
      <Card hover className="group h-full flex flex-col relative overflow-hidden">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-[var(--radius-md)] bg-bg-secondary flex items-center justify-center text-2xl overflow-hidden shrink-0 border border-border-default">
              {project.logo ? (
                <img
                  src={project.logo}
                  alt="logo"
                  className="w-full h-full object-cover"
                />
              ) : (
                "⚡"
              )}
            </div>
            <div>
              <CardTitle className="text-lg group-hover:text-accent transition-colors">
                {project.name}
              </CardTitle>
              {project.user && (
                <p className="text-xs text-text-tertiary">
                  by @{project.user.username || project.user.name}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge
              variant={
                project.status === "LIVE"
                  ? "success"
                  : project.status === "BETA"
                  ? "warning"
                  : "default"
              }
              size="sm"
              dot
            >
              {project.status.replace("_", " ")}
            </Badge>
          </div>
        </div>

        <div className="flex-1 mb-4">
          <p className="text-sm text-text-secondary line-clamp-2">
            {project.tagline || project.description || "No description provided."}
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border-default mt-auto">
          <div className="flex items-center gap-4">
            <UpvoteButton 
              projectId={project.id} 
              initialUpvotes={project._count?.upvotes || 0} 
              isInitiallyUpvoted={
                project.upvotes?.some((u: any) => u.userId === currentUserId) || false
              }
            />
          </div>
          <div className="flex items-center gap-1 text-xs font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 transform duration-300">
            <span>View Details</span>
            <ArrowUpRight size={14} />
          </div>
        </div>
      </Card>
    </Link>
  );
}
