export function getTasksByMonth(tasks) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();

  return Array.from({ length: daysInMonth }, (_, i) => {
    const currentDay = new Date(year, month, i + 1);

    const count = tasks.filter((task) => {
      const taskStart = new Date(task.start_date);
      const taskEnd = new Date(task.end_date);

      return taskStart <= currentDay && taskEnd >= currentDay;
    }).length;

    return {
      date: currentDay.getDate(), 
      tasks: count,
    };
  });
}
