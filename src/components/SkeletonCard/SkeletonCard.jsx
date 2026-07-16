export default function SkeletonCard() {
  return (
    <div className="rounded-2xl card-surface overflow-hidden flex flex-col" aria-hidden="true">
      <div className="aspect-[4/3] skeleton" />
      <div className="p-4 flex items-center justify-between gap-2">
        <div className="flex-1">
          <div className="h-3.5 w-2/3 rounded skeleton mb-2" />
          <div className="h-2.5 w-1/3 rounded skeleton" />
        </div>
        <div className="w-8 h-8 rounded-full skeleton shrink-0" />
      </div>
    </div>
  )
}
