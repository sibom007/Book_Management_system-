import { Skeleton } from "@/components/ui/skeleton";

const BookCardSkeleton = () => {
  return (
    <div className="border rounded-lg shadow-lg p-4 w-full max-w-lg animate-pulse">
      {/* Book Thumbnail Placeholder */}
      <Skeleton className="w-full h-40 rounded-md bg-gray-500" />

      {/* Title Placeholder */}
      <Skeleton className="w-3/4 h-6 mt-2 rounded-md bg-gray-500" />

      {/* Class & Chapter Placeholder */}
      <div className="flex justify-between mt-1">
        <Skeleton className="w-1/4 h-5 rounded-md bg-gray-500" />
        <Skeleton className="w-1/4 h-5 rounded-md bg-gray-500" />
      </div>

      {/* Button Placeholder */}
      <Skeleton className="w-1/2 h-10 mt-4 rounded-md bg-gray-500" />
    </div>
  );
};

export default BookCardSkeleton;
