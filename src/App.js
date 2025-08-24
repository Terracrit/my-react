import { useState } from "react";
import "./App.css";

function App() {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState([]);
  const hendlerToDo = (e) => {
    setValue(e.target.value);
  };
  const hendlerkey = (e) => {
    if (e.key === "Enter") {
      onClickhandl();
    }
  };
  const onClickhandl = () => {
    if (value.trim() !== "") {
      setTodos([...todos, value]);
      setValue("");
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <input value={value} onChange={hendlerToDo} onKeyDown={hendlerkey} />
        <button onClick={onClickhandl}>Add to do</button>
        <p>{todos.length}</p>
        <ul>
          {todos.map((todo, index) => (
            <li key={index}>{todo}</li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
