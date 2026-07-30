"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { toggleUpvote } from "@/lib/actions/social";
import { useRouter } from "next/navigation";

interface UpvoteButtonProps {
  projectId: string;
  initialUpvotes: number;
  isInitiallyUpvoted: boolean;
}

export function UpvoteButton({ projectId, initialUpvotes, isInitiallyUpvoted }: UpvoteButtonProps) {
  const [isUpvoted, setIsUpvoted] = useState(isInitiallyUpvoted);
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleUpvote = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating if this button is inside a Link
    e.stopPropagation(); // Prevent opening modal if this button is inside a Quick View wrapper
    
    if (isPending) return;
    setIsPending(true);
    
    // Optimistic UI update
    setIsUpvoted(!isUpvoted);
    setUpvotes(prev => isUpvoted ? prev - 1 : prev + 1);

    const res = await toggleUpvote(projectId);
    
    if (res.error) {
      // Revert on error
      setIsUpvoted(isUpvoted);
      setUpvotes(initialUpvotes);
      
      if (res.error.includes("logged in")) {
        router.push("/login");
      }
    }
    
    setIsPending(false);
  };

  return (
    <button
      onClick={handleUpvote}
      disabled={isPending}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border ${
        isUpvoted 
          ? "bg-accent/10 border-accent/20 text-accent" 
          : "bg-bg-tertiary border-border-default text-text-secondary hover:bg-bg-hover hover:text-text-primary"
      }`}
    >
      <Heart 
        size={14} 
        className={`transition-all duration-300 ${isUpvoted ? "fill-accent text-accent scale-110" : "text-text-secondary scale-100"}`} 
      />
      <span>{upvotes}</span>
    </button>
  );
}
