import React from "react";

const DeleteModal = ({ confirmDelete, cancelDelete }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 shadow-md">
        <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
        <p>Are you sure you want to delete this task?</p>
        <div className="flex justify-end mt-4">
          <button
            onClick={cancelDelete}
            className="px-4 py-2 mr-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-300"
          >
            Cancel
          </button>
          <button
            onClick={confirmDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
