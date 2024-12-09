import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function TaskDetails() {
    const { id } = useParams();
    const [task, setTask] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/tasks/${id}`)
            .then((res) => res.json())
            .then((data) => setTask(data));
    }, [id]);

    if (!task) {
        return <div className="container">Loading...</div>;
    }

    return (
        <div className="container">
            <h1>{task.title}</h1>
            <p>{task.description}</p>
            <p>Due Date: {task.due_date}</p>
            <p>Status: {task.status}</p>
        </div>
    );
}

export default TaskDetails;
