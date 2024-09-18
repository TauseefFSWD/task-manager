import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, updateTask } from "../tasksSlice";
import { nanoid } from "nanoid";
import "./TaskForm.css";

const TaskForm = ({ currentTaskId, setCurrentTaskId }) => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("low");
  const [status, setStatus] = useState("in-progress");

  useEffect(() => {
    if (currentTaskId) {
      const task = tasks.find((task) => task.id === currentTaskId);
      if (task) {
        setTitle(task.title);
        setDescription(task.description);
        setDueDate(task.dueDate);
        setPriority(task.priority);
        setStatus(task.status);
      }
    }
  }, [currentTaskId, tasks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentTaskId) {
      dispatch(
        updateTask({
          id: currentTaskId,
          updatedTask: { title, description, dueDate, priority, status },
        })
      );
      setCurrentTaskId(null);
    } else {
      dispatch(
        addTask({
          id: nanoid(),
          title,
          description,
          dueDate,
          priority,
          status,
        })
      );
    }
    setTitle("");
    setDescription("");
    setDueDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h2>{currentTaskId ? "Edit Task" : "Add New Task"}</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <button type="submit">
        {currentTaskId ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;
