import Link from "next/link";
import { Card, CardTitle } from "@/components/ui";
import { Users, FolderGit2 } from "lucide-react";

export function UserCard({ user }: { user: any }) {
  return (
    <Link href={user.username ? `/${user.username}` : "#"} className="block h-full">
      <Card hover className="group h-full flex flex-col items-center text-center p-6">
        <div className="h-20 w-20 rounded-full border border-border-default bg-bg-secondary flex items-center justify-center text-2xl font-bold uppercase overflow-hidden mb-4 shadow-sm">
          {(user.avatar || user.image) ? (
            <img src={user.avatar || user.image} alt="Avatar" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
          ) : (
            user.name.slice(0, 2)
          )}
        </div>
        
        <CardTitle className="text-lg group-hover:text-accent transition-colors">
          {user.name}
        </CardTitle>
        <p className="text-sm text-text-tertiary mb-4">
          @{user.username || "anonymous"}
        </p>

        <p className="text-sm text-text-secondary line-clamp-2 mb-6">
          {user.bio || "This developer hasn't added a bio yet."}
        </p>

        <div className="flex items-center gap-6 mt-auto pt-4 border-t border-border-default w-full justify-center">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-text-primary font-medium">
              <Users size={16} className="text-accent" />
              <span>{user._count?.followers || 0}</span>
            </div>
            <span className="text-[10px] text-text-tertiary uppercase tracking-wider">Followers</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-text-primary font-medium">
              <FolderGit2 size={16} className="text-accent" />
              <span>{user._count?.projects || 0}</span>
            </div>
            <span className="text-[10px] text-text-tertiary uppercase tracking-wider">Projects</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
