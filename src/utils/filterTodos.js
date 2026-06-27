export function filterTodos(todos, filter, searchText) {
  return todos.filter(todo => {
    const matchFilter =
      filter === "all" || todo.status === filter;

    const matchSearch =
      todo.text.toLowerCase().includes(searchText.toLowerCase());

    return matchFilter && matchSearch;
  });
}