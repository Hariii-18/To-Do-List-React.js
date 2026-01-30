import React, { useState, useEffect } from "react";
import "./App.css";

function Todo() {
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem("tasks");
        return saved ? JSON.parse(saved) : [];
    });
    //tasks stores all the items in a list , setTasks updates the list

    const [input, setInput] = useState("");
    const [filter, setFilter] = useState("all");
    const [darkMode, setDarkMode] = useState(() => {
        const savedMode = localStorage.getItem("darkMode");
        return savedMode === "true";
    });
    const toggleDarkMode = () => {
        setDarkMode(prev => !prev);
    };

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

    // Filter Logic
    const filteredTasks = tasks.filter(task => {
        if (filter === "completed") return task.completed;
        if (filter === "important") return task.important;
        return true;
    });
    {



        // Dark Mode Toggle
        useEffect(() => {
            localStorage.setItem("darkMode", darkMode);
        }, [darkMode]);


        useEffect(() => {
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }, [tasks]);

        return (
            <div className={`body ${darkMode ? "dark" : "light"}`}>
                <div className="head">
                    <h1>TO-DO List</h1>

                    <button
                        className="dark-toggle"
                        onClick={toggleDarkMode}
                        aria-label="Toggle dark mode"
                    >
                        {darkMode ? "☀️" : "🌙"}
                    </button>

                </div>

                <div className="top">
                    <input className="input-box"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addTask()}
                        type="text"
                        placeholder="Enter your task"
                    />

                    <button className="add-btn" onClick={addTask}>Add</button>
                </div>

                <ol>
                    {filteredTasks.map(task => (
                        <li
                            key={task.id}
                            className={`list-item ${task.important ? "important" : ""}`}
                        >
                            <span
                                className={`task-text ${task.completed ? "completed" : ""}`}
                            >
                                {task.text}
                            </span>

                            <button
                                type="button"
                                className="complete-btn"
                                onClick={() => completeTask(task.id)}
                                aria-label="Mark task completed">
                                {task.completed ? "Undo" : "Completed"}
                            </button>

                            <button
                                className="star-btn"
                                aria-label="Mark task important"
                                onClick={() => importantTask(task.id)
                                }>
                                {task.important ? "★" : "☆"}
                            </button>

                            <button className="delete-btn"
                                aria-label="Delete task"
                                onClick={() => deleteTask(task.id)
                                }>
                                Delete
                            </button>
                        </li>
                    ))}
                </ol>
                <div className="filters">
                    <button
                        className={filter === "all" ? "active" : ""}
                        onClick={() => setFilter("all")}
                    >
                        All
                    </button>
                    <button
                        className={filter === "completed" ? "active" : ""}
                        onClick={() => setFilter("completed")}
                    >
                        Completed
                    </button>
                    <button
                        className={filter === "important" ? "active" : ""}
                        onClick={() => setFilter("important")}
                    >
                        Important
                    </button>
                </div>
            </div>
        );
    }
}
export default Todo;
