"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import {
  MapPin,
  ExternalLink,
} from "lucide-react";
import { Card } from "@/components/ui";
import { GithubIcon, TwitterIcon } from "@/components/icons";
import { FollowButton } from "@/components/ui/FollowButton";
import { useSession } from "@/lib/auth-client";

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

export default function PortfolioContent({ user, isFollowing }: { user: any, isFollowing: boolean }) {
  const { data: session } = useSession();
  const avatarUrl = user.avatar || user.image || `https://api.dicebear.com/9.x/notionists/svg?seed=${user.username || user.name}`;

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

      <main className="flex-1 relative z-10 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible" className="space-y-12 text-center" variants={stagger}>
            
            {/* Header Profile Section */}
            <motion.div variants={fadeUp} custom={0} className="flex flex-col items-center">
              <div className="h-32 w-32 shrink-0 overflow-hidden rounded-full border-4 border-bg-elevated bg-bg-secondary shadow-2xl mb-6">
                <img src={avatarUrl} alt={user.name} referrerPolicy="no-referrer" className="h-full w-full object-cover" />
              </div>
              <h1 className="text-4xl font-extrabold text-text-primary font-heading tracking-tight mb-2">
                {user.name}
              </h1>
              <p className="text-lg text-accent font-medium mb-4">@{user.username}</p>
              
              {user.bio && (
                <p className="text-text-secondary max-w-lg leading-relaxed mb-6">
                  {user.bio}
                </p>
              )}

              {session?.user?.id !== user.id && (
                <div className="mb-6">
                  <FollowButton targetUserId={user.id} isInitiallyFollowing={isFollowing} />
                </div>
              )}

              <div className="flex flex-wrap justify-center gap-4 text-sm text-text-tertiary">
                {user.location && (
                  <div className="flex items-center gap-1.5">
                    <MapPin size={16} />
                    {user.location}
                  </div>
                )}
                {user.website && (
                  (() => {
                    const formattedUrl = user.website.startsWith("http") ? user.website : `https://${user.website}`;
                    let hostname = user.website;
                    try { hostname = new URL(formattedUrl).hostname.replace("www.", ""); } catch(e) {}
                    return (
                      <a href={formattedUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-text-primary transition-colors">
                        <ExternalLink size={16} />
                        {hostname}
                      </a>
                    );
                  })()
                )}
                {user.github && (
                  <a href={user.github.startsWith("http") ? user.github : `https://${user.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-text-primary transition-colors">
                    <GithubIcon size={16} />
                    GitHub
                  </a>
                )}
                {user.twitter && (
                  <a href={user.twitter.startsWith("http") ? user.twitter : `https://twitter.com/${user.twitter.replace(/^@/, "")}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-text-primary transition-colors">
                    <TwitterIcon size={16} />
                    Twitter
                  </a>
                )}
              </div>
            </motion.div>

            {/* Projects Grid */}
            <motion.div variants={fadeUp} custom={1} className="pt-8 border-t border-border-default/50">
              <h2 className="text-left text-sm font-semibold uppercase tracking-wider text-text-tertiary mb-6">
                Public Projects ({user.projects?.length || 0})
              </h2>
              
              {user.projects && user.projects.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {user.projects.map((project: any) => (
                    <Link key={project.id} href={`/public/project/${project.slug}`}>
                      <Card className="p-5 flex flex-col bg-bg-secondary/50 border-border-default hover:border-accent/50 hover:bg-bg-elevated transition-all group text-left h-full">
                        <div className="flex items-start justify-between mb-4">
                        <div className="h-12 w-12 rounded-xl bg-bg-tertiary flex items-center justify-center overflow-hidden border border-border-default">
                          {project.logo ? (
                            <img src={project.logo} alt={project.name} className="h-full w-full object-cover" />
                          ) : (
                            <span className="text-lg font-bold text-text-secondary uppercase">
                              {project.name.substring(0, 2)}
                            </span>
                          )}
                        </div>
                        <div className="px-2.5 py-1 rounded-full bg-bg-tertiary border border-border-default text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                          {project.status.replace("_", " ")}
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-bold text-text-primary mb-1 group-hover:text-accent transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-sm text-text-secondary line-clamp-2 mb-4 flex-1">
                        {project.tagline || project.description}
                      </p>
                      
                      {project.techStack && project.techStack.length > 0 && (
                        <div className="flex items-center gap-2 mt-auto pt-4 border-t border-border-default/50">
                          {project.techStack.slice(0, 3).map((tech: any) => (
                            <span key={tech.id} className="px-2 py-0.5 rounded text-xs font-medium bg-bg-tertiary text-text-secondary">
                              {tech.techName}
                            </span>
                          ))}
                          {project.techStack.length > 3 && (
                            <span className="px-2 py-0.5 rounded text-xs font-medium bg-bg-tertiary text-text-tertiary">
                              +{project.techStack.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border border-dashed border-border-default rounded-xl">
                  <p className="text-text-secondary">No public projects yet.</p>
                </div>
              )}
            </motion.div>

          </motion.div>
        </div>
      </main>

      {/* Footer Branding CTA */}
      <footer className="mt-auto py-8 text-center relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bg-secondary border border-border-default hover:border-accent transition-colors group shadow-lg">
          <img src="/logo.png" alt="BuildVine" className="h-5 w-5 rounded object-cover" />
          <span className="text-sm font-medium text-text-secondary group-hover:text-text-primary">
            Build your portfolio on BuildVine
          </span>
        </Link>
      </footer>
    </div>
  );
}
