import React, { useState } from "react";
import axios from "axios";
import { useGet } from "./hooks/useGet.js";
import { useTodoFilters } from "./hooks/useTodoFilters.js";
import { Loader } from "./components/Loader.js";
import { ErrorMessage } from "./components/ErrorMessage.js";
import "./App.css";
import { RoutesElement } from "./components/RoutesElement.js";

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
      if (updatedTodo.id) {
        await axios.put(`${BASE_URL}todos/${updatedTodo.id}`, updatedTodo);
        setTodos(todos.map((t) => (t.id === updatedTodo.id ? updatedTodo : t)));
      } else {
        const response = await axios.post(`${BASE_URL}todos`, updatedTodo);
        setTodos([...todos, response.data]);
      }
      setEditingTodo(null);
      setShowForm(false);
    } catch (err) {
      console.error("Помилка при збереженні:", err);
    }
    if (!handleSaveTodo) return;
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

        <RoutesElement
          todos={todos}
          handleSaveTodo={handleSaveTodo}
          onDelete={handleDeleteTodo}
          onToggleComplete={handleToggleComplete}
          handleAddTodo={handleAddTodo}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filter={filter}
          setFilter={setFilter}
          filteredAndSearchedTodos={filteredAndSearchedTodos}
        />
      </header>
    </div>
  );
}

export default App;
