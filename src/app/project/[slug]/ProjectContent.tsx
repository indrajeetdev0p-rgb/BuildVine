"use client";

import { ProjectComments } from "@/components/project/ProjectComments";
import ReactMarkdown from "react-markdown";
import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import {
  Globe,
  FolderGit,
  ExternalLink,
  FileText,
  Download,
  Calendar,
  Eye,
  Users,
  Share2,
  Edit2,
  Trash2
} from "lucide-react";
import { Button, Badge, Card, CardTitle, CardDescription } from "@/components/ui";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useSession } from "@/lib/auth-client";
import { deleteProject } from "@/lib/actions/project";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  }),
};

/* ----------------------------------------------------------------
   MOCK DATA — will be replaced with real data from Prisma
   ---------------------------------------------------------------- */
export default function ProjectContent({ project, isModal = false }: { project: any, isModal?: boolean }) {
  const [copied, setCopied] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const isOwner = session?.user?.id === project.userId;

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this project? This action cannot be undone.")) {
      await deleteProject(project.id);
      router.push("/dashboard");
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/public/project/${project.slug}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const statusStr = (project.status || "IDEA").replace("_", " ");
  const statusVar = project.status === "LIVE" ? "success" : project.status === "BETA" ? "warning" : project.status === "IN_PROGRESS" ? "accent" : "default";

  return (
    <div className={`flex flex-col ${isModal ? 'min-h-full' : 'min-h-screen'}`}>
      {!isModal && <Navbar />}

      <main className="flex-1">
        {/* Cover Image */}
        <div
          className="h-48 sm:h-64 relative bg-bg-secondary"
        >
          {project.coverImage && (
            <img src={project.coverImage} alt="Cover" className="h-full w-full object-cover opacity-60" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent" />
        </div>

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
          <motion.div initial="hidden" animate="visible" className="space-y-8">
            {/* Project Header */}
            <motion.div variants={fadeUp} custom={0}>
              <div className="flex flex-col sm:flex-row sm:items-end gap-4">
                {/* Logo */}
                <div className="flex h-20 w-20 items-center justify-center rounded-[var(--radius-xl)] border-4 border-bg-primary bg-bg-elevated text-3xl shadow-lg overflow-hidden">
                  {project.logo ? (
                    <img src={project.logo} alt="Logo" className="h-full w-full object-cover" />
                  ) : "⚡"}
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h1 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight">
                      {project.name}
                    </h1>
                    <Badge
                      variant={statusVar as any}
                      size="md"
                      dot
                      pulseDot={project.status === "LIVE"}
                    >
                      {statusStr}
                    </Badge>
                  </div>
                  <p className="mt-1 text-lg text-text-secondary">
                    {project.tagline}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 sm:self-center">
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    leftIcon={copied ? <CheckCircle2 size={14} className="text-green-500" /> : <Share2 size={14} />} 
                    onClick={handleShare}
                  >
                    {copied ? "Copied!" : "Share"}
                  </Button>
                  
                  {isOwner && (
                    <>
                      <Link href={`/dashboard/projects/${project.id}/edit`}>
                        <Button variant="outline" size="sm" leftIcon={<Edit2 size={16} />}>
                          Edit Project
                        </Button>
                      </Link>
                      <Button variant="outline" size="sm" onClick={handleDelete} className="text-danger hover:text-danger hover:border-danger hover:bg-danger/10">
                        <Trash2 size={16} />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Two Column Layout */}
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Description */}
                <motion.div variants={fadeUp} custom={1}>
                  <Card padding="lg">
                    <CardTitle className="mb-4">About</CardTitle>
                    <div className="prose prose-sm prose-invert max-w-none text-text-secondary leading-relaxed">
                      {project.description ? (
                        <ReactMarkdown>{project.description}</ReactMarkdown>
                      ) : (
                        <p>No description provided.</p>
                      )}
                    </div>
                  </Card>
                </motion.div>

                {/* Features */}
                {project.features && project.features.length > 0 && (
                  <motion.div variants={fadeUp} custom={2}>
                    <Card padding="lg">
                      <CardTitle className="mb-4">Features</CardTitle>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {project.features.map((feature: any) => (
                          <div
                            key={feature.id}
                            className="flex items-start gap-3 rounded-[var(--radius-md)] border border-border-default p-4 hover:bg-bg-hover transition-colors"
                          >
                            {feature.icon && <span className="text-xl">{feature.icon}</span>}
                            <div>
                              <p className="font-heading text-sm font-semibold">{feature.title}</p>
                              <p className="text-xs text-text-tertiary mt-0.5">{feature.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </motion.div>
                )}

                {/* Timeline */}
                {project.timeline && project.timeline.length > 0 && (
                  <motion.div variants={fadeUp} custom={3}>
                    <Card padding="lg">
                      <CardTitle className="mb-6">Timeline</CardTitle>
                      <div className="space-y-6">
                        {project.timeline.map((event: any, i: number) => (
                          <div key={event.id} className="flex gap-4 relative">
                            <div className="flex flex-col items-center">
                              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-muted border-2 border-accent text-sm z-10">
                                {event.icon || "•"}
                              </div>
                              {i < project.timeline.length - 1 && (
                                <div className="w-0.5 flex-1 bg-border-default mt-1" />
                              )}
                            </div>
                            <div className="pb-6">
                              <p className="font-heading text-sm font-semibold">{event.title}</p>
                              <p className="text-xs text-text-tertiary font-mono mt-0.5">{event.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </motion.div>
                )}
                {/* Comments Section */}
                <motion.div variants={fadeUp} custom={4}>
                  <ProjectComments 
                    projectId={project.id} 
                    comments={project.comments || []} 
                    projectOwnerId={project.userId} 
                  />
                </motion.div>

              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Links */}
                <motion.div variants={fadeUp} custom={1}>
                  <Card padding="md">
                    <CardTitle className="text-sm mb-4">Links</CardTitle>
                    <div className="flex flex-col gap-2">
                      {[
                        { icon: Globe, label: "Website", url: project.website },
                        { icon: FolderGit, label: "GitHub", url: project.github },
                        { icon: ExternalLink, label: "Live Demo", url: project.liveDemo },
                        { icon: FileText, label: "Documentation", url: project.docs },
                        { icon: Download, label: "Download", url: project.downloadUrl },
                      ]
                        .filter((link) => link.url)
                        .map((link) => {
                          const Icon = link.icon;
                          const formattedUrl = (link.url as string).startsWith("http") 
                            ? link.url as string 
                            : `https://${link.url}`;
                          
                          return (
                            <a
                              key={link.label}
                              href={formattedUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-3 rounded-[var(--radius-sm)] px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-hover transition-colors"
                            >
                              <Icon size={16} className="text-text-tertiary" />
                              {link.label}
                              <ExternalLink size={12} className="ml-auto text-text-tertiary" />
                            </a>
                          );
                        })}
                      {![project.website, project.github, project.liveDemo, project.docs, project.downloadUrl].some(Boolean) && (
                        <p className="text-xs text-text-tertiary px-3">No links provided</p>
                      )}
                    </div>
                  </Card>
                </motion.div>

                {/* Tech Stack */}
                {project.techStack && project.techStack.length > 0 && (
                  <motion.div variants={fadeUp} custom={2}>
                    <Card padding="md">
                      <CardTitle className="text-sm mb-4">Tech Stack</CardTitle>
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.map((tech: any) => (
                          <Badge key={tech.id} variant="accent" size="sm">
                            {tech.techName}
                          </Badge>
                        ))}
                      </div>
                    </Card>
                  </motion.div>
                )}

                {/* Categories */}
                {project.categories && project.categories.length > 0 && (
                  <motion.div variants={fadeUp} custom={3}>
                    <Card padding="md">
                      <CardTitle className="text-sm mb-4">Categories</CardTitle>
                      <div className="flex flex-wrap gap-1.5">
                        {project.categories.map((cat: any) => (
                          <Badge key={cat.id} variant="default" size="sm">
                            {cat.category}
                          </Badge>
                        ))}
                      </div>
                    </Card>
                  </motion.div>
                )}

                {/* Stats */}
                <motion.div variants={fadeUp} custom={4}>
                  <Card padding="md">
                    <CardTitle className="text-sm mb-4">Stats</CardTitle>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="font-heading text-2xl font-bold">
                          {project.views || 0}
                        </p>
                        <p className="text-xs text-text-tertiary flex items-center gap-1">
                          <Eye size={12} /> Views
                        </p>
                      </div>
                      <div>
                        <p className="font-heading text-2xl font-bold">
                          {0}
                        </p>
                        <p className="text-xs text-text-tertiary flex items-center gap-1">
                          <Users size={12} /> Followers
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>

                {/* Creator */}
                <motion.div variants={fadeUp} custom={5}>
                  <Card padding="md" hover>
                    <Link
                      href={`/${project.user.username}`}
                      className="flex items-center gap-3"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-bg-elevated border border-border-default overflow-hidden text-sm font-bold shrink-0">
                        <img 
                          src={project.user.avatar || project.user.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${project.user.username}`} 
                          alt={project.user.name} 
                          className="h-full w-full object-cover" 
                        />
                      </div>
                      <div>
                        <p className="font-heading text-sm font-semibold">
                          {project.user.name}
                        </p>
                        <p className="text-xs text-text-tertiary">
                          @{project.user.username}
                        </p>
                      </div>
                    </Link>
                  </Card>
                </motion.div>

                {/* Created Date */}
                <div className="flex items-center gap-2 text-xs text-text-tertiary px-1">
                  <Calendar size={12} />
                  <span>Started {new Date(project.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Spacing before footer */}
        <div className="h-20" />
      </main>

      {!isModal && <Footer />}
    </div>
  );
}
