import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import AddTask from './components/AddTask';
import TaskDetails from './components/TaskDetails';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/add" element={<AddTask />} />
                <Route path="/tasks/:id" element={<TaskDetails />} />
            </Routes>
        </Router>
    );
}

export default App;
