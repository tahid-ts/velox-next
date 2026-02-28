import React from "react";
import gsap from "gsap";

interface DataTableSkeletonProps {
  enableSearch?: boolean;
  enablePagination?: boolean;
  rows?: number;
  columns?: number;
}

export const DataTableSkeleton: React.FC<DataTableSkeletonProps> = ({
  enableSearch = false,
  enablePagination = false,
  rows = 5,
  columns = 4,
}) => {
  const headerRef = React.useRef<HTMLDivElement>(null);
  const tableHeaderRef = React.useRef<HTMLTableSectionElement>(null);
  const rowRefs = React.useRef<HTMLTableRowElement[]>([]);

  React.useEffect(() => {
    gsap.set(headerRef.current, { opacity: 0, y: -10 });
    gsap.set(tableHeaderRef.current, { opacity: 0, y: 20 });
    gsap.set(rowRefs.current, { opacity: 0, x: -20 });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.to(headerRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power4.out",
    });
    tl.to(tableHeaderRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4");
    tl.to(
      rowRefs.current,
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: { each: 0.01, ease: "power2.out" },
      },
      "-=0.3",
    );
  }, []);

  return (
    <div className="w-full">
      {/* Search Bar Skeleton */}
      {enableSearch && (
        <div className="mb-6 relative">
          <div className="w-full h-12 bg-gray-100 rounded-xl animate-pulse" />
        </div>
      )}

      {/* Table Header Skeleton */}
      <div className="w-full bg-gray-100 label-sm px-6 py-4.25 rounded-t-xl animate-pulse" />

      {/* Table Skeleton */}
      <div className="overflow-x-auto overflow-y-hidden rounded-b-xl text-center">
        <table className="w-full text-center border-collapse">
          <thead ref={tableHeaderRef} className="bg-white">
            <tr>
              {Array.from({ length: columns }).map((_, i) => (
                <th
                  key={i}
                  className="px-6 py-4 text-center label-md text-black tracking-wide border border-border border-t-0"
                >
                  <div className="w-full h-6 bg-gray-100 rounded animate-pulse" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <tr
                key={rowIndex}
                ref={(el) => {
                  if (el) rowRefs.current[rowIndex] = el;
                }}
                className="hover:bg-gray-50 transition-colors text-center"
              >
                {Array.from({ length: columns }).map((_, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-6 py-2.5 paragraph-md border border-border text-center"
                  >
                    <div className="w-full h-4 bg-gray-100 rounded animate-pulse" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Skeleton */}
      {enablePagination && (
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="w-20 h-8 bg-gray-100 rounded-lg animate-pulse" />
            <div className="w-40 h-6 bg-gray-100 rounded animate-pulse ml-4" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-16 h-8 bg-gray-100 rounded-lg animate-pulse" />
            <div className="w-8 h-8 bg-gray-100 rounded-lg animate-pulse" />
            <div className="w-20 h-6 bg-gray-100 rounded animate-pulse" />
            <div className="w-8 h-8 bg-gray-100 rounded-lg animate-pulse" />
            <div className="w-16 h-8 bg-gray-100 rounded-lg animate-pulse" />
          </div>
        </div>
      )}
    </div>
  );
};
