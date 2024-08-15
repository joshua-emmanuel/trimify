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

export function CardSkeleton() {
  return (
    <div
      role="status"
      className="flex items-center justify-center h-56 max-w-sm bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700"
    >
      {/* <svg
        className="w-10 h-10 text-gray-200 dark:text-gray-600"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 16 20"
      >
        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
        <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z" />
      </svg> */}
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export function LinkCardsSkeleton() {
  return (
    <>
      <LinkCardSkeleton />
      <LinkCardSkeleton />
      <LinkCardSkeleton />
      <LinkCardSkeleton />
    </>
  );
}
