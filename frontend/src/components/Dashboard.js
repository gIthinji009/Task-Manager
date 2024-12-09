import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/tasks')
            .then((res) => res.json())
            .then((data) => {
                console.log('Fetched tasks:', data);
                setTasks(data);
            })
            .catch(error => {
                console.error('Error fetching tasks:', error);
            });
    }, []);

    return (
        <div className="container">
            <h1>Task Dashboard</h1>
            <Link to="/add" className="button">Add Task</Link>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <Link to={`/tasks/${task.id}`} className="task-title">{task.title}</Link>
                        <p className="task-status">Status: {task.status}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Dashboard;
