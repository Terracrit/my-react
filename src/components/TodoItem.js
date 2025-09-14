import React from "react";
import { Link } from "react-router-dom";

const TodoItem = ({ todo, onToggleComplete, onDelete, onEdit }) => {
  return (
    <li className="todo-item">
      <input
        type="checkbox"
        checked={todo.checked}
        onChange={() => onToggleComplete(todo.id)}
      />
      <span className={todo.checked ? "completed" : ""}>{todo.title}</span>
      <Link to={`/todo-list/${todo.id}`}>Редагувати</Link>
      <button onClick={() => onDelete(todo.id)}>Видалити</button>
    </li>
  );
};

export default TodoItem;
