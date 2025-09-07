import React from "react";

export const Controls = ({
  search,
  setSearch,
  filter,
  setFilter,
  filteredCount,
}) => {
  return (
    <div className="controls">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Пошук..."
      />
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="all">Всі</option>
        <option value="completed">Виконані</option>
        <option value="not_completed">Не виконані</option>
      </select>
      <p>Відфільтрованих: {filteredCount}</p>
    </div>
  );
};
