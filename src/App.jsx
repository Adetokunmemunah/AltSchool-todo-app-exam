import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import NotFound from './components/NotFound';
import TodoDetails from './components/TodoDetails';
import ErrorBoundary from './components/ErrorBoundary';
import TestError from './components/TestError';


const App = () => {
  return (
    <Router>
<ErrorBoundary>
    <div
      style={{
        background: "#FFFFF0",
        display: "grid",
        minHeight: "100vh",
      }}
    >
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/todo/:id" element={<TodoDetails />}/>
      </Routes>
    </div>
    </ErrorBoundary>
    </Router>

  );
};

export default App;
