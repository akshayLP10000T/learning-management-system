import { Skeleton } from "../ui/skeleton";

const CourseCard = () => {
  return (
    <div className="w-full rounded-md overflow-hidden dark:bg-gray-800 bg-gray-100 shadow-sm hover:shadow-xl transition-shadow">
      <Skeleton className="w-full h-64" />
      <div className="p-3">
        <Skeleton className="w-3/4 h-6 mb-2" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <Skeleton className="w-12 h-12 rounded-full" />
            <Skeleton className="w-1/2 h-5" />
          </div>
          <Skeleton className="w-16 h-6 rounded-md" />
        </div>
        <Skeleton className="w-1/4 h-6 mt-3" />
      </div>
    </div>
  );
};

export default CourseCard;
