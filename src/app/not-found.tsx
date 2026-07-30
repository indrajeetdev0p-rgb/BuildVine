import Link from "next/link";
import { Button } from "@/components/ui";
import { Telescope } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="h-24 w-24 rounded-full bg-accent/10 flex items-center justify-center mb-8 border border-accent/20">
        <Telescope className="text-accent" size={40} />
      </div>
      
      <h1 className="text-5xl font-extrabold tracking-tight font-heading mb-4 text-text-primary">
        404
      </h1>
      
      <h2 className="text-2xl font-semibold mb-3 text-text-primary">
        Page Not Found
      </h2>
      
      <p className="text-text-secondary max-w-md mx-auto mb-8">
        We couldn't find the page you were looking for. It might have been moved, deleted, or never existed in the first place.
      </p>
      
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="primary">Return Home</Button>
        </Link>
        <Link href="/explore">
          <Button variant="outline">Explore Projects</Button>
        </Link>
      </div>
    </div>
  );
}
