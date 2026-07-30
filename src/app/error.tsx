"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui";
import { AlertTriangle } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service like Sentry in production
    console.error("Unhandled runtime error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="h-20 w-20 rounded-full bg-danger/10 flex items-center justify-center mb-6 border border-danger/20">
        <AlertTriangle className="text-danger" size={32} />
      </div>
      
      <h2 className="text-2xl font-bold mb-3 text-text-primary">
        Something went wrong!
      </h2>
      
      <p className="text-text-secondary max-w-md mx-auto mb-8">
        We encountered an unexpected error while trying to process your request. 
        {error.message && (
          <span className="block mt-2 text-xs font-mono bg-bg-secondary p-2 rounded border border-border-default overflow-hidden text-ellipsis whitespace-nowrap">
            {error.message}
          </span>
        )}
      </p>
      
      <div className="flex items-center gap-4">
        <Button variant="primary" onClick={() => reset()}>
          Try again
        </Button>
        <Button variant="outline" onClick={() => window.location.href = "/"}>
          Return Home
        </Button>
      </div>
    </div>
  );
}
