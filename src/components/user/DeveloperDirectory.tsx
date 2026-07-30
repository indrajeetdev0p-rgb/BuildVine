"use client";

import { useState, useEffect } from "react";
import { UserCard } from "@/components/user/UserCard";
import { getDevelopers } from "@/lib/actions/user";
import { Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui";

interface DeveloperDirectoryProps {
  initialDevelopers: any[];
  initialHasNextPage: boolean;
}

export function DeveloperDirectory({ initialDevelopers, initialHasNextPage }: DeveloperDirectoryProps) {
  const [developers, setDevelopers] = useState<any[]>(initialDevelopers);
  const [hasNextPage, setHasNextPage] = useState(initialHasNextPage);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // Live Search with Debounce
  useEffect(() => {
    // Skip the initial render to prevent an unnecessary DB call
    if (searchQuery === "" && page === 1 && developers.length === initialDevelopers.length) return;

    const delayDebounceFn = setTimeout(async () => {
      setIsSearching(true);
      setPage(1);
      try {
        const res = await getDevelopers(searchQuery, 1);
        setDevelopers(res.users);
        setHasNextPage(res.hasNextPage);
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  // Handle Search Input Change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const executeSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The search is handled automatically by the useEffect!
  };

  const loadMore = async () => {
    if (isLoading || !hasNextPage) return;
    setIsLoading(true);
    
    const nextPage = page + 1;
    try {
      const res = await getDevelopers(searchQuery, nextPage);
      setDevelopers((prev) => [...prev, ...res.users]);
      setHasNextPage(res.hasNextPage);
      setPage(nextPage);
    } catch (error) {
      console.error("Failed to load more developers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <div className="max-w-xl mx-auto">
        <form onSubmit={executeSearch} className="relative flex items-center">
          <Search className="absolute left-4 text-text-tertiary" size={18} />
          <input
            type="text"
            placeholder="Search developers by name or username..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full bg-bg-secondary border border-border-default rounded-full py-3 pl-11 pr-24 text-sm text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-text-tertiary"
          />
          <button 
            type="submit"
            disabled={isSearching}
            className="absolute right-2 px-4 py-1.5 bg-bg-tertiary hover:bg-bg-hover text-text-secondary text-sm font-medium rounded-full transition-colors disabled:opacity-50"
          >
            {isSearching ? <Loader2 size={16} className="animate-spin" /> : "Search"}
          </button>
        </form>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {developers.map((user: any) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      {/* Empty State */}
      {!isSearching && developers.length === 0 && (
        <div className="py-20 text-center border border-dashed border-border-default rounded-3xl bg-bg-secondary/50">
          <h3 className="text-xl font-medium text-text-primary mb-2">
            No developers found
          </h3>
          <p className="text-text-secondary max-w-sm mx-auto">
            {searchQuery 
              ? `We couldn't find anyone matching "${searchQuery}".` 
              : "It looks like there are no active developers on the platform yet."}
          </p>
        </div>
      )}

      {/* Load More */}
      {hasNextPage && (
        <div className="flex justify-center pt-8">
          <Button 
            variant="secondary" 
            onClick={loadMore} 
            disabled={isLoading}
            leftIcon={isLoading ? <Loader2 size={16} className="animate-spin" /> : undefined}
          >
            {isLoading ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}
    </div>
  );
}
