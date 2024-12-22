import React, { useState } from 'react';
import './Home.css';
import Todo from './Todo';
import NotFound from './NotFound'; 
import Munah from "../assets/Munah.jpeg";

const Home = () => {
    const [showTodo, setShowTodo] = useState(false); // State to toggle Todo visibility
    const [showNotFound, setShowNotFound] = useState(false);

    const handleTodoButtonClick = () => {
        setShowTodo(!showTodo);
    };

    const handleNotFoundButtonClick = () => {
        setShowNotFound(!showNotFound);
    };

    return (
        <div className="home">
            <img style={{ width: 150, height: 150, borderRadius: "50%" }} src={Munah} alt="Profile" />
            <h1>Adetokun Memunat</h1>
            <h3>AltSchool School of Engineering, Frontend Track</h3>
            <p>ALT/SOE/024/1281</p>
            <div className="button-container">
    <button onClick={handleTodoButtonClick} className="toggle-button">
        {showTodo ? 'Hide Todo List' : 'Show Todo List'}
    </button>

    {showTodo && <Todo />}

    <button onClick={handleNotFoundButtonClick} className="toggle-button">
        {showNotFound ? 'Hide Not Found Page' : 'Show Not Found Page'}
    </button>

    {showNotFound && (
        <div className="not-found-container">
            <NotFound />
        </div>
    )}
</div>

        </div>
    );
};

export default Home;