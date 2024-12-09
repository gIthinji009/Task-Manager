import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function TaskDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/tasks/${id}`)
            .then((res) => res.json())
            .then((data) => setTask(data));
    }, [id]);
    
    const deleteTask = () => {
      fetch(`http://localhost:5000/tasks/${id}`, {
          method: 'DELETE',
      })
      .then(() => navigate('/'));
  };

    const changeStatus = (newStatus) => {
    fetch(`http://localhost:5000/tasks/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
    })
    .then((res) => res.json())
    .then((data) => setTask(data));
};

    if (!task) {
        return <div className="container">Loading...</div>;
    }

    return (
        <div className="container">
            <h1>{task.title}</h1>
            <p>{task.description}</p>
            <p>Due Date: {task.due_date}</p>
            <p>Status: {task.status}</p>
            <button onClick={() => changeStatus('complete')}>Complete</button>
            <button onClick={() => changeStatus('in progress')}>In Progress</button>
            <button onClick={deleteTask}>Delete Task</button>
        </div>
    );
}

export default TaskDetails;
