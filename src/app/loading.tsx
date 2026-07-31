

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <div className="h-16 w-16 rounded-2xl bg-bg-secondary flex items-center justify-center animate-pulse border border-border-default mb-4 shadow-lg overflow-hidden relative">
        <img src="/logo.png" alt="BuildVine" className="h-12 w-12 object-contain animate-bounce" />
      </div>
      <p className="text-sm font-medium text-text-secondary animate-pulse">
        Loading...
      </p>
    </div>
  );
}
