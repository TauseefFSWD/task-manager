import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, updateTask } from "../tasksSlice";
import TaskForm from "./TaskForm";
import "./TaskList.css";

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTaskId, setCurrentTaskId] = useState(null);

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="task-list">
      <div className="header">
        <h2>Task List</h2>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <ul>
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <li key={task.id} className={`task-item ${task.status}`}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
              <p className={`priority ${task.priority}`}>
                Priority:{" "}
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </p>
              <p className={`status ${task.status}`}>
                Status:{" "}
                {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
              </p>
              <div className="actions">
                <button
                  className="edit-button"
                  onClick={() => setCurrentTaskId(task.id)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <p>No tasks found.</p>
        )}
      </ul>
    </div>
  );
};

export default TaskList;
