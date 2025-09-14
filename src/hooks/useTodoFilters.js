import { useState, useMemo } from "react";

export const useTodoFilters = (todos) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredAndSearchedTodos = useMemo(() => {
    if (!todos) return [];

    return todos.filter((todo) => {
      const matchesSearch = todo.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      if (filter === "not_completed") {
        return matchesSearch && !todo.checked;
      } else if (filter === "completed") {
        return matchesSearch && todo.checked;
      } else {
        return matchesSearch;
      }
    });
  }, [todos, searchQuery, filter]);

  return {
    searchQuery,
    setSearchQuery,
    filter,
    setFilter,
    filteredAndSearchedTodos,
  };
};
