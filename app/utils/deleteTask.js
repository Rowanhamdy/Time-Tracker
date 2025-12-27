import { supabase } from "@/lib/db";

export const deleteTask = async (taskId) => {
  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", taskId);

  if (error) throw error;
  return true;
};