import React from "react";
import TodoItem from "./TodoItem";

const ToDoList = ({ todos, onToggleComplete, onDelete, onEdit }) => {
  return (
    <ul className="todos-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
};

export default ToDoList;
