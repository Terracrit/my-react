import React, { useState } from "react";

export const InputForm = ({ onAddTodo, error }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      onAddTodo({
        title: value,
        description: "",
        checked: false,
        creationDate: new Date().toISOString(),
      });
      setValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Додати нове завдання"
      />
      <button type="submit">Додати</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};
