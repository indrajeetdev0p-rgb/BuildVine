"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import {
  FolderKanban,
  Eye,
  Users,
  TrendingUp,
  Plus,
  ArrowUpRight,
} from "lucide-react";
import { Button, Card, CardTitle, Badge } from "@/components/ui";
import { ProjectAnalyticsChart } from "@/components/dashboard/ProjectAnalyticsChart";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  }),
};

// Stats are now computed dynamically inside the component



const STATUS_MAP: Record<string, { label: string; variant: "success" | "warning" | "accent" | "default" }> = {
  LIVE: { label: "Live", variant: "success" },
  BETA: { label: "Beta", variant: "warning" },
  IN_PROGRESS: { label: "In Progress", variant: "accent" },
  IDEA: { label: "Idea", variant: "default" },
  ARCHIVED: { label: "Archived", variant: "default" },
};

export default function DashboardContent({ 
  initialProjects, 
  userName,
  followerCount = 0
}: { 
  initialProjects: any[];
  userName: string;
  followerCount?: number;
}) {
  const currentMonthProjects = initialProjects.filter(
    (p) => new Date(p.createdAt).getMonth() === new Date().getMonth()
  ).length;

  const totalViews = initialProjects.reduce((acc, project) => acc + (project.views || 0), 0);

  const totalUpvotes = initialProjects.reduce((acc, project) => acc + (project._count?.upvotes || 0), 0);
  const trendingScore = (totalUpvotes * 3) + (totalViews * 1) + (followerCount * 2);

  const dynamicStats = [
    { label: "Total Projects", value: initialProjects.length.toString(), icon: FolderKanban, change: `+${currentMonthProjects} this month` },
    { label: "Total Views", value: totalViews.toString(), icon: Eye, change: "Updated in real-time" },
    { label: "Followers", value: followerCount.toString(), icon: Users, change: "Growing network" },
    { label: "Trending Score", value: trendingScore > 0 ? trendingScore.toString() : "N/A", icon: TrendingUp, change: "Based on views & likes" },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="max-w-6xl mx-auto space-y-8"
    >
      {/* Header */}
      <motion.div
        variants={fadeUp}
        custom={0}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight">
            Welcome back, <span className="gradient-text">{userName}</span>
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Here&apos;s what&apos;s happening with your projects.
          </p>
        </div>
        <Link href="/dashboard/projects/new">
          <Button variant="gradient" size="md" leftIcon={<Plus size={16} />}>
            New Project
          </Button>
        </Link>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {dynamicStats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div key={stat.label} variants={fadeUp} custom={i + 1}>
              <Card padding="md">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium text-text-tertiary uppercase tracking-wider">
                      {stat.label}
                    </p>
                    <p className="mt-2 font-heading text-3xl font-bold tracking-tight">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs text-text-tertiary">{stat.change}</p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-accent-muted">
                    <Icon size={20} className="text-accent" />
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Projects */}
      <motion.div variants={fadeUp} custom={5}>
        <Card padding="none">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border-default">
            <CardTitle className="text-base">Your Projects</CardTitle>
            <Link href="/dashboard/projects">
              <Button variant="ghost" size="sm" rightIcon={<ArrowUpRight size={14} />}>
                View All
              </Button>
            </Link>
          </div>

          <div className="divide-y divide-border-default">
            {initialProjects.map((project, i) => (
            <motion.div
              key={project.id}
              custom={i + 2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              <Card hover className="group">
                <Link href={`/project/${project.slug}`} className="block p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-[var(--radius-md)] bg-bg-secondary flex items-center justify-center text-xl overflow-hidden">
                        {project.logo ? (
                            <img src={project.logo} alt="logo" className="w-full h-full object-cover" />
                        ) : (
                            "⚡"
                        )}
                      </div>
                      <div>
                        <CardTitle className="text-base group-hover:text-accent transition-colors">
                          {project.name}
                        </CardTitle>
                        <p className="text-xs text-text-tertiary mt-0.5 flex items-center gap-2">
                          <span>{project.views || 0} views</span>
                          <span>•</span>
                          <span>{new Date(project.updatedAt).toLocaleDateString("en-US")}</span>
                        </p>
                      </div>
                    </div>
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
                </Link>
              </Card>
            </motion.div>
          ))}
          {initialProjects.length === 0 && (
            <div className="col-span-full py-12 text-center text-text-tertiary border border-dashed border-border-default rounded-[var(--radius-lg)]">
              <p>No projects yet. Create your first project to get started!</p>
            </div>
          )}
          </div>
        </Card>
      </motion.div>

      {/* Analytics Chart */}
      <motion.div variants={fadeUp} custom={6} className="mt-8">
        <ProjectAnalyticsChart projects={initialProjects} />
      </motion.div>
    </motion.div>
  );
}
