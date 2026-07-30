"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useEffect } from "react";
import { Input } from "@/components/ui";
import { Search } from "lucide-react";

export function ExploreFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [tech, setTech] = useState(searchParams.get("tech") || "");

  const updateFilters = useCallback(
    (q: string, t: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (q) params.set("q", q);
      else params.delete("q");

      if (t) params.set("tech", t);
      else params.delete("tech");

      router.push(`/explore?${params.toString()}`);
    },
    [router, searchParams]
  );

  // Debounce the search input
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query !== (searchParams.get("q") || "")) {
        updateFilters(query, tech);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [query, tech, updateFilters, searchParams]);

  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto mt-4 md:mt-0">
      <div className="relative w-full sm:w-64">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-text-tertiary" />
        </div>
        <Input
          type="text"
          placeholder="Search projects..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9"
        />
      </div>
      <div className="w-full sm:w-48">
        <select
          value={tech}
          onChange={(e) => {
            setTech(e.target.value);
            updateFilters(query, e.target.value);
          }}
          className="w-full h-10 px-3 py-2 bg-bg-secondary border border-border-default rounded-md text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-border-focus"
        >
          <option value="">All Technologies</option>
          <option value="React">React</option>
          <option value="Next.js">Next.js</option>
          <option value="Node.js">Node.js</option>
          <option value="Tailwind CSS">Tailwind CSS</option>
          <option value="PostgreSQL">PostgreSQL</option>
          <option value="TypeScript">TypeScript</option>
        </select>
      </div>
    </div>
  );
}
