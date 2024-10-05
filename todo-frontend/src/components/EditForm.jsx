import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai"; 

const EditTaskForm = ({ closeForm, updateTask, selectedTask }) => {
  const [task, setTask] = useState({
    assignedTo: "",
    status: "Not Started",
    dueDate: "",
    priority: "Medium",
    comments: [],
  });
  const [commentInput, setCommentInput] = useState("");

  useEffect(() => {
    if (selectedTask) {
      setTask(selectedTask);
    }
  }, [selectedTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleCommentChange = (e) => {
    setCommentInput(e.target.value);
  };

  const addComment = () => {
    if (commentInput) {
      setTask((prevTask) => ({
        ...prevTask,
        comments: [...prevTask.comments, commentInput],
      }));
      setCommentInput("");
    }
  };

  const deleteComment = (index) => {
    setTask((prevTask) => {
      const newComments = prevTask.comments.filter((_, i) => i !== index);
      return { ...prevTask, comments: newComments };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/api/tasks/${task._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(task),
        }
      );
      const updatedTask = await response.json();
      updateTask(updatedTask);
      closeForm();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-emerald-500 bg-opacity-50">
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Edit Task</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="assignedTo"
            value={task.assignedTo}
            placeholder="Assigned To"
            onChange={handleChange}
            className="border border-emerald-300 rounded-md p-2 w-full mb-4"
            required
          />
          <select
            name="status"
            value={task.status}
            onChange={handleChange}
            className="border border-emerald-300 rounded-md p-2 w-full mb-4"
          >
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <input
            type="date"
            name="dueDate"
            value={task.dueDate.split("T")[0]} 
            onChange={handleChange}
            className="border border-emerald-300 rounded-md p-2 w-full mb-4"
            required
          />
          <select
            name="priority"
            value={task.priority}
            onChange={handleChange}
            className="border border-emerald-300 rounded-md p-2 w-full mb-4"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <div className="mb-4">
            <input
              type="text"
              value={commentInput}
              onChange={handleCommentChange}
              placeholder="Add Comment"
              className="border border-emerald-300 rounded-md p-2 w-full"
            />
            <button
              type="button"
              onClick={addComment}
              className="mt-2 bg-emerald-500 text-white rounded-md px-4 py-2"
            >
              Add Comment
            </button>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold">Comments:</h3>
            <ul>
              {task.comments.map((comment, index) => (
                <li
                  key={index}
                  className="border-b py-1 flex justify-between items-center"
                >
                  <span>{comment}</span>
                  <button
                    onClick={() => deleteComment(index)}
                    className="text-black-500  hover:text-red-700"
                  >
                    <AiOutlineClose />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-emerald-500 text-white rounded-md px-4 py-2 mr-2"
            >
              Update Task
            </button>
            <button
              type="button"
              onClick={closeForm}
              className="bg-gray-400 text-white rounded-md px-4 py-2"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskForm;
