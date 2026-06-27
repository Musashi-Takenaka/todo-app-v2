export default function TodoItem({ todo, onToggle, onDelete }) {
  const statusLabel = {
    todo: "未着手",
    doing: "作業中",
    done: "完了"
  };

  return (
    <li className={`todo-item priority-${todo.priority}`}>
      <div className="todo-text" onClick={() => onToggle(todo.id)}>
        [{statusLabel[todo.status]}] {todo.text}
      </div>

      <div className="todo-meta">
        <small>
          優先度: {todo.priority} / 期限: {todo.dueDate || "なし"}
        </small>
      </div>

      <div className="actions">
        <button onClick={() => onDelete(todo.id)}>
          delete
        </button>
      </div>
    </li>
  );
}