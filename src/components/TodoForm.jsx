import { useState } from "react";

export default function TodoForm({ onAdd }) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");

  function handleSubmit() {
    if (!text.trim()) return;

    onAdd({
      text,
      priority,
      dueDate,
    });

    setText("");
    setDueDate("");
  }

  return (
    <form
      className="todo-form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="todo..."
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="high">優先度 高</option>
        <option value="medium">優先度 中</option>
        <option value="low">優先度 低</option>
      </select>

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <button type="submit" className="btn btn-primary">
        追加
      </button>
    </form>
  );
}