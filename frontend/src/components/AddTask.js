import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddTask() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:5000/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description, due_date: dueDate })
            
        }).then(response => response.json())
          .then(data => {
            
              console.log('Success:', data);
              navigate('/');
          })
          .catch(error => {
            
              console.error('Error:', error);
          });
    };

    return (
        <div className="container">
            <h1>Add Task</h1>
            <form onSubmit={handleSubmit}>
                <label>Title: </label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} required />
                <br />
                <label>Description: </label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                <br />
                <label>Due Date: </label>
                <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddTask;
