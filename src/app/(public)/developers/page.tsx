import { getDevelopers } from "@/lib/actions/user";
import { DeveloperDirectory } from "@/components/user/DeveloperDirectory";
import { Users } from "lucide-react";

export const metadata = {
  title: "Developers | BuildVine",
  description: "Find and connect with top developers on BuildVine.",
};

export default async function DevelopersPage() {
  const { users: initialDevelopers, hasNextPage } = await getDevelopers("", 1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-border-default">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-text-primary font-heading flex items-center gap-3">
            <Users className="text-blue-500" size={28} />
            Meet the Builders
          </h1>
          <p className="text-text-secondary mt-2">
            Discover talented developers, follow their journey, and collaborate on amazing projects.
          </p>
        </div>
      </div>

      <DeveloperDirectory initialDevelopers={initialDevelopers} initialHasNextPage={hasNextPage} />
    </div>
  );
}
