const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function LinkCardSkeleton() {
  return (
    <div
      role="status"
      className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 animate-shimmer p-4 shadow-sm`}
    >
      <div className="flex flex-col gap-2 py-4">
        <div className="ml-1 h-4 w-24 rounded-md bg-gray-200 text-sm font-medium" />
        <div className="ml-1 h-6 w-[11rem] rounded-md bg-gray-200 text-sm font-medium" />
        <div className="ml-1 h-4 w-32 rounded-md bg-gray-200 text-sm font-medium" />
      </div>
      <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-4">
        <div className="ml-1 h-4 w-40 rounded-md bg-gray-200 text-sm font-medium" />
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export function LinkAnalyticsCardSkeleton() {
  return (
    <div
      role="status"
      className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 animate-shimmer px-4 py-6 shadow-sm`}
    >
      <div className="h-4 w-28 rounded-md bg-gray-200 mb-4" />
      <div className="rounded-lg bg-gray-200 w-30 h-4"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div
      role="status"
      className="flex items-center justify-center h-56 max-w-sm bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export function QRCodeSkeleton() {
  return (
    <div
      role="status"
      className="flex items-center justify-center h-40 w-40 bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700 ml-2"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export function QRCodeTextSkeleton() {
  return (
    <div role="status" className="space-y-2.5 animate-pulse max-w-lg ml-2">
      <div className="flex items-center w-full">
        <div className="h-[2.25rem] bg-gray-200 rounded-md dark:bg-gray-700 w-[15rem]"></div>
      </div>
      <div className="flex items-center w-full">
        <div className="h-[2.25rem] bg-gray-200 rounded-md dark:bg-gray-700 w-[12rem]"></div>
      </div>
      <div className="flex items-center w-full max-w-[480px]">
        <div className="h-4 bg-gray-200 rounded-md dark:bg-gray-700 w-full"></div>
      </div>
      <div className="flex items-center w-full max-w-[360px]">
        <div className="h-10 bg-gray-300 rounded-md dark:bg-gray-600 w-full"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export function LinkCardSkeletons() {
  return (
    <>
      <LinkCardSkeleton />
      <LinkCardSkeleton />
      <LinkCardSkeleton />
      <LinkCardSkeleton />
    </>
  );
}

export function LinkAnalyticsCardSkeletons() {
  return (
    <>
      <LinkAnalyticsCardSkeleton />
      <LinkAnalyticsCardSkeleton />
      <LinkAnalyticsCardSkeleton />
      <LinkAnalyticsCardSkeleton />
    </>
  );
}
