const KEY = "todos_v1";

export function loadTodos() {
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveTodos(todos) {
  localStorage.setItem(KEY, JSON.stringify(todos));
}