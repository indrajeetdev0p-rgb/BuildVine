"use client";

import { useState } from "react";
import { ArrowLeft, Upload, X, Plus } from "lucide-react";
import Link from "next/link";
import { Button, Input, Badge, Card, CardTitle } from "@/components/ui";
import { createProject, updateProject } from "@/lib/actions/project";
import { useUpload } from "@/hooks/useUpload";

const STATUS_OPTIONS = [
  { value: "IDEA", label: "Idea", icon: "💡" },
  { value: "IN_PROGRESS", label: "In Progress", icon: "🔨" },
  { value: "BETA", label: "Beta", icon: "🧪" },
  { value: "LIVE", label: "Live", icon: "🚀" },
];

export function ProjectForm({ initialData }: { initialData?: any }) {
  const isEditing = !!initialData;
  const [status, setStatus] = useState(initialData?.status || "IDEA");
  const [techStack, setTechStack] = useState<string[]>(initialData?.techStack?.map((t:any) => t.techName) || []);
  const [techInput, setTechInput] = useState("");
  const [logoUrl, setLogoUrl] = useState<string | null>(initialData?.logo || null);
  const [coverUrl, setCoverUrl] = useState<string | null>(initialData?.coverImage || null);
  
  const [features, setFeatures] = useState<{ icon: string; title: string; description: string }[]>(
    initialData?.features?.map((f:any) => ({ icon: f.icon || "✨", title: f.title, description: f.description })) || []
  );
  const [featureInput, setFeatureInput] = useState({ icon: "", title: "", description: "" });
  
  const [timeline, setTimeline] = useState<{ icon: string; title: string; date: string }[]>(
    initialData?.timeline?.map((t:any) => ({ icon: t.icon || "📌", title: t.title, date: t.date })) || []
  );
  const [timelineInput, setTimelineInput] = useState({ icon: "", title: "", date: "" });

  const { upload, isUploading } = useUpload();

  const addTech = () => {
    if (techInput.trim() && !techStack.includes(techInput.trim())) {
      setTechStack([...techStack, techInput.trim()]);
      setTechInput("");
    }
  };

  const addFeature = () => {
    if (featureInput.title.trim() && featureInput.description.trim()) {
      setFeatures([...features, featureInput]);
      setFeatureInput({ icon: "", title: "", description: "" });
    }
  };

  const addTimelineEvent = () => {
    if (timelineInput.title.trim() && timelineInput.date.trim()) {
      setTimeline([...timeline, timelineInput]);
      setTimelineInput({ icon: "", title: "", date: "" });
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const result = await upload(file);
    setLogoUrl(result.publicUrl);
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const result = await upload(file);
    setCoverUrl(result.publicUrl);
  };

  return (
    <div className="max-w-2xl mx-auto pb-12">
      {/* Back button */}
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-sm text-text-secondary 
                   hover:text-text-primary mb-6 transition-colors"
      >
        <ArrowLeft size={16} /> Back to Dashboard
      </Link>

      <h1 className="font-heading text-2xl font-bold tracking-tight mb-8">
        {isEditing ? (
          <>Edit <span className="gradient-text">{initialData.name}</span></>
        ) : (
          <>Create New <span className="gradient-text">Project</span></>
        )}
      </h1>

      <form action={isEditing ? updateProject.bind(null, initialData.id) : createProject} className="space-y-6">
        {/* Logo & Cover Upload */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-text-secondary mb-2 block">
              Logo
            </label>
            <label className="flex h-32 cursor-pointer items-center justify-center 
                              rounded-[var(--radius-lg)] border-2 border-dashed 
                              border-border-default hover:border-accent transition-colors 
                              bg-bg-secondary">
              {logoUrl ? (
                <img src={logoUrl} alt="Logo" className="h-full object-contain rounded-lg p-2" />
              ) : (
                <div className="text-center">
                  <Upload size={24} className="mx-auto text-text-tertiary mb-2" />
                  <span className="text-xs text-text-tertiary">Upload logo</span>
                </div>
              )}
              <input type="hidden" name="logo" value={logoUrl || ""} />
              <input type="file" className="hidden" accept="image/*"
                     onChange={handleLogoUpload} />
            </label>
          </div>
          <div>
            <label className="text-sm font-medium text-text-secondary mb-2 block">
              Cover Image
            </label>
            <label className="flex h-32 cursor-pointer items-center justify-center 
                              rounded-[var(--radius-lg)] border-2 border-dashed 
                              border-border-default hover:border-accent transition-colors 
                              bg-bg-secondary overflow-hidden">
              {coverUrl ? (
                <img src={coverUrl} alt="Cover" className="h-full w-full object-cover" />
              ) : (
                <div className="text-center">
                  <Upload size={24} className="mx-auto text-text-tertiary mb-2" />
                  <span className="text-xs text-text-tertiary">Upload cover</span>
                </div>
              )}
              <input type="hidden" name="coverImage" value={coverUrl || ""} />
              <input type="file" className="hidden" accept="image/*"
                     onChange={handleCoverUpload} />
            </label>
          </div>
        </div>

        {/* Project Details */}
        <Input name="name" label="Project Name" placeholder="AlarmFit" required defaultValue={initialData?.name} />
        <Input name="tagline" label="Tagline" placeholder="Exercise to dismiss your alarm" defaultValue={initialData?.tagline} />
        
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1.5">
            Description
          </label>
          <textarea 
            name="description" 
            defaultValue={initialData?.description}
            className="w-full rounded-[var(--radius-md)] border border-border-default bg-bg-primary px-3 py-2 text-sm text-text-primary placeholder-text-tertiary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-all min-h-[120px] resize-y"
            placeholder="What does your project do? What problem does it solve?"
          />
          <p className="mt-1.5 text-xs text-text-tertiary">Supports markdown formatting.</p>
        </div>

        {/* Status */}
        <div>
          <label className="text-sm font-medium text-text-secondary mb-2 block">
            Status
          </label>
          <div className="flex flex-wrap gap-2">
            {STATUS_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setStatus(opt.value)}
                className={`px-4 py-2 rounded-[var(--radius-md)] text-sm font-medium 
                            border transition-all cursor-pointer
                  ${status === opt.value
                    ? "border-accent bg-accent-muted text-accent"
                    : "border-border-default bg-bg-tertiary text-text-secondary hover:border-border-hover"
                  }`}
              >
                {opt.icon} {opt.label}
              </button>
            ))}
          </div>
          <input type="hidden" name="status" value={status} />
        </div>

        {/* Tech Stack */}
        <div>
          <label className="text-sm font-medium text-text-secondary mb-2 block">
            Tech Stack
          </label>
          <div className="flex gap-2">
            <div className="flex-1">
                <Input
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                placeholder="React, Node.js, PostgreSQL..."
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTech())}
                />
            </div>
            <Button type="button" variant="secondary" onClick={addTech} className="mt-7">
              <Plus size={16} /> Add
            </Button>
          </div>
          {techStack.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {techStack.map((tech) => (
                <Badge key={tech} variant="accent" size="sm">
                  {tech}
                  <button type="button"
                    onClick={() => setTechStack(techStack.filter((t) => t !== tech))}
                    className="ml-1 hover:text-white cursor-pointer inline-flex items-center">
                    <X size={10} />
                  </button>
                </Badge>
              ))}
            </div>
          )}
          <input type="hidden" name="techStack" value={JSON.stringify(techStack)} />
        </div>

        {/* Features Section */}
        <div className="pt-4 border-t border-border-default">
          <label className="text-sm font-medium text-text-secondary mb-2 block">
            Features
          </label>
          <div className="grid grid-cols-12 gap-2 mb-3">
            <div className="col-span-2">
              <Input
                placeholder="Icon (e.g. 🚀)"
                value={featureInput.icon}
                onChange={(e) => setFeatureInput({ ...featureInput, icon: e.target.value })}
              />
            </div>
            <div className="col-span-4">
              <Input
                placeholder="Title"
                value={featureInput.title}
                onChange={(e) => setFeatureInput({ ...featureInput, title: e.target.value })}
              />
            </div>
            <div className="col-span-4">
              <Input
                placeholder="Description"
                value={featureInput.description}
                onChange={(e) => setFeatureInput({ ...featureInput, description: e.target.value })}
              />
            </div>
            <div className="col-span-2 flex items-end">
              <Button type="button" variant="secondary" onClick={addFeature} className="w-full h-10 mt-7">
                <Plus size={16} /> Add
              </Button>
            </div>
          </div>
          {features.length > 0 && (
            <div className="grid gap-2 sm:grid-cols-2">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3 rounded-[var(--radius-md)] border border-border-default p-3 bg-bg-secondary relative group">
                  <span className="text-xl">{feature.icon}</span>
                  <div>
                    <p className="font-heading text-sm font-semibold">{feature.title}</p>
                    <p className="text-xs text-text-tertiary mt-0.5">{feature.description}</p>
                  </div>
                  <button type="button"
                    onClick={() => setFeatures(features.filter((_, i) => i !== idx))}
                    className="absolute top-2 right-2 text-text-tertiary hover:text-danger opacity-0 group-hover:opacity-100 transition-opacity">
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
          <input type="hidden" name="features" value={JSON.stringify(features)} />
        </div>

        {/* Timeline Section */}
        <div className="pt-4 border-t border-border-default">
          <label className="text-sm font-medium text-text-secondary mb-2 block">
            Timeline Events
          </label>
          <div className="grid grid-cols-12 gap-2 mb-3">
            <div className="col-span-2">
              <Input
                placeholder="Icon (e.g. 🎉)"
                value={timelineInput.icon}
                onChange={(e) => setTimelineInput({ ...timelineInput, icon: e.target.value })}
              />
            </div>
            <div className="col-span-4">
              <Input
                placeholder="Date (e.g. July 2026)"
                value={timelineInput.date}
                onChange={(e) => setTimelineInput({ ...timelineInput, date: e.target.value })}
              />
            </div>
            <div className="col-span-4">
              <Input
                placeholder="Title (e.g. 1k Users)"
                value={timelineInput.title}
                onChange={(e) => setTimelineInput({ ...timelineInput, title: e.target.value })}
              />
            </div>
            <div className="col-span-2 flex items-end">
              <Button type="button" variant="secondary" onClick={addTimelineEvent} className="w-full h-10 mt-7">
                <Plus size={16} /> Add
              </Button>
            </div>
          </div>
          {timeline.length > 0 && (
            <div className="space-y-2">
              {timeline.map((event, idx) => (
                <div key={idx} className="flex items-center gap-3 rounded-[var(--radius-md)] border border-border-default p-2 bg-bg-secondary relative group">
                   <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-muted text-sm shrink-0">
                      {event.icon}
                   </div>
                   <div>
                     <p className="font-heading text-sm font-semibold">{event.title}</p>
                     <p className="text-xs text-text-tertiary font-mono">{event.date}</p>
                   </div>
                   <button type="button"
                    onClick={() => setTimeline(timeline.filter((_, i) => i !== idx))}
                    className="absolute top-2 right-2 text-text-tertiary hover:text-danger opacity-0 group-hover:opacity-100 transition-opacity">
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
          <input type="hidden" name="timeline" value={JSON.stringify(timeline)} />
        </div>

        {/* Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input name="website" label="Website URL" placeholder="https://..." defaultValue={initialData?.website} />
          <Input name="github" label="GitHub URL" placeholder="https://github.com/..." defaultValue={initialData?.github} />
          <Input name="liveDemo" label="Live Demo URL" placeholder="https://..." defaultValue={initialData?.liveDemo} />
          <Input name="docs" label="Documentation URL" placeholder="https://..." defaultValue={initialData?.docs} />
          <Input name="downloadUrl" label="Download URL" placeholder="https://..." defaultValue={initialData?.downloadUrl} />
        </div>

        {/* Submit */}
        <div className="pt-6 border-t border-border-default flex justify-end">
          <Button type="submit" variant="gradient" size="lg" className="w-full sm:w-auto">
            {isEditing ? "Save Changes" : "Launch Project 🚀"}
          </Button>
        </div>
      </form>
    </div>
  );
}
