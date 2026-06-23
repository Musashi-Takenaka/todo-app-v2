import { useState, useEffect } from "react";

export default function TodoItem({ todo, onToggle, onDelete, onEdit, editingId, setEditingId }) {
  const [editText, setEditText] = useState(todo.text);
  const isEditing = editingId === todo.id;
  const [editPriority, setEditPriority] = useState(todo.priority);
  const [editDueDate, setEditDueDate] = useState(todo.dueDate || "");

  const statusLabel = {
    todo: "未着手",
    doing: "作業中",
    done: "完了"
  };

  const priorityLabel = {
    high: "高",
    medium: "中",
    low: "低"
  };

  useEffect(() => {
    if (isEditing) {
      setEditText(todo.text);
      setEditPriority(todo.priority);
      setEditDueDate(todo.dueDate || "");
    }
  }, [isEditing, todo.text, todo.priority, todo.dueDate]);

  return (
    <li className={`todo-item priority-${todo.priority} ${todo.status}`}>
      <div className="todo-header">
        <div className="todo-text">
          <span
            className={`status-badge ${todo.status}`}
            onClick={() => onToggle(todo.id)}
          >
            {statusLabel[todo.status]}
          </span>

          {/* 編集モード */}
          {isEditing ? (
            <>
              <input
                className="edit-input text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />

              <select
                className="edit-select"
                value={editPriority}
                onChange={(e) => setEditPriority(e.target.value)}
              >
                <option value="high">優先度 高</option>
                <option value="medium">優先度 中</option>
                <option value="low">優先度 低 </option>
              </select>

              <input
                className="edit-input date"
                type="date"
                value={editDueDate}
                onChange={(e) => setEditDueDate(e.target.value)}
              />
            </>
          ) : (
            <span
              className="todo-title"
              onClick={() => onToggle(todo.id)}
            >
              {todo.text}
            </span>
          )}
        </div>

        <div className="todo-actions">
          {/* 保存時 */}
          {isEditing ? (
            <button
              className="icon-btn save-btn"
              onClick={() => {
                onEdit({
                  id: todo.id,
                  text: editText,
                  dueDate: editDueDate,
                  priority: editPriority,
                });
                setEditingId(null);
              }}
            >
              💾
            </button>
          ) : (
            <button
              className="icon-btn save-btn"
              onClick={() => setEditingId(todo.id)}
            >
              ✏️
            </button>
          )}

          <button
            className="icon-btn delete-btn"
            onClick={() => onDelete(todo.id)}
          >
            🗑
          </button>
        </div> 
      </div>


      <div className="todo-meta">
        <span className={`priority-badge priority-${todo.priority}`}>
          <span className="priority-icon">🚩</span>
          <span className="priority-label">
            {priorityLabel[todo.priority]}
          </span>
        </span>

        <span className="meta-pill">
         📅 {todo.dueDate || "なし"}
        </span>
      </div>
    </li>
  );
}