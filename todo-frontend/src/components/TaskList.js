import React, { useEffect, useState } from "react";
import TaskFormModal from "./TaskFormModel";
import EditTaskForm from "./EditForm";
import DeleteConfirmationModal from "./DeleteModal";
import { IoSearchSharp } from "react-icons/io5";
// import { FaTasks } from "react-icons/fa";

const TasksTable = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:5000/api/tasks");
        const data = await response.json();
        setTasks(data);
        setFilteredTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    const filtered = tasks.filter(
      (task) =>
        task.assignedTo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.status?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.priority?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.comments?.some((comment) =>
          comment.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    setFilteredTasks(filtered);
    setCurrentPage(1);
  }, [searchTerm, tasks]);

  const openForm = () => {
    setShowForm(true);
    setSelectedTask(null);
  };

  const refreshhandle = () => {
    window.location.reload();
  };

  const openEditForm = (task) => {
    setSelectedTask(task);
    setShowEditForm(true);
    setDropdownOpen(null);
  };

  const closeForm = () => {
    setShowForm(false);
    setSelectedTask(null);
  };

  const closeEditForm = () => {
    setShowEditForm(false);
    setSelectedTask(null);
  };

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const updateTask = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task._id === updatedTask._id ? updatedTask : task))
    );
  };

  const handleDeleteClick = (task) => {
    setTaskToDelete(task);
    setShowDeleteModal(true);
    setDropdownOpen(null);
  };

  const confirmDelete = async () => {
    try {
      await fetch(`http://localhost:5000/api/tasks/${taskToDelete._id}`, {
        method: "DELETE",
      });
      setTasks(tasks.filter((task) => task._id !== taskToDelete._id));
    } catch (error) {
      console.error("Error deleting task:", error);
    } finally {
      setShowDeleteModal(false);
      setTaskToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setTaskToDelete(null);
  };

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  const indexOfLastTask = currentPage * itemsPerPage;
  const indexOfFirstTask = indexOfLastTask - itemsPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);

  return (
    <div className="p-10 bg-emerald-50 rounded-lg shadow-md max-w-5xl mx-auto">
      <div className="flex justify-end pl-20 mb-4">
        <div className="relative flex-grow">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search tasks..."
            className="w-full px-4 py-2 pl-10 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <IoSearchSharp className="absolute left-3 top-2/4 transform -translate-y-1/2 text-emerald-800" />
        </div>

        <select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
          className="ml-4 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>

     
      <div className="flex justify-end space-x-4 m-4">
        <button
          onClick={openForm}
          className="px-4 py-2 bg-emerald-500 text-black rounded-md shadow-sm hover:bg-gray-300  inline-flex items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
        >

        <svg class="h-6 w-6 text-black-700 ml-0"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width=""  stroke-linecap="round"  stroke-linejoin="round">  
        <line x1="12" y1="5" x2="12" y2="19" />  <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
          New Task
        </button>
        <button
          onClick={refreshhandle}
          className="px-4 py-2 bg-emerald-500 text-black rounded-md shadow-sm hover:bg-gray-300 inline-flex items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
        >
        <svg class="h-6 w-6 text-black-300"  width="20" height="20" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  
        <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M4.05 11a8 8 0 1 1 .5 4m-.5 5v-5h5" /></svg>
    
          Refresh
        </button>

        {loading && (
          <button
            disabled
            type="button"
            className="text-white bg-emerald-200 hover:bg-emerald-800 focus:ring-4 focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-emerald-800 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800 inline-flex items-center"
          >
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4 me-3 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 87.9795 35.9161C88.1811 35.8758 89.083 38.2158 91.542 39.5932 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
            Loading...
          </button>
        )}
      </div>

      {showForm && <TaskFormModal closeForm={closeForm} addTask={addTask} />}
      {showEditForm && (
        <EditTaskForm
          closeForm={closeEditForm}
          updateTask={updateTask}
          selectedTask={selectedTask}
        />
      )}
      {showDeleteModal && (
        <DeleteConfirmationModal
          confirmDelete={confirmDelete}
          cancelDelete={cancelDelete}
        />
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-slate-800 rounded-md shadow-md">
          <thead className="bg-emerald-100">
            <tr>
              <th className="border border-slate-600 p-4 text-left text-white-700">
                Assigned To
              </th>
              <th className="border border-slate-600 p-4 text-left text-white-700">
                Status
              </th>
              <th className="border border-slate-600 p-4 text-left text-white-700">
                Due Date
              </th>
              <th className="border border-slate-600 p-4 text-left text-white-700">
                Priority
              </th>
              <th className="border border-slate-600 p-4 text-left text-white-700">
                Comments
              </th>
              <th className="border border-slate-600 p-4 text-left text-white-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentTasks.map((task) => (
              <tr
                key={task._id}
                className="odd:bg-white even:bg-emerald-50 hover:bg-white-100"
              >
                <td className="border border-slate-400 p-4">
                  {task.assignedTo}
                </td>
                <td className="border border-slate-400 p-4">{task.status}</td>
                <td className="border border-slate-400 p-4">
                  {new Date(task.dueDate).toLocaleDateString()}
                </td>
                <td className="border border-slate-400 p-4">{task.priority}</td>
                <td className="border border-slate-400 p-4">
                  {task.comments.join(", ")}
                </td>
                <td className="border border-slate-400 p-4 relative">
                  <button
                    onClick={() => toggleDropdown(task._id)}
                    className="px-4 py-2 bg-emerald-300 text-text-white-800 rounded-md hover:bg-gray-300 inline-flex items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                  >
                 
                    Actions 
                    <svg class="w-2 h-2 text-black-300 dark:text-white ml-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 8">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"/>
              </svg>
                  </button>
                  {dropdownOpen === task._id && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-text-white-200 rounded-md shadow-lg z-10">
                      <button
                        onClick={() => openEditForm(task)}
                        className="block w-full text-left px-4 py-2 text-emerald-700 hover:bg-emerald-100"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(task)}
                        className="block w-full text-left px-4 py-2 text-red-700 hover:bg-red-100"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between mt-4">
        <div className="flex space-x-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(1)}
            className="px-3 py-1 bg-emerald-200 rounded-none shadow-sm hover:bg-emerald-300  inline-flex items-center  focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
          <svg class="h-5 w-6 text-black-500"  width="10" height="10" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> 
           <path stroke="none" d="M0 0h24v24H0z"/>  <polyline points="11 7 6 12 11 17" />  <polyline points="17 7 12 12 17 17" /></svg>
            First
          </button>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-3 py-1 bg-emerald-200 rounded-none shadow-sm hover:bg-emerald-300 inline-flex items-center focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
          <svg class="h-4 w-6 text-black-500"  width="10" height="10" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> 
           <path stroke="none" d="M0 0h24v24H0z"/>  <polyline points="15 6 9 12 15 18" /></svg>
            Previous
          </button>
        </div>
        <span className="px-3 py-1 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300">
          Page {currentPage} of {totalPages}
        </span>
      
        <div className="flex space-x-2">
          <button
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className="px-3 py-1 bg-emerald-200 rounded-none shadow-sm hover:bg-emerald-300  inline-flex items-center focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            Next
            <svg class="h-4 w-6 text-black-500"  width="10" height="10" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  
            <path stroke="none" d="M0 0h24v24H0z"/>  <polyline points="9 6 15 12 9 18" /></svg>
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(totalPages)}
            className="px-3 py-1 bg-emerald-200 rounded-none shadow-sm hover:bg-emerald-300 inline-flex items-center focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            Last 
            <svg class="h-5 w-6 text-black-500"  width="10" height="10" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  
            <path stroke="none" d="M0 0h24v24H0z"/>  <polyline points="7 7 12 12 7 17" />  <polyline points="13 7 18 12 13 17" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TasksTable;


//for terminating the port
// tasklist /FI "IMAGENAME eq node.exe"
// taskkill /F /IM node.exe

