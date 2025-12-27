import ChartSkeleton from "./ChartSkeleton";

export default function DashboardSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ChartSkeleton />
      <ChartSkeleton />
      <ChartSkeleton />
      <ChartSkeleton />
    </div>
  );
}
