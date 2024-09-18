import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import "./index.css";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
const App = () => {
  return (
    <Provider store={store}>
      <Navbar />
      <div className="container mx-auto p-4">
        <TaskForm />
        <TaskList />
      </div>
      <Footer />
    </Provider>
  );
};

export default App;
