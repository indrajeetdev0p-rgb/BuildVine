"use client";

import { useState } from "react";
import { UserPlus, UserCheck } from "lucide-react";
import { toggleFollow } from "@/lib/actions/social";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

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
    
    // Optimistic update
    setIsFollowing(!isFollowing);

    const res = await toggleFollow(targetUserId, window.location.pathname);
    
    if (res.error) {
      // Revert on error
      setIsFollowing(isFollowing);
      if (res.error.includes("Unauthorized")) {
        router.push("/login");
      } else {
        alert(res.error);
      }
    }
    
    setIsPending(false);
  };

  return (
    <Button 
      onClick={handleFollow} 
      disabled={isPending}
      variant={isFollowing ? "outline" : "accent"}
      size="sm"
      className="gap-2"
    >
      {isFollowing ? (
        <>
          <UserCheck size={16} /> Following
        </>
      ) : (
        <>
          <UserPlus size={16} /> Follow
        </>
      )}
    </Button>
  );
}
