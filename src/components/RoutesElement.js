import { Route, Routes, NavLink } from "react-router-dom";
import Home from "../Links/Home";
import ToDoList from "./ToDoList";
import About from "../Links/About";
import TodoForm from "./TodoForm";
import { InputForm } from "./InputForm";
import { Controls } from "./Controls";

export const RoutesElement = ({
  todos,
  handleSaveTodo,
  onDelete,
  onToggleComplete,
  handleAddTodo,
  searchQuery,
  setSearchQuery,
  filter,
  setFilter,
  filteredAndSearchedTodos,
}) => {
  return (
    <div>
      <nav>
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/todo-list">Туду Ліст</NavLink>
        <NavLink to="/about">Про застосунок</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/todo-list"
          element={
            <>
              <InputForm onAddTodo={handleAddTodo} error={null} />
              <Controls
                search={searchQuery}
                setSearch={setSearchQuery}
                filter={filter}
                setFilter={setFilter}
                filteredCount={filteredAndSearchedTodos.length}
              />
              {todos && todos.length > 0 ? (
                <ToDoList
                  todos={filteredAndSearchedTodos}
                  onDelete={onDelete}
                  onToggleComplete={onToggleComplete}
                />
              ) : (
                <p>Наразі у вас немає завдань.</p>
              )}
            </>
          }
        />
        <Route path="/about" element={<About />} />
        <Route
          path="/todo-list/new"
          element={<TodoForm todos={todos} handleSaveTodo={handleSaveTodo} />}
        />
        <Route
          path="/todo-list/:id"
          element={<TodoForm todos={todos} handleSaveTodo={handleSaveTodo} />}
        />
      </Routes>
    </div>
  );
};
