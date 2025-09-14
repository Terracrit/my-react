import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const TodoForm = ({ todos, handleSaveTodo }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const safeTodos = todos || [];
  const todo = safeTodos.find((t) => t.id.toString() === id);

  const [title, setTitle] = useState(todo ? todo.title : "");
  const [description, setDescription] = useState(todo ? todo.description : "");
  const [checked, setChecked] = useState(todo ? todo.checked : false);

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description);
      setChecked(todo.checked);
    } else {
      setTitle("");
      setDescription("");
      setChecked(false);
    }
  }, [todo]);

  const handleSave = (e) => {
    e.preventDefault();
    handleSaveTodo({
      ...(todo || { id: Date.now() }),
      title,
      description,
      checked,
      creationDate: todo ? todo.creationDate : new Date().toISOString(),
    });
    navigate("/todo-list");
  };

  return (
    <form onSubmit={handleSave}>
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
      <button type="button" onClick={() => navigate("/todo-list")}>
        Скасувати
      </button>
    </form>
  );
};

export default TodoForm;
