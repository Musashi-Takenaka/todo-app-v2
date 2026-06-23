export function filterTodos(todos, filter) {
  if (filter === "all") return todos;
  return todos.filter(t => t.status === filter);
}