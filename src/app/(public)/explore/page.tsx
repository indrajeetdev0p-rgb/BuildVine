import { getAllPublicProjects } from "@/lib/actions/project";
import { getSession } from "@/lib/session";
import { ProjectCard } from "@/components/project/ProjectCard";
import { Telescope } from "lucide-react";
import { ExploreFilters } from "@/components/explore/ExploreFilters";
import { SponsorCard } from "@/components/ads/SponsorCard";
import { getSponsorByIndex } from "@/lib/sponsors";

export const metadata = {
  title: "Explore Projects | BuildVine",
  description: "Discover amazing projects built by the community.",
};

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; tech?: string }>;
}) {
  const session = await getSession();
  const params = await searchParams;

  const projects = await getAllPublicProjects({
    query: params.q,
    tech: params.tech,
  });

  // Build the grid items, injecting a sponsor card after every 6 real cards
  const SPONSOR_INTERVAL = 6;
  const gridItems: Array<{ type: "project"; data: any } | { type: "sponsor"; index: number }> = [];

  projects.forEach((project: any, i: number) => {
    gridItems.push({ type: "project", data: project });
    // Insert a sponsor card after every 6th project
    if ((i + 1) % SPONSOR_INTERVAL === 0) {
      gridItems.push({ type: "sponsor", index: Math.floor(i / SPONSOR_INTERVAL) });
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-border-default">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-text-primary font-heading flex items-center gap-3">
            <Telescope className="text-orange-500" size={28} />
            Explore Projects
          </h1>
          <p className="text-text-secondary mt-2">
            Discover what the community is building. Find inspiration, contribute, or just admire the craft.
          </p>
        </div>
        <ExploreFilters />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {gridItems.map((item, i) =>
          item.type === "sponsor" ? (
            <SponsorCard
              key={`sponsor-${item.index}`}
              sponsor={getSponsorByIndex(item.index)}
              variant="feed"
            />
          ) : (
            <ProjectCard
              key={item.data.id}
              project={item.data}
              currentUserId={session?.user.id}
            />
          )
        )}

        {projects.length === 0 && (
          <>
            {/* Show a sponsor banner even when no projects exist */}
            <SponsorCard
              sponsor={getSponsorByIndex(0)}
              variant="banner"
            />
            <div className="col-span-full py-20 text-center border border-dashed border-border-default rounded-3xl bg-bg-secondary/50">
              <h3 className="text-xl font-medium text-text-primary mb-2">
                No projects found
              </h3>
              <p className="text-text-secondary max-w-sm mx-auto">
                It looks like there are no public projects yet. Be the first to share your creation!
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
