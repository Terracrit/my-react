import React, { useState } from "react";

const TodoForm = ({ todo, onSave, onCancel }) => {
  const [title, setTitle] = useState(todo ? todo.title : "");
  const [description, setDescription] = useState(todo ? todo.description : "");
  const [checked, setChecked] = useState(todo ? todo.checked : false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave({
          ...todo,
          title,
          description,
          checked,
          creationDate: todo ? todo.creationDate : new Date().toISOString(),
        });
      }}
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Назва todo"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Опис (необов'язково)"
      />
      <label>
        Виконано
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
      </label>
      <button type="submit">{todo ? "Зберегти" : "Додати"}</button>
      <button type="button" onClick={onCancel}>
        Скасувати
      </button>
    </form>
  );
};

export default TodoForm;
