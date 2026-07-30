import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Blog | BuildVine",
};

const ARTICLES: Record<string, { title: string, category: string, author: string, content: string }> = {
  "introducing-buildvine": {
    title: "Introducing BuildVine: The Home for Every Project",
    category: "Announcements",
    author: "Jitender",
    content: `
Welcome to BuildVine! We've been working hard behind the scenes to create the ultimate platform for builders, makers, and creators.

For too long, showcasing your projects meant either maintaining a complex personal portfolio website from scratch or scattering your work across multiple generic social media profiles. There hasn't been a dedicated space built specifically to tell the story of a project from idea to launch.

Until now.

### What is BuildVine?

BuildVine is a unified platform designed to give every project its own identity. When you create a project on BuildVine, you get a beautiful, dedicated page featuring your tech stack, your team, and your release history. 

More importantly, you get to build in public. Our Timeline feature allows you to post updates, share milestones, and gather feedback directly from the community as you build.

### The Future of Indie Hacking

We believe that transparency builds trust. By sharing your journey, your failures, and your successes, you naturally attract an audience that cares about your product. BuildVine is built to facilitate this connection.

Thank you for joining us on this journey. We can't wait to see what you build!
    `
  },
  "art-of-building-in-public": {
    title: "The Art of Building in Public",
    category: "Guides",
    author: "BuildVine Team",
    content: `
Building in public has become a staple strategy for indie hackers and startups. But what exactly does it mean, and how can you do it effectively?

### Why Build in Public?

The traditional approach to building a product involves secrecy. You lock yourself in a room for six months, build the "perfect" product, and launch it to crickets. Building in public flips this model on its head.

By sharing your progress from day one, you achieve three critical things:
1. **Accountability:** Knowing people are watching keeps you motivated.
2. **Immediate Feedback:** You learn quickly if a feature is actually wanted.
3. **Early Audience:** People become invested in your story, meaning you have a warm audience on launch day.

### How to Start

1. **Share your idea:** Don't worry about people stealing it. Execution is everything.
2. **Document the struggles:** People love authenticity. Share the bugs, the server crashes, and the design blocks.
3. **Celebrate the wins:** Got your first paying user? Finished the landing page? Share it!

BuildVine's project timeline is the perfect place to start your building-in-public journey. Try posting your first update today!
    `
  },
  "changelog-advanced-analytics": {
    title: "Changelog: Advanced Analytics & Custom Domains",
    category: "Product Updates",
    author: "BuildVine Team",
    content: `
We just rolled out our biggest update yet, bringing highly-requested features to our Pro and Team users.

### Custom Domains

You can now map your own custom domain (e.g., yourproject.com) directly to your BuildVine project page. This allows you to maintain the professional appearance of a custom website while leveraging the community and timeline features of BuildVine.

Setting it up is easy: simply go to your project settings, enter your domain, and add the provided CNAME record to your DNS provider.

### Advanced Analytics

Understanding your audience is key to growth. We've completely overhauled our analytics engine to give you deeper insights.

You can now track:
- **Traffic Sources:** See exactly which websites and social media platforms are driving traffic to your project.
- **Geographic Data:** Understand where your audience is located.
- **Link Clicks:** Track engagement on your primary CTA buttons and social links.

These features are live now for all Pro and Team users. Happy building!
    `
  }
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = ARTICLES[slug];

  if (!article) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-text-tertiary hover:text-text-primary transition-colors mb-12">
        <ArrowLeft size={16} /> Back to Blog
      </Link>

      <div className="mb-12">
        <div className="text-accent text-sm font-semibold uppercase tracking-wider mb-4">
          {article.category}
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary font-heading mb-6 leading-tight">
          {article.title}
        </h1>
        <div className="text-text-tertiary">
          By <span className="text-text-primary font-medium">{article.author}</span>
        </div>
      </div>

      <div className="prose prose-invert prose-lg max-w-none prose-headings:font-heading prose-headings:font-bold prose-a:text-accent hover:prose-a:text-accent/80 prose-img:rounded-xl">
        {/* Simple markdown-like rendering for the placeholder content */}
        {article.content.trim().split('\n\n').map((paragraph, i) => {
          if (paragraph.startsWith('###')) {
            return <h3 key={i} className="text-2xl mt-12 mb-4 text-text-primary">{paragraph.replace('### ', '')}</h3>;
          }
          if (paragraph.startsWith('- ') || paragraph.startsWith('1. ')) {
            return (
              <ul key={i} className="list-disc pl-6 space-y-2 mb-6 text-text-secondary">
                {paragraph.split('\n').map((item, j) => (
                  <li key={j}>{item.replace(/^[-1-9.]+\s/, '')}</li>
                ))}
              </ul>
            );
          }
          return <p key={i} className="mb-6 text-text-secondary leading-relaxed">{paragraph}</p>;
        })}
      </div>
    </div>
  );
}
