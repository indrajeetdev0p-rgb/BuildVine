"use client";

import { motion, AnimatePresence, type Variants } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import {
  Globe,
  MapPin,
  Calendar,
  Users,
  ExternalLink,
  Share2,
  CheckCircle2,
  X
} from "lucide-react";
import { Button, Badge, Card, CardTitle, CardDescription } from "@/components/ui";
import { GithubIcon, TwitterIcon } from "@/components/icons";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useSession } from "@/lib/auth-client";
import { FollowButton } from "@/components/user/FollowButton";

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

export default function UserContent({ user }: { user: any }) {
  const { data: session } = useSession();
  const [copied, setCopied] = useState(false);
  const [modalType, setModalType] = useState<"followers" | "following" | null>(null);
  const isOwnProfile = session?.user?.id === user.id;

  const handleShare = () => {
    const url = `${window.location.origin}/public/${user.username}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial="hidden" animate="visible" className="space-y-10">
            {/* Profile Header */}
            <motion.div
              variants={fadeUp}
              custom={0}
              className="flex flex-col sm:flex-row items-start gap-6"
            >
              {/* Avatar */}
              <div className="h-24 w-24 sm:h-32 sm:w-32 shrink-0 overflow-hidden rounded-full border-4 border-bg-primary bg-bg-elevated text-2xl font-bold uppercase flex items-center justify-center shadow-xl">
                {(user.avatar || user.image) ? (
                  <img src={user.avatar || user.image} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  user.name.split(" ").map((n: string) => n[0]).join("")
                )}
              </div>

              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <div>
                    <h1 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight">
                      {user.name}
                    </h1>
                    <p className="text-sm text-text-tertiary font-mono">
                      @{user.username}
                    </p>
                  </div>
                  <div className="sm:ml-auto flex items-center gap-2">
                    {isOwnProfile && (
                      <Link href="/dashboard/settings">
                        <Button variant="secondary" size="sm">
                          Edit Profile
                        </Button>
                      </Link>
                    )}
                    {isOwnProfile && (
                      <Button variant="secondary" size="sm" onClick={handleShare} leftIcon={copied ? <CheckCircle2 size={16} className="text-emerald-500" /> : <Share2 size={16} />}>
                        {copied ? "Copied!" : "Share Portfolio"}
                      </Button>
                    )}
                    {!isOwnProfile && (
                      <FollowButton 
                        targetUserId={user.id} 
                        isInitiallyFollowing={user.followers?.some((f: any) => f.followerId === session?.user?.id) || false} 
                      />
                    )}
                    {user.github && (
                      <a href={user.github.startsWith("http") ? user.github : `https://${user.github}`} target="_blank" rel="noopener noreferrer">
                        <Button variant="secondary" size="sm" leftIcon={<GithubIcon size={14} />}>
                          GitHub
                        </Button>
                      </a>
                    )}
                  </div>
                </div>

                <p className="mt-3 text-sm text-text-secondary leading-relaxed max-w-2xl">
                  {user.bio || "This developer hasn't added a bio yet."}
                </p>

                {/* Meta row */}
                <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-text-tertiary">
                  {user.website && (
                    <a
                      href={user.website.startsWith("http") ? user.website : `https://${user.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 hover:text-accent transition-colors"
                    >
                      <Globe size={14} />
                      {user.website.replace(/^https?:\/\//, "")}
                    </a>
                  )}
                  {user.twitter && (
                    <a
                      href={user.twitter.startsWith("http") ? user.twitter : `https://twitter.com/${user.twitter.replace(/^@/, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 hover:text-accent transition-colors"
                    >
                      <TwitterIcon size={14} />
                      @{user.twitter}
                    </a>
                  )}
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    Joined {new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                  </div>
                  <button 
                    onClick={() => setModalType("followers")}
                    className="flex items-center gap-1.5 font-medium text-text-primary hover:text-accent transition-colors"
                  >
                    <Users size={14} className="text-accent" />
                    <span>{user._count?.followers || 0}</span>
                    <span className="font-normal text-text-tertiary">Followers</span>
                  </button>
                  <button 
                    onClick={() => setModalType("following")}
                    className="flex items-center gap-1.5 font-medium text-text-primary hover:text-accent transition-colors"
                  >
                    <span>{user._count?.following || 0}</span>
                    <span className="font-normal text-text-tertiary">Following</span>
                  </button>
                </div>
              </div>
            </motion.div>

            <AnimatePresence>
              {modalType && (
                <>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setModalType(null)}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
                  >
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      onClick={e => e.stopPropagation()}
                      className="bg-bg-secondary border border-border-default rounded-2xl w-full max-w-md max-h-[80vh] flex flex-col shadow-2xl m-4 overflow-hidden"
                    >
                      <div className="p-4 border-b border-border-default flex items-center justify-between bg-bg-elevated">
                        <h3 className="font-bold text-text-primary capitalize">{modalType}</h3>
                        <button onClick={() => setModalType(null)} className="p-1 hover:bg-bg-hover rounded-md text-text-tertiary hover:text-text-primary transition-colors">
                          <X size={18} />
                        </button>
                      </div>
                      <div className="overflow-y-auto p-4 flex-1">
                        {modalType === "followers" && user.followers?.map((f: any) => (
                          <div key={f.id} className="flex items-center justify-between p-3 rounded-[var(--radius-md)] border border-border-default hover:border-accent/50 transition-colors bg-bg-secondary/30">
                            <Link href={`/${f.follower.username}`} className="flex items-center gap-3">
                              <img src={f.follower.avatar || f.follower.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${f.follower.username}`} alt={f.follower.name} className="h-10 w-10 rounded-full bg-bg-tertiary object-cover border border-border-default" />
                              <div>
                                <p className="text-sm font-semibold text-text-primary hover:text-accent transition-colors">{f.follower.name}</p>
                                <p className="text-xs text-text-tertiary">@{f.follower.username}</p>
                              </div>
                            </Link>
                          </div>
                        ))}
                        {modalType === "followers" && user.followers?.length === 0 && (
                          <p className="text-text-tertiary text-center text-sm py-8">No followers yet.</p>
                        )}

                        {modalType === "following" && user.following?.map((f: any) => (
                          <div key={f.id} className="flex items-center justify-between p-3 rounded-[var(--radius-md)] border border-border-default hover:border-accent/50 transition-colors bg-bg-secondary/30">
                            <Link href={`/${f.following.username}`} className="flex items-center gap-3">
                              <img src={f.following.avatar || f.following.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${f.following.username}`} alt={f.following.name} className="h-10 w-10 rounded-full bg-bg-tertiary object-cover border border-border-default" />
                            <div>
                              <p className="font-bold text-text-primary text-sm">{f.following.name}</p>
                              <p className="text-text-tertiary text-xs">@{f.following.username}</p>
                            </div>
                            </Link>
                          </div>
                        ))}
                        {modalType === "following" && user.following?.length === 0 && (
                          <p className="text-text-tertiary text-center text-sm py-8">Not following anyone yet.</p>
                        )}
                      </div>
                    </motion.div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            {/* Projects Grid */}
            <motion.div variants={fadeUp} custom={1}>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-heading text-xl font-bold tracking-tight">
                  Projects{" "}
                  <span className="text-text-tertiary font-normal text-base">
                    ({user.projects.length})
                  </span>
                </h2>
              </div>

              <motion.div
                className="grid gap-6 sm:grid-cols-2"
                variants={stagger}
                initial="hidden"
                animate="visible"
              >
                {user.projects.map((project: any, i: number) => {
                  const statusStr = (project.status || "IDEA").replace("_", " ");
                  const statusVar = project.status === "LIVE" ? "success" : project.status === "BETA" ? "warning" : project.status === "IN_PROGRESS" ? "accent" : "default";
                  return (
                    <motion.div key={project.id} variants={fadeUp} custom={i + 2}>
                      <Link href={`/project/${project.slug}`}>
                        <Card hover glow padding="none" className="h-full flex flex-col overflow-hidden">
                          {/* Top banner / gradient */}
                          <div
                            className="h-28 w-full relative bg-bg-secondary"
                          >
                            {project.coverImage && (
                              <img src={project.coverImage} alt="Cover" className="h-full w-full object-cover opacity-60" />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary via-transparent to-transparent" />
                          </div>
                          
                          {/* Body */}
                          <div className="px-5 pb-5 relative flex-1 flex flex-col">
                            <div className="flex justify-between items-start -mt-6 mb-3">
                              <div className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] border-2 border-bg-secondary bg-bg-elevated text-xl shadow-sm overflow-hidden z-10">
                                {project.logo ? (
                                  <img src={project.logo} alt="Logo" className="w-full h-full object-cover" />
                                ) : "⚡"}
                              </div>
                              <Badge
                                variant={statusVar as any}
                                size="sm"
                                dot
                                pulseDot={project.status === "LIVE"}
                              >
                                {statusStr}
                              </Badge>
                            </div>

                            <CardTitle className="text-base">{project.name}</CardTitle>
                            <CardDescription className="mt-1 text-xs line-clamp-2 min-h-[32px]">
                              {project.tagline || project.description || "No description provided."}
                            </CardDescription>

                            <div className="mt-4 flex flex-wrap gap-1.5 h-[50px] overflow-hidden">
                              {project.techStack?.map((t: any) => (
                                <Badge key={t.id} variant="accent" size="sm">
                                  {t.techName}
                                </Badge>
                              ))}
                            </div>

                            <div className="mt-auto pt-4 border-t border-border-default flex items-center justify-between text-xs font-medium text-text-tertiary">
                              <span className="flex items-center gap-1 hover:text-accent transition-colors">
                                <ExternalLink size={14} /> View Details
                              </span>
                            </div>
                          </div>
                        </Card>
                      </Link>
                    </motion.div>
                  );
                })}
                
                {user.projects.length === 0 && (
                  <div className="col-span-full py-16 text-center text-text-secondary">
                    This user hasn't published any public projects yet.
                  </div>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
