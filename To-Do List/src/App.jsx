import React, { useState } from "react";
import "./App.css"

function Todo() {
    const [tasks, setTasks] = useState([]); //tasks stores all the items in a list , setTasks updates the list
    const [input, setInput] = useState("");

    const addTask = () => {
        if (!input.trim()) return;

        const newTask = {
            id: Date.now(),
            text: input,
            completed: false,
            important: false,
        };

        setTasks(prev => [...prev, newTask]);
        setInput("");
    };

    const deleteTask = (id) => {
        setTasks(prev => prev.filter(task => task.id !== id));
    };

    const completeTask = (id) => {
        setTasks(prev =>
            prev.map(task =>
                task.id === id
                    ? { ...task, completed: !task.completed }
                    : task
            )
        );
    };

    const importantTask = (id) => {
        setTasks(prev =>
            prev.map(task =>
                task.id === id
                    ? { ...task, important: !task.important }
                    : task
            )
        );
    };

    return (
        <div className="body">
            <h1>TO-DO List</h1>
            <div className="top">
                <input className="input-box"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    type="text"
                    placeholder="Enter your task"
                />

                <button onClick={addTask}>Add</button>
            </div>

            <ol>
                {tasks.map(task => (
                    <li
                        key={task.id}
                        className={`list-item ${task.important ? "important" : ""}`}
                    >
                        <span
                            className={`task-text ${task.completed ? "completed" : ""}`}
                        >
                            {task.text}
                        </span>

                        <button onClick={() => completeTask(task.id)}>
                            {task.completed ? "Undo" : "Completed"}
                        </button>

                        <button
                            className="star-btn"
                            onClick={() => importantTask(task.id)}
                        >
                            {task.important ? "★" : "☆"}
                        </button>

                        <button onClick={() => deleteTask(task.id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default Todo;
