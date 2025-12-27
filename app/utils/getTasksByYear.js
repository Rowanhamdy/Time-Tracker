export function getTasksByYear(tasks) {
  const today = new Date();
  const year = today.getFullYear();

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const result = months.map((monthName, index) => {
    const startOfMonth = new Date(year, index, 1);
    const endOfMonth = new Date(year, index + 1, 0);

    const count = tasks.filter((task) => {
      const taskStart = new Date(task.start_date);
      const taskEnd = new Date(task.end_date);

      return (
        taskStart <= endOfMonth &&
        taskEnd >= startOfMonth
      );
    }).length;

    return {
      month: monthName,
      tasks: count,
    };
  });

  return result;
}
