export function sortTodos(todos, sortType) {
  const copy = [...todos];

  switch (sortType) {
    case "priority":
      return copy.sort((a, b) => a.priority.localeCompare(b.priority));
    case "dueDate":
      return copy.sort((a, b) => a.dueDate - b.dueDate);
    default:
      return copy.sort((a, b) => a.createdAt - b.createdAt);
  }
}