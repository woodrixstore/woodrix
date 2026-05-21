export default function ShopLoading() {
  return (
    <div className="container py-12">
      <div className="mb-8">
        <div className="h-3 w-20 skeleton rounded mb-3" />
        <div className="h-10 w-48 skeleton rounded mb-2" />
        <div className="h-4 w-36 skeleton rounded" />
      </div>
      <div className="grid lg:grid-cols-[260px_1fr] gap-12">
        {/* Sidebar skeleton */}
        <div className="space-y-6 hidden lg:block">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-3">
              <div className="h-4 w-24 skeleton rounded" />
              {[1, 2, 3].map((j) => (
                <div key={j} className="h-4 w-32 skeleton rounded" />
              ))}
            </div>
          ))}
        </div>
        {/* Grid skeleton */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="aspect-square skeleton rounded-2xl" />
              <div className="h-4 w-3/4 skeleton rounded" />
              <div className="h-4 w-1/3 skeleton rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
