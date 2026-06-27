import { useState, useEffect, useMemo } from "react";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import { filterTodos } from "./utils/filterTodos";
import { sortTodos } from "./utils/sortTodos";
import { loadTodos, saveTodos } from "./utils/storage/todoStorage";

export default function App() {
  const [todos, setTodos] = useState(() => loadTodos());
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("created");
  const [editingId, setEditingId] = useState(null);
  const [searchText, setSearchText] = useState("");

  // 自動保存
  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  // 派生データ
  const visibleTodos = useMemo(() => {
    const filtered = filterTodos(todos, filter, searchText);
    return sortTodos(filtered, sort);
  }, [todos, filter, sort, searchText]);

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

    setTodos((prev) => [...prev, newTodo]);
  }

  function toggleStatus(id) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, status: nextStatus(todo.status) } : todo
      )
    );
  }

  function deleteTodo(id) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  function editTodo({ id, text, priority, dueDate }) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, text, priority, dueDate }
          : todo
      )
    );
  }

  return (
    <div className="app">

      {/* ================= HEADER ================= */}
      <header className="app-header">
        <h1>TODOリスト</h1>

        <div className="status-info">
          {filter !== "all" && (
            <span className="status-chip">ステータス: {filter}</span>
          )}
          {searchText && (
            <span className="status-chip">検索: {searchText}</span>
          )}
          <span className="status-count">
            {visibleTodos.length}件
          </span>
        </div>
      </header>

      {/* ================= INPUT ================= */}
      <TodoForm onAdd={addTodo} />

      {/* ================= CONTROLS ================= */}
      <div className="controls-card">

        <div className="filters">

          <label className="control-group">
            <span>ステータス</span>
            <select onChange={(e) => setFilter(e.target.value)}>
              <option value="all">すべて</option>
              <option value="todo">未着手</option>
              <option value="doing">作業中</option>
              <option value="done">完了</option>
            </select>
          </label>

          <label className="control-group">
            <span>並び替え</span>
            <select onChange={(e) => setSort(e.target.value)}>
              <option value="created">作成順</option>
              <option value="priority">優先順</option>
              <option value="dueDate">期限順</option>
            </select>
          </label>

          <div className="search-group">
            <span className="search-label">検索</span>
            <input
              type="text"
              className="search-bar"
              placeholder="タスクを検索..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

        </div>
      </div>

      {/* ================= LIST ================= */}
      {visibleTodos.length === 0 ? (
        <div className="empty-state">
          <div className="empty-title">タスクが見つかりません</div>
          <div className="empty-sub">
            条件を変更してもう一度試してください
          </div>
        </div>
      ) : (
        <TodoList
          todos={visibleTodos}
          onToggle={toggleStatus}
          onDelete={deleteTodo}
          onEdit={editTodo}
          editingId={editingId}
          setEditingId={setEditingId}
        />
      )}

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