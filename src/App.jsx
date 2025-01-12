import { useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import useFilter from "./hooks/useFilter";
import "./index.css";

function App() {
  const [todos, setTodos] = useLocalStorage("todos", []);
  const [todoInput, setTodoInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const {
    filteredTodos,
    filterStatus,
    setFilterStatus,
    searchTerm,
    setSearchTerm,
  } = useFilter(todos);

  const handleAdd = () => {
    if (todoInput.trim() !== "") {
      setTodos([
        ...todos,
        { id: Date.now(), text: todoInput, completed: false },
      ]);
      setTodoInput("");
    }
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (id) => {
    setEditingId(id);
    const todoToEdit = todos.find((todo) => todo.id === id);
    setTodoInput(todoToEdit.text);
    console.log(todoToEdit);
  };

  const handleUpdate = () => {
    if (todoInput.trim() !== "") {
      setTodos(
        todos.map((todo) =>
          todo.id === editingId ? { ...todo, text: todoInput } : todo
        )
      );
      setTodoInput("");
      setEditingId(null);
    }
  };

  const handleToggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleClearAll = () => {
    setTodos([]);
  };

  return (
    <div className="todo-app">
      <h1>Todo List</h1>
      <div className="todo-input">
        <input
          type="text"
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
          placeholder="Enter a todo"
        />
        {editingId === null ? (
          <button className="add-btn" onClick={handleAdd}>
            Add
          </button>
        ) : (
          <button className="update-btn" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
      <div className="filter-controls">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search todos"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <ul className="todo-list">
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            className={`todo-item ${todo.completed ? "completed" : ""}`}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleComplete(todo.id)}
            />
            <h3 className="todo-text">{todo.text}</h3>
            <div className="todo-actions">
              <button className="edit-btn" onClick={() => handleEdit(todo.id)}>
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDelete(todo.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {todos.length > 0 && (
        <button className="clear-all-btn" onClick={handleClearAll}>
          Clear All
        </button>
      )}
    </div>
  );
}

export default App;
