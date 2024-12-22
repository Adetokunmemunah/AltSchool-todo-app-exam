import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const TodoDetails = () => {
  const { id } = useParams(); // Get the todo ID from the route parameters
  const navigate = useNavigate();
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodoDetails = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch todo details");
        }
        const data = await response.json();
        setTodo(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTodoDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!todo) {
    return <div>Todo not found</div>;
  }

  return (
     <div className="todo-details-container">
      <h2 className="todo-details-header">Todo Details</h2>
      <p className="todo-details-item">
        <span>Title:</span> {todo.title}
      </p>
      <p className="todo-details-item">
        <span>Status:</span> {todo.completed ? 'Completed' : 'Pending'}
      </p>
      <button className="todo-back-button" onClick={() => navigate(-1)}>
        Go Back
      </button>
    </div>
  );
};

export default TodoDetails;
