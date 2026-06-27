export function sortTodos(todos, sortType) {
  const statusOrder = {
    todo: 0,
    doing: 1,
    done: 2,
  };

  const priorityOrder = {
    high: 0,
    medium: 1,
    low: 2,
  };

  return [...todos].sort((a, b) => {
    // ① 最優先：status（完了は必ず下）
    const statusDiff = statusOrder[a.status] - statusOrder[b.status];
    if (statusDiff !== 0) return statusDiff;

    // ② priority
    if (sortType === "priority") {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }

    // ③ dueDate
    if (sortType === "dueDate") {
      return new Date(a.dueDate || 0) - new Date(b.dueDate || 0);
    }

    // ④ created
    return a.createdAt - b.createdAt;
  });
}