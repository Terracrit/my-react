import React from "react";

const TodoItem = ({ todo, onToggleComplete, onDelete, onEdit }) => {
  return (
    <li className="todo-item">
      <input
        type="checkbox"
        checked={todo.checked}
        onChange={() => onToggleComplete(todo.id)}
      />
      <span className={todo.checked ? "completed" : ""}>{todo.title}</span>
      <button onClick={() => onEdit(todo)}>Редагувати</button>
      <button onClick={() => onDelete(todo.id)}>Видалити</button>
    </li>
  );
};

export default TodoItem;
