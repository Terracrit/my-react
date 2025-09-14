import React, { useState } from "react";

export const InputForm = ({ onAddTodo }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTodo({
        title: title,
        checked: false,
        creationDate: new Date().toISOString(),
      });
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Нове завдання..."
        required
      />
      <button type="submit">Додати</button>
    </form>
  );
};
