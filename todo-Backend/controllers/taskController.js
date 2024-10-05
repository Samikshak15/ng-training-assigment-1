const Task = require("../models/taskModel");

// Get all tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new task
const createTask = async (req, res) => {
  const { assignedTo, status, dueDate, priority, comments, actions } = req.body;

  try {
    const newTask = new Task({
      assignedTo,
      status,
      dueDate,
      priority,
      comments,
      actions,
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a task by ID
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { assignedTo, status, dueDate, priority, comments, actions } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      {
        assignedTo,
        status,
        dueDate,
        priority,
        comments,
        actions,
      },
      { new: true }
    );
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a task by ID
const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    await Task.findByIdAndDelete(id);
    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
