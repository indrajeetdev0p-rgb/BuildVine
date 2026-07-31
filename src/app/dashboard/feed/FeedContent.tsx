"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { format } from "date-fns";
import { Card } from "@/components/ui";
import { Rocket, Clock, MessageSquare, Heart } from "lucide-react";

export function FeedContent({ initialProjects, initialUpdates }: { initialProjects: any[], initialUpdates: any[] }) {
  const [activeTab, setActiveTab] = useState<"projects" | "updates">("projects");

  return (
    <div>
      {/* Tabs */}
      <div className="flex items-center gap-4 border-b border-border-default/50 pb-4 mb-8">
        <button
          onClick={() => setActiveTab("projects")}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
            activeTab === "projects" 
              ? "bg-bg-tertiary text-text-primary" 
              : "text-text-secondary hover:text-text-primary hover:bg-bg-secondary"
          }`}
        >
          <Rocket size={16} /> New Projects
        </button>
        <button
          onClick={() => setActiveTab("updates")}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
            activeTab === "updates" 
              ? "bg-bg-tertiary text-text-primary" 
              : "text-text-secondary hover:text-text-primary hover:bg-bg-secondary"
          }`}
        >
          <Clock size={16} /> Timeline Updates
        </button>
      </div>

      {/* Feed Content */}
      <div className="grid gap-6 sm:grid-cols-2">
        {activeTab === "projects" && (
          initialProjects.length === 0 ? (
            <div className="col-span-full text-center py-20 border border-dashed border-border-default rounded-2xl">
              <Rocket size={40} className="mx-auto mb-4 opacity-20 text-text-secondary" />
              <p className="text-text-secondary">Nobody you follow has launched a project recently.</p>
            </div>
          ) : (
            initialProjects.map((project) => (
              <motion.div key={project.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="h-full">
                <Link href={`/project/${project.slug}`} className="h-full block">
                  <Card className="p-6 bg-bg-secondary/50 border-border-default hover:border-accent/50 hover:bg-bg-elevated transition-all group h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border-default/50">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bg-tertiary border border-border-default overflow-hidden">
                        <img 
                          src={project.user.avatar || project.user.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${project.user.username}`} 
                          alt={project.user.name}
                          className="h-full w-full object-cover" 
                        />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-text-primary">{project.user.name}</p>
                        <p className="text-xs text-text-tertiary">Launched a new project • {format(new Date(project.createdAt), "MMM d, yyyy")}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-5">
                      <div className="h-16 w-16 md:h-20 md:w-20 rounded-xl bg-bg-tertiary flex items-center justify-center shrink-0 border border-border-default overflow-hidden">
                        {project.logo ? (
                          <img src={project.logo} alt={project.name} className="h-full w-full object-cover" />
                        ) : (
                          <span className="text-xl font-bold uppercase text-text-secondary">{project.name.substring(0, 2)}</span>
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-text-primary mb-1 group-hover:text-accent transition-colors">{project.name}</h3>
                        <p className="text-text-secondary line-clamp-2 text-sm">{project.tagline || project.description}</p>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))
          )
        )}

        {activeTab === "updates" && (
          initialUpdates.length === 0 ? (
            <div className="col-span-full text-center py-20 border border-dashed border-border-default rounded-2xl">
              <Clock size={40} className="mx-auto mb-4 opacity-20 text-text-secondary" />
              <p className="text-text-secondary">No recent timeline updates from developers you follow.</p>
            </div>
          ) : (
            initialUpdates.map((update) => (
              <motion.div key={update.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="h-full">
                <Card className="p-6 bg-bg-secondary/50 border-border-default relative overflow-hidden h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border-default/50">
                    <img 
                      src={update.project.user.avatar || update.project.user.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${update.project.user.username}`} 
                      alt={update.project.user.name} 
                      className="h-10 w-10 rounded-full bg-bg-tertiary object-cover border border-border-default" 
                    />
                    <div>
                      <p className="text-sm text-text-primary">
                        <span className="font-bold">{update.project.user.name}</span> posted an update for <Link href={`/project/${update.project.slug}`} className="text-accent hover:underline">{update.project.name}</Link>
                      </p>
                      <p className="text-xs text-text-tertiary">{format(new Date(update.date), "MMM d, yyyy")}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold text-text-primary mb-2">{update.title}</h3>
                    <p className="text-text-secondary whitespace-pre-wrap">{update.content}</p>
                  </div>
                </Card>
              </motion.div>
            ))
          )
        )}
      </div>
    </div>
  );
}
