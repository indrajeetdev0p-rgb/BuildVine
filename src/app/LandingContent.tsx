"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Globe,
  GitBranch,
  BarChart3,
  MessageSquare,
  Layers,
  Rocket,
  Code2,
  Palette,
  GraduationCap,
  Lightbulb,
  Zap,
} from "lucide-react";
import { Button, Badge, Card, CardTitle, CardDescription } from "@/components/ui";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useSession } from "@/lib/auth-client";

/* ----------------------------------------------------------------
   ANIMATION VARIANTS
   ---------------------------------------------------------------- */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  }),
};

const stagger: Variants = {
  visible: { transition: { staggerChildren: 0.08 } },
};

/* ----------------------------------------------------------------
   DATA
   ---------------------------------------------------------------- */
const FEATURES = [
  {
    icon: Globe,
    title: "Public Project Page",
    description:
      "Every project gets a modern profile with logo, tech stack, links, team members, and status — your project's digital identity.",
  },
  {
    icon: GitBranch,
    title: "Project Timeline",
    description:
      "A chronological story from idea to launch. Document milestones, prototypes, betas, and every achievement along the way.",
  },
  {
    icon: Layers,
    title: "Release History",
    description:
      "Version numbers, new features, bug fixes, improvements — users can explore how your project has evolved over time.",
  },
  {
    icon: Rocket,
    title: "Public Roadmap",
    description:
      "Organize features into Planned, In Progress, and Completed. Let visitors see what's coming next.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description:
      "Monitor views, unique visitors, traffic sources, top countries, and link clicks — all from your private dashboard.",
  },
  {
    icon: MessageSquare,
    title: "Feedback & Bug Tracker",
    description:
      "Collect suggestions, bug reports, and feature requests. Create transparency between builders and users.",
  },
];

const AUDIENCES = [
  {
    icon: Code2,
    label: "Developers",
    description: "Showcase side projects, SaaS, open-source, and apps.",
  },
  {
    icon: GraduationCap,
    label: "Students",
    description: "Build portfolios for internships and hackathons.",
  },
  {
    icon: Lightbulb,
    label: "Indie Hackers",
    description: "Build in public and grow your audience.",
  },
  {
    icon: Zap,
    label: "Startups",
    description: "Public roadmaps, releases, and user feedback.",
  },
  {
    icon: Palette,
    label: "Designers",
    description: "Present UI/UX case studies and design systems.",
  },
];

const SAMPLE_PROJECTS = [
  {
    name: "AlarmFit",
    tagline: "Exercise to dismiss your alarm",
    tech: ["React Native", "TypeScript", "Firebase"],
    status: "Live" as const,
    statusVariant: "success" as const,
    emoji: "⚡",
    gradient: "linear-gradient(135deg, #F59E0B, #EF4444)",
  },
  {
    name: "CreatorAI Studio",
    tagline: "AI toolkit for content creators",
    tech: ["Next.js", "Python", "OpenAI"],
    status: "Beta" as const,
    statusVariant: "warning" as const,
    emoji: "🎨",
    gradient: "linear-gradient(135deg, #10B981, #059669)",
  },
  {
    name: "Fantasy Sword Viewer",
    tagline: "Interactive 3D fantasy weapon viewer",
    tech: ["Three.js", "WebGL", "Blender"],
    status: "In Progress" as const,
    statusVariant: "accent" as const,
    emoji: "⚔️",
    gradient: "linear-gradient(135deg, #8B5CF6, #EC4899)",
  },
];

/* ----------------------------------------------------------------
   PAGE COMPONENT
   ---------------------------------------------------------------- */
export default function LandingContent({ publicProjects }: { publicProjects: any[] }) {
  const { data: session } = useSession();
  // Use real projects if available, otherwise fallback to a default array (for the UI)
  const projectsToDisplay = publicProjects.length > 0 ? publicProjects : SAMPLE_PROJECTS;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* ============ HERO ============ */}
        <section className="relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-20 blur-[120px]"
              style={{ background: "var(--accent-gradient)" }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--bg-primary)_70%)]" />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-20 sm:pt-32 sm:pb-28">
            <motion.div
              className="text-center"
              initial="hidden"
              animate="visible"
              variants={stagger}
            >
              {/* Badge */}
              <motion.div variants={fadeUp} custom={0} className="mb-6">
                <Badge variant="accent" size="md" dot pulseDot>
                  Now in development
                </Badge>
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={fadeUp}
                custom={1}
                className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]"
              >
                The Home for
                <br />
                <span className="gradient-text">Every Project</span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                variants={fadeUp}
                custom={2}
                className="mx-auto mt-6 max-w-2xl text-lg sm:text-xl text-text-secondary leading-relaxed"
              >
                One project. One link. Everything inside. Create a living page
                that tells the complete story of your project — from idea to
                launch and beyond.
              </motion.p>

              {/* URL Preview */}
              <motion.div
                variants={fadeUp}
                custom={3}
                className="mt-8 flex justify-center"
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-border-default bg-bg-secondary px-5 py-2.5">
                  <Globe size={16} className="text-text-tertiary" />
                  <span className="font-mono text-sm text-text-secondary">
                    BuildVine.app/project/
                  </span>
                  <span className="font-mono text-sm font-semibold text-accent">
                    {session ? (session.user.name.toLowerCase().replace(/\s+/g, '') + "-app") : "your-project"}
                  </span>
                </div>
              </motion.div>

              {/* CTAs */}
              <motion.div
                variants={fadeUp}
                custom={4}
                className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Link href={session ? "/dashboard/projects/new" : "/register"}>
                  <Button variant="gradient" size="lg" rightIcon={<ArrowRight size={18} />}>
                    Create Your Project
                  </Button>
                </Link>
                <Link href="/explore">
                  <Button variant="secondary" size="lg" leftIcon={<Sparkles size={18} />}>
                    Explore Projects
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ============ SAMPLE PROJECT CARDS ============ */}
        <section className="border-t border-border-default bg-bg-secondary py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={stagger}
            >
              <motion.h2
                variants={fadeUp}
                custom={0}
                className="font-heading text-3xl sm:text-4xl font-bold tracking-tight"
              >
                Every project tells a{" "}
                <span className="gradient-text">story</span>
              </motion.h2>
              <motion.p
                variants={fadeUp}
                custom={1}
                className="mt-4 text-text-secondary text-lg max-w-xl mx-auto"
              >
                From side projects to SaaS products — give your work the
                spotlight it deserves.
              </motion.p>
            </motion.div>

            <motion.div
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={stagger}
            >
              {projectsToDisplay.map((project, i) => {
                const isReal = !!project.id;
                const statusStr = isReal ? (project.status || "IDEA").replace("_", " ") : project.status;
                const statusVar = project.statusVariant || (project.status === "LIVE" ? "success" : "default");
                return (
                <motion.div key={isReal ? project.id : project.name} variants={fadeUp} custom={i}>
                  <Link href={isReal ? `/project/${project.slug}` : "#"}>
                    <Card hover glow padding="none">
                      {/* Cover */}
                      <div
                        className="h-36 relative overflow-hidden rounded-t-[var(--radius-lg)] bg-bg-secondary"
                        style={project.gradient ? { background: project.gradient } : undefined}
                      >
                        {isReal && project.coverImage ? (
                          <img src={project.coverImage} alt="Cover" className="h-full w-full object-cover opacity-80" />
                        ) : null}
                        <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary via-transparent to-transparent" />
                      </div>

                      {/* Body */}
                      <div className="relative px-6 pb-6">
                        {/* Logo */}
                        <div className="absolute -top-6 left-6 flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] border-2 border-bg-secondary bg-bg-elevated text-xl overflow-hidden">
                          {isReal && project.logo ? (
                             <img src={project.logo} alt="Logo" className="w-full h-full object-cover" />
                          ) : (
                             project.emoji || "⚡"
                          )}
                        </div>

                        <div className="pt-8">
                          <CardTitle className="text-base">
                            {project.name}
                          </CardTitle>
                          <CardDescription className="mt-1 line-clamp-2 min-h-[40px]">
                            {project.tagline || project.description || "No description provided."}
                          </CardDescription>

                          {/* Tags */}
                          <div className="mt-4 flex flex-wrap gap-1.5 h-[56px] overflow-hidden">
                            {(isReal ? project.techStack.map((t: any) => t.techName) : project.tech).map((t: string) => (
                              <Badge key={t} variant="accent" size="sm">
                                {t}
                              </Badge>
                            ))}
                          </div>

                          {/* Footer */}
                          <div className="mt-4 flex items-center justify-between pt-4 border-t border-border-default">
                            <Badge
                              variant={statusVar as any}
                              size="sm"
                              dot
                              pulseDot={project.status === "LIVE"}
                            >
                              {statusStr}
                            </Badge>
                            <span className="text-xs text-text-tertiary font-mono">
                              BuildVine.app
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              )})}
            </motion.div>
          </div>
        </section>

        {/* ============ FEATURES GRID ============ */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={stagger}
            >
              <motion.div variants={fadeUp} custom={0}>
                <Badge variant="accent" size="md">
                  Core Features
                </Badge>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                custom={1}
                className="mt-4 font-heading text-3xl sm:text-4xl font-bold tracking-tight"
              >
                Everything your project needs,{" "}
                <span className="gradient-text">in one place</span>
              </motion.h2>
            </motion.div>

            <motion.div
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={stagger}
            >
              {FEATURES.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <motion.div key={feature.title} variants={fadeUp} custom={i}>
                    <Card hover padding="lg" className="h-full">
                      <div className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] bg-accent-muted mb-4">
                        <Icon size={22} className="text-accent" />
                      </div>
                      <CardTitle className="text-base mb-2">
                        {feature.title}
                      </CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ============ AUDIENCE ============ */}
        <section className="border-t border-border-default bg-bg-secondary py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={stagger}
            >
              <motion.h2
                variants={fadeUp}
                custom={0}
                className="font-heading text-3xl sm:text-4xl font-bold tracking-tight"
              >
                Built for{" "}
                <span className="gradient-text">builders</span>
              </motion.h2>
              <motion.p
                variants={fadeUp}
                custom={1}
                className="mt-4 text-text-secondary text-lg max-w-xl mx-auto"
              >
                Whether you&apos;re a solo developer, a student, or a startup
                team — BuildVine is where your work lives.
              </motion.p>
            </motion.div>

            <motion.div
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={stagger}
            >
              {AUDIENCES.map((audience, i) => {
                const Icon = audience.icon;
                return (
                  <motion.div key={audience.label} variants={fadeUp} custom={i}>
                    <Card hover padding="md" className="text-center h-full">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-muted mx-auto mb-3">
                        <Icon size={24} className="text-accent" />
                      </div>
                      <h3 className="font-heading font-bold text-sm">
                        {audience.label}
                      </h3>
                      <p className="mt-1 text-xs text-text-tertiary leading-relaxed">
                        {audience.description}
                      </p>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ============ CTA SECTION ============ */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <motion.div
              className="relative rounded-[var(--radius-xl)] overflow-hidden"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0}
            >
              {/* Background Gradient */}
              <div
                className="absolute inset-0 opacity-10"
                style={{ background: "var(--accent-gradient)" }}
              />
              <div className="absolute inset-0 bg-bg-secondary/80 backdrop-blur-sm" />

              {/* Content */}
              <div className="relative px-8 py-16 sm:px-16 sm:py-20 text-center border border-border-default rounded-[var(--radius-xl)]">
                <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight">
                  Give your project a{" "}
                  <span className="gradient-text">permanent home</span>
                </h2>
                <p className="mt-4 text-text-secondary text-lg max-w-lg mx-auto">
                  Not just a repository. Not just documentation. A living page
                  that tells your project&apos;s complete story.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/register">
                    <Button
                      variant="gradient"
                      size="lg"
                      rightIcon={<ArrowRight size={18} />}
                    >
                      Get Started — It&apos;s Free
                    </Button>
                  </Link>
                </div>
                <p className="mt-4 text-xs text-text-tertiary">
                  No credit card required · Free plan available
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
