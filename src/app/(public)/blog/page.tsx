import { Card } from "@/components/ui";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Blog | BuildVine",
  description: "News, updates, and stories from the BuildVine team.",
};

const POSTS = [
  {
    slug: "introducing-BuildVine",
    title: "Introducing BuildVine: The Home for Every Project",
    category: "Announcements",
    excerpt: "Today, we are incredibly excited to launch BuildVine to the world. A unified platform for builders to showcase their work, document their journey, and grow their audience.",
    author: "Jitender"
  },
  {
    slug: "art-of-building-in-public",
    title: "The Art of Building in Public",
    category: "Guides",
    excerpt: "Building in public has become a staple for indie hackers and startups. Here is how you can leverage transparency to build an early audience and get invaluable feedback.",
    author: "BuildVine Team"
  },
  {
    slug: "changelog-advanced-analytics",
    title: "Changelog: Advanced Analytics & Custom Domains",
    category: "Product Updates",
    excerpt: "We just rolled out our biggest update yet. Pro and Team users can now attach custom domains to their projects and track deep analytics on their visitors.",
    author: "BuildVine Team"
  }
];

export default function BlogPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary font-heading mb-4">
          The BuildVine Blog
        </h1>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          Insights, announcements, and guides on how to build and launch successful projects.
        </p>
      </div>

      <div className="space-y-8">
        {POSTS.map((post, idx) => (
          <Link key={idx} href={`/blog/${post.slug}`}>
            <Card className="p-8 bg-bg-secondary border-border-default hover:border-accent/50 transition-colors group cursor-pointer h-full flex flex-col">
              <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-text-tertiary mb-3">
                <span className="text-accent">{post.category}</span>
              </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3 group-hover:text-accent transition-colors">
              {post.title}
            </h2>
            
            <p className="text-text-secondary leading-relaxed mb-6">
              {post.excerpt}
            </p>
            
            <div className="flex items-center justify-between mt-auto">
              <span className="text-sm font-medium text-text-primary">
                By {post.author}
              </span>
              <span className="flex items-center gap-1 text-sm font-medium text-accent group-hover:translate-x-1 transition-transform">
                Read Article <ArrowRight size={16} />
              </span>
            </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
