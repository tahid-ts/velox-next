import DashboardCardSkeleton from "./DashboardCardSkeleton";

const DashboardCardSkeletonGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      {Array.from({ length: 4 }).map((_, i) => (
        <DashboardCardSkeleton key={i} />
      ))}
    </div>
  );
};

export default DashboardCardSkeletonGrid;
