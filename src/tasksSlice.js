// tasksSlice.js

import { createSlice } from "@reduxjs/toolkit";

// Function to load tasks from localStorage
const loadTasksFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("tasks");
    if (serializedState === null) return [];
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Could not load tasks", err);
    return [];
  }
};

// Function to save tasks to localStorage
const saveTasksToLocalStorage = (tasks) => {
  try {
    const serializedState = JSON.stringify(tasks);
    localStorage.setItem("tasks", serializedState);
  } catch (err) {
    console.error("Could not save tasks", err);
  }
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState: loadTasksFromLocalStorage(),
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
      saveTasksToLocalStorage(state);
    },
    updateTask: (state, action) => {
      const { id, updatedTask } = action.payload;
      const index = state.findIndex((task) => task.id === id);
      if (index !== -1) {
        state[index] = { ...state[index], ...updatedTask };
        saveTasksToLocalStorage(state);
      }
    },
    deleteTask: (state, action) => {
      const newState = state.filter((task) => task.id !== action.payload);
      saveTasksToLocalStorage(newState);
      return newState;
    },
  },
});

export const { addTask, updateTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;
