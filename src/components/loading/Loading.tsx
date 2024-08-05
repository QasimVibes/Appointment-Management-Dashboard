export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex gap-2">
        <div className="w-8 h-8 rounded-full animate-pulse bg-quaternary"></div>
        <div className="w-8 h-8 rounded-full animate-pulse bg-quaternary"></div>
        <div className="w-8 h-8 rounded-full animate-pulse bg-quaternary"></div>
      </div>
    </div>
  );
}
