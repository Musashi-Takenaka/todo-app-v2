import { useState, useMemo } from "react";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import { filterTodos } from "./utils/filterTodos";
import { sortTodos } from "./utils/sortTodos";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("created");

  // 追加
  function addTodo({ text, priority, dueDate }) {
  const newTodo = {
      id: Date.now(),
      text,
      status: "todo",
      priority,
      dueDate,
      createdAt: Date.now(),
  };

    setTodos(prev => [...prev, newTodo]);
  }

  // 状態変更
  function toggleStatus(id) {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? { ...todo, status: nextStatus(todo.status) }
          : todo
      )
    );
  }

  function deleteTodo(id) {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }

  // 👇 派生データ（ここが重要）
  const visibleTodos = useMemo(() => {
    const filtered = filterTodos(todos, filter);
    return sortTodos(filtered, sort);
  }, [todos, filter, sort]);

  return (
    <div className="app">
      <h1>TODO</h1>

      <div className="controls">
        <TodoForm onAdd={addTodo} />

        <div className="filters">
          <select onChange={(e) => setFilter(e.target.value)}>
            <option value="all">all</option>
            <option value="todo">todo</option>
            <option value="doing">doing</option>
            <option value="done">done</option>
          </select>

          <select onChange={(e) => setSort(e.target.value)}>
            <option value="created">created</option>
            <option value="priority">priority</option>
            <option value="dueDate">dueDate</option>
          </select>
        </div>
      </div>

      <TodoList
        todos={visibleTodos}
        onToggle={toggleStatus}
        onDelete={deleteTodo}
      />
    </div>
  );
}

// 状態遷移
function nextStatus(status) {
  const map = {
    todo: "doing",
    doing: "done",
    done: "todo",
  };
  return map[status];
}