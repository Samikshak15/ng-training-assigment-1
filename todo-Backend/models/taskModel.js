const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  assignedTo: { type: String }, 
  status: {
    type: String,
    enum: ["Not Started", "In Progress", "Completed"],
  },
  dueDate: { type: Date },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium",
  },
  comments: [{ type: String }], 
  actions: [{ type: String }], 
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
