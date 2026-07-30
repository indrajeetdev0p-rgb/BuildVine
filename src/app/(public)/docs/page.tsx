import { Card } from "@/components/ui";
import { BookOpen, Rocket, LineChart, Globe } from "lucide-react";

export const metadata = {
  title: "Documentation | BuildVine",
  description: "Learn how to use BuildVine to showcase your projects.",
};

const SECTIONS = [
  {
    title: "Getting Started",
    icon: Rocket,
    description: "Learn the basics of setting up your BuildVine account and profile.",
    links: ["Quick Start Guide", "Setting up your Profile", "Linking your GitHub"]
  },
  {
    title: "Projects",
    icon: BookOpen,
    description: "Everything you need to know about creating and managing projects.",
    links: ["Creating your first project", "Adding a Tech Stack", "Managing Collaborators"]
  },
  {
    title: "Analytics",
    icon: LineChart,
    description: "Understand your audience with BuildVine analytics.",
    links: ["Understanding your Dashboard", "Tracking Referrers", "Exporting Data"]
  },
  {
    title: "Custom Domains",
    icon: Globe,
    description: "Connect your own domain to your BuildVine project page.",
    links: ["Configuring DNS Records", "SSL Certificates", "Troubleshooting Domains"]
  }
];

export default function DocsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary font-heading mb-4">
          Documentation
        </h1>
        <p className="text-lg text-text-secondary max-w-2xl">
          Everything you need to know about building, sharing, and growing your projects on BuildVine.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {SECTIONS.map((section, idx) => (
          <Card key={idx} className="p-8 bg-bg-secondary border-border-default hover:border-border-hover transition-colors">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-lg bg-bg-tertiary flex items-center justify-center">
                <section.icon className="text-text-primary" size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-text-primary">{section.title}</h2>
                <p className="text-sm text-text-secondary mt-1">{section.description}</p>
              </div>
            </div>
            <ul className="space-y-3">
              {section.links.map((link, i) => (
                <li key={i}>
                  <a href="#" className="text-accent hover:underline text-sm font-medium">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
}
