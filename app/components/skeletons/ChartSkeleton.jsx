export default function ChartSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow p-6 animate-pulse">
      <div className="h-5 w-1/3 bg-gray-200 rounded mb-4" />
      <div className="h-{[260px]} bg-gray-200 rounded" />
    </div>
  );
}