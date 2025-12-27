export function getTasksByWeek(tasks) {
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return Array.from({ length: 7 }, (_, i) => {
    const currentDay = new Date(startOfWeek);
    currentDay.setDate(startOfWeek.getDate() + i);

    const count = tasks.filter((task) => {
      const taskStart = new Date(task.start_date);
      const taskEnd = new Date(task.end_date);

      return taskStart <= currentDay && taskEnd >= currentDay;
    }).length;

    return {
      day: weekDays[i],
      tasks: count,
    };
  });
}
