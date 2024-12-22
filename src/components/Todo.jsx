import React, { useState } from "react";
import TodoItem from "./TodoItem";
import todo_icon from "../assets/todo_icon.png";
// import Pagination from "./Pagination";

const Todo = () => {
    // Define state for search query
    const [searchQuery, setSearchQuery] = useState("");
  
    // Define the handler for search input changes
    const handleSearchChange = (event) => {
      setSearchQuery(event.target.value);
    };

    return (
        <div className="todo-container">
            <div className="todo-flex"> 
          {/* title */}
          <div className="todo-title-container">
            <h1>Todo List</h1> <img style={{ width: 30 }} src={todo_icon} alt="" />
          </div>
    
          {/* search bar */}
          <div className="search-bar-container">
            <input
              className="search-bar"
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
    
          {/* todo list item */}
          <div>
            <TodoItem searchQuery={searchQuery} />
          </div>
          </div>
        </div>
      );
    };
    
    export default Todo;