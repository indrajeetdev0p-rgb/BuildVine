"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import {
  Globe,
  ExternalLink,
  Calendar,
  ArrowLeft,
  Edit2,
  Trash2,
  Share2,
  CheckCircle2
} from "lucide-react";
import { Card, Button } from "@/components/ui";
import { GithubIcon } from "@/components/icons";
import { format } from "date-fns";
import { UpvoteButton } from "@/components/ui/UpvoteButton";
import { ProjectComments } from "@/components/project/ProjectComments";
import { useSession } from "@/lib/auth-client";
import { deleteProject } from "@/lib/actions/project";
import { useRouter } from "next/navigation";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  }),
};

const stagger: Variants = {
  visible: { transition: { staggerChildren: 0.08 } },
};

import { useState } from "react";

export default function PublicProjectContent({ project }: { project: any }) {
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
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg-primary font-sans relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-10 blur-[120px]"
          style={{ background: "var(--accent-gradient)" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,var(--bg-primary)_80%)]" />
      </div>

      <main className="flex-1 relative z-10 py-12 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          
          <Link href={`/public/${project.user.username}`} className="inline-flex items-center gap-2 text-sm text-text-tertiary hover:text-text-primary transition-colors mb-8">
            <ArrowLeft size={16} /> Back to Portfolio
          </Link>

          {project.coverImage && (
            <div className="w-full h-48 sm:h-64 md:h-80 rounded-3xl overflow-hidden mb-8 border border-border-default bg-bg-tertiary shadow-xl">
              <img src={project.coverImage} alt={`${project.name} Cover`} className="w-full h-full object-cover" />
            </div>
          )}

          <motion.div initial="hidden" animate="visible" className="space-y-12" variants={stagger}>
            
            {/* Header Section */}
            <motion.div variants={fadeUp} custom={0}>
              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center mb-12 border-b border-border-default/50 pb-8 relative">
                  {isOwner && (
                    <div className="absolute top-0 right-0 flex gap-2">
                      <Link href={`/dashboard/projects/${project.id}/edit`}>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Edit2 size={14} /> Edit Project
                        </Button>
                      </Link>
                      <Button variant="outline" size="sm" onClick={handleDelete} className="gap-2 text-danger hover:bg-danger/10 hover:border-danger hover:text-danger">
                        <Trash2 size={14} /> Delete
                      </Button>
                    </div>
                  )}
                  <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-2xl bg-bg-tertiary flex items-center justify-center shrink-0 border border-border-default overflow-hidden">
                    {project.logo ? (
                      <img src={project.logo} alt={project.name} className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-3xl sm:text-4xl font-bold uppercase text-text-secondary">{project.name.substring(0, 2)}</span>
                    )}
                  </div>
                  <div className="flex-1 w-full pt-8 sm:pt-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary font-heading tracking-tight">
                        {project.name}
                      </h1>
                      <span className="px-3 py-1 rounded-full bg-bg-tertiary border border-border-default text-xs font-bold uppercase tracking-wider text-text-secondary mt-2">
                        {project.status.replace("_", " ")}
                      </span>
                    </div>
                    
                    {project.tagline && (
                      <p className="text-xl text-accent font-medium mb-4">{project.tagline}</p>
                    )}
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-text-tertiary mt-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={16} />
                        Built by <span className="font-semibold text-text-primary">{project.user.name}</span>
                      </div>
                      
                      {project.websiteUrl && (
                        <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-text-primary transition-colors">
                          <ExternalLink size={16} />
                          {new URL(project.websiteUrl).hostname.replace("www.", "")}
                        </a>
                      )}
                      
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-text-primary transition-colors">
                          <GithubIcon size={16} />
                          Repository
                        </a>
                      )}

                      <div className="ml-auto flex items-center gap-3">
                        <Button 
                          variant="secondary" 
                          size="sm" 
                          onClick={handleShare}
                          leftIcon={copied ? <CheckCircle2 size={16} className="text-green-500" /> : <Share2 size={16} />}
                        >
                          {copied ? "Copied!" : "Share"}
                        </Button>
                        <UpvoteButton
                          projectId={project.id}
                          initialUpvotes={project._count?.upvotes || 0}
                          isInitiallyUpvoted={
                            session?.user?.id 
                              ? project.upvotes?.some((uv: any) => uv.userId === session.user.id) 
                              : false
                          }
                        />
                      </div>
                    </div>
                  </div>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Left Column: Details */}
              <motion.div variants={fadeUp} custom={1} className="md:col-span-2 space-y-12">
                
                {/* Description */}
                <section>
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-text-tertiary mb-6">About the Project</h2>
                  <div className="prose prose-invert prose-lg max-w-none text-text-secondary leading-relaxed whitespace-pre-wrap">
                    {project.description || "No description provided."}
                  </div>
                </section>
                
                {/* Timeline / Updates */}
                {project.timeline && project.timeline.length > 0 && (
                  <section>
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-text-tertiary mb-6">Project Timeline</h2>
                    <div className="space-y-6 border-l-2 border-border-default ml-3 pl-6">
                      {project.timeline.map((update: any) => (
                        <div key={update.id} className="relative">
                          <div className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-accent border-2 border-bg-primary" />
                          <div className="text-xs text-text-tertiary font-semibold uppercase tracking-wider mb-2">
                            {format(new Date(update.date), "MMMM d, yyyy")}
                          </div>
                          <Card className="p-5 bg-bg-secondary/50 border-border-default">
                            {update.title && <h3 className="text-lg font-bold text-text-primary mb-2">{update.title}</h3>}
                            <p className="text-text-secondary whitespace-pre-wrap">{update.content}</p>
                          </Card>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Comments Section */}
                <ProjectComments 
                  projectId={project.id} 
                  comments={project.comments || []} 
                  projectOwnerId={project.userId} 
                />
                
              </motion.div>

              {/* Right Column: Meta */}
              <motion.div variants={fadeUp} custom={2} className="space-y-8">
                
                {/* Tech Stack */}
                <section>
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-text-tertiary mb-4">Tech Stack</h2>
                  {project.techStack && project.techStack.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech: any) => (
                        <span key={tech.id} className="px-3 py-1.5 rounded-md text-sm font-medium bg-bg-secondary border border-border-default text-text-secondary">
                          {tech.techName}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-text-tertiary text-sm">No tech stack provided.</p>
                  )}
                </section>
                
              </motion.div>
            </div>

          </motion.div>
        </div>
      </main>

      {/* Footer Branding CTA */}
      <footer className="mt-auto py-8 text-center relative z-10 border-t border-border-default/50 bg-bg-primary/80 backdrop-blur-md">
        <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bg-secondary border border-border-default hover:border-accent transition-colors group shadow-lg">
          <div className="flex h-5 w-5 items-center justify-center rounded text-[10px] font-bold text-white" style={{ backgroundImage: "var(--accent-gradient)" }}>
            B
          </div>
          <span className="text-sm font-medium text-text-secondary group-hover:text-text-primary">
            Build your portfolio on BuildVine
          </span>
        </Link>
      </footer>
    </div>
  );
}
