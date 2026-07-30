import { Telescope } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <div className="h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center animate-pulse border border-accent/20 mb-4">
        <Telescope className="text-accent animate-bounce" size={28} />
      </div>
      <p className="text-sm font-medium text-text-secondary animate-pulse">
        Loading...
      </p>
    </div>
  );
}
