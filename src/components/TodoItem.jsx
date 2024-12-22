import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import delete_icon from "../assets/delete.png";

const TodoItem = ({ searchQuery }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTodo, setNewTodo] = useState("");
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 10;

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setTodos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = (text) => {
    if (newTodo.trim()) {
      const newTask = {
        id: Date.now(),
        title: newTodo,
        completed: false,
      };
      setTodos([...todos, newTask]);
      setNewTodo("");
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo);

  const totalPages = Math.ceil(filteredTodos.length / todosPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ padding: "10px", margin: "20px" }}>
      <div className="add-task-container">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new task"
          className="add-task"
        />
        <button className="add-task-button" onClick={addTodo}>+</button>
      </div>

      <ul className="todo-list">
        {currentTodos.map((todo) => (
          <li
            className="todo-li-unit"
            key={todo.id}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e9e9e9")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f9f9f9")}
          >
            <Link to={`/todo/${todo.id}`} style={{ textDecoration: "none", color: "black" }}>
              {todo.title} {todo.completed ? "(Completed)" : "(Pending)"}
            </Link>
            <button onClick={() => deleteTodo(todo.id)} style={{ border: "none", background: "none", cursor: "pointer" }}>
              <img style={{ width: 12, cursor: "pointer" }} src={delete_icon} alt="Delete todo" />
            </button>
          </li>
        ))}
      </ul>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
        <button onClick={prevPage} disabled={currentPage === 1} className= "page-nav">
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={nextPage} disabled={currentPage === totalPages} className= "page-nav">
          Next
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
