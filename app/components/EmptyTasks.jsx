import { HiOutlineClipboardList } from "react-icons/hi";

export default function EmptyTasks() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <HiOutlineClipboardList size={120} className="text-gray-300 mb-6" />
      <h2 className="text-2xl font-semibold text-gray-700">
        No tasks found
      </h2>
      <p className="text-gray-500 mt-2">
        Start by creating your first task
      </p>
    </div>
  );
}
