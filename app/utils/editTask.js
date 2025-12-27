import { supabase } from "@/lib/db";

export const editTask = async (taskId, updatedData) => {
  const { error } = await supabase
    .from("tasks")
    .update({
      title: updatedData.title,
      completed: updatedData.completed,
      start_date: updatedData.startDate,
      end_date: updatedData.endDate
    })
    .eq("id", taskId);

  if (error) throw error;
};