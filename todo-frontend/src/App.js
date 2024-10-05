import React from "react";
import TaskList from "./components/TaskList";
import { FaTasks } from "react-icons/fa";

const App = () => {
  return (
    <div className=" mx-auto p-6">
      <div className="flex items-center justify-center space-x-2 mb-6">
        <FaTasks className="text-emerald-300 text-3xl" />
        <h1 className="text-2xl font-bold text-gray-800">To-Do List</h1>
      </div>
      <TaskList />
    </div>
  );
};

export default App;

