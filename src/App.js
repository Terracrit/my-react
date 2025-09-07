import React, { useState } from "react";
import axios from "axios";
import { useGet } from "./hooks/useGet.js";
import { useTodoFilters } from "./hooks/useTodoFilters.js";
import { InputForm } from "./components/InputForm.js";
import { Controls } from "./components/Controls.js";
import ToDoList from "./components/ToDoList.js";
import TodoForm from "./components/TodoForm.js";
import { Loader } from "./components/Loader.js";
import { ErrorMessage } from "./components/ErrorMessage.js";
import { AddButton } from "./components/AddButton.js";
import "./App.css";

const BASE_URL = "http://localhost:3030/";

function App() {
  const { data: todos, setData: setTodos, isLoading, error } = useGet("todos");
  const [editingTodo, setEditingTodo] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const {
    searchQuery,
    setSearchQuery,
    filter,
    setFilter,
    filteredAndSearchedTodos,
  } = useTodoFilters(todos || []);

  const handleAddTodo = async (todo) => {
    try {
      const response = await axios.post(`${BASE_URL}todos`, todo);
      setTodos([...todos, response.data]);
      setShowForm(false);
    } catch (err) {
      console.error("Помилка при додаванні:", err);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`${BASE_URL}todos/${id}`);
      setTodos(todos.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Помилка при видаленні:", err);
    }
  };

  const handleEditTodo = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}todos/${id}`);
      setEditingTodo(response.data);
      setShowForm(true);
    } catch (err) {
      console.error("Помилка при редагуванні:", err);
    }
  };

  const handleSaveTodo = async (updatedTodo) => {
    try {
      await axios.put(`${BASE_URL}todos/${updatedTodo.id}`, updatedTodo);
      setTodos(todos.map((t) => (t.id === updatedTodo.id ? updatedTodo : t)));
      setEditingTodo(null);
      setShowForm(false);
    } catch (err) {
      console.error("Помилка при збереженні:", err);
    }
  };

  const handleToggleComplete = async (id) => {
    const todoToUpdate = todos.find((t) => t.id === id);
    if (!todoToUpdate) return;
    const updatedTodo = { ...todoToUpdate, checked: !todoToUpdate.checked };
    await axios.put(`${BASE_URL}todos/${id}`, updatedTodo);
    setTodos(todos.map((t) => (t.id === id ? updatedTodo : t)));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Список завдань</h1>
        {isLoading && <Loader />}
        {error && <ErrorMessage message={error} />}

        {!isLoading && todos && todos.length === 0 && !showForm && (
          <>
            <p>Наразі у вас немає ще завдань</p>
            <AddButton onClick={() => setShowForm(true)} />
          </>
        )}

        {showForm && (
          <TodoForm
            todo={editingTodo}
            onSave={editingTodo ? handleSaveTodo : handleAddTodo}
            onCancel={() => {
              setShowForm(false);
              setEditingTodo(null);
            }}
          />
        )}

        {todos && todos.length > 0 && (
          <>
            <InputForm onAddTodo={handleAddTodo} error={null} />
            <Controls
              search={searchQuery}
              setSearch={setSearchQuery}
              filter={filter}
              setFilter={setFilter}
              filteredCount={filteredAndSearchedTodos.length}
            />
            <ToDoList
              todos={filteredAndSearchedTodos}
              onDelete={handleDeleteTodo}
              onToggleComplete={handleToggleComplete}
              onEdit={handleEditTodo}
            />
          </>
        )}
      </header>
    </div>
  );
}

export default App;
