"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import { toggleFollow } from "@/lib/actions/social";
import { useRouter } from "next/navigation";

interface FollowButtonProps {
  targetUserId: string;
  isInitiallyFollowing: boolean;
}

export function FollowButton({ targetUserId, isInitiallyFollowing }: FollowButtonProps) {
  const [isFollowing, setIsFollowing] = useState(isInitiallyFollowing);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleFollow = async () => {
    if (isPending) return;
    setIsPending(true);
    
    // Optimistic UI update
    setIsFollowing(!isFollowing);

    const res = await toggleFollow(targetUserId);
    
    if (res.error) {
      // Revert on error
      setIsFollowing(isFollowing);
      
      if (res.error.includes("logged in")) {
        router.push("/login");
      }
    }
    
    setIsPending(false);
  };

  return (
    <Button 
      variant={isFollowing ? "secondary" : "gradient"} 
      size="sm"
      onClick={handleFollow}
      disabled={isPending}
    >
      {isFollowing ? "Following" : "Follow"}
    </Button>
  );
}
