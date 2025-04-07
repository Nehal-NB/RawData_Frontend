import React, { useState } from "react";
import { useUserContext } from "./context/usercontext";

function ListPages() {
  const { data, handleDelete, handleUpdate } = useUserContext();
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedStatus, setUpdatedStatus] = useState("Pending");

  const handleEditClick = (task, index) => {
    setEditingTaskIndex(index);
    setUpdatedTitle(task.Title);
    setUpdatedDescription(task.Description);
    setUpdatedStatus(task.Status);
  };

  const handleEditSubmit = (e, task) => {
    e.preventDefault();

    console.log("Task object before update:", task); // 🔍 Check task structure
    console.log("Task ID:", task.Id); // ✅ Ensure it's defined

    if (editingTaskIndex !== null) {
      handleUpdate({
        Id: task.Id, // ✅ Capital 'I'
        Title: updatedTitle,
        Description: updatedDescription,
        Status: updatedStatus,
        CreatedAt: task.CreatedAt, // Keep original created date
      });
      setEditingTaskIndex(null);
    }
  };

  return (
    <div className="table-list px-2 ff">
      <table className="table table-bordered px-2">
        <thead>
          <tr className="table-row">
            <th className="colors text-white">S.No</th>
            <th className="colors text-white">Title</th>
            <th className="colors text-white">Description</th>
            <th className="colors text-white">Status</th>
            <th className="colors text-white">Created At</th>
            <th className="colors text-white">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((task, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                {editingTaskIndex === index ? (
                  <input
                    type="text"
                    value={updatedTitle}
                    onChange={(e) => setUpdatedTitle(e.target.value)}
                  />
                ) : (
                  task.Title
                )}
              </td>
              <td>
                {editingTaskIndex === index ? (
                  <input
                    type="text"
                    value={updatedDescription}
                    onChange={(e) => setUpdatedDescription(e.target.value)}
                  />
                ) : (
                  task.Description
                )}
              </td>
              <td>
                {editingTaskIndex === index ? (
                  <select
                    value={updatedStatus}
                    onChange={(e) => setUpdatedStatus(e.target.value)}
                  >
                    <option value="To-Do">To-Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                ) : (
                  task.Status
                )}
              </td>
              <td>{new Date(task.CreatedAt).toLocaleString()}</td>
              <td>
                {editingTaskIndex === index ? (
                  <button
                    type="button"
                    className="btn text-white"
                    style={{ backgroundColor: "#563d7c" }}
                    onClick={(e) => handleEditSubmit(e, task)}
                  >
                    Update
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      className="btn text-white mt-2 me-4 px-3"
                      style={{ backgroundColor: "#1f3265" }}
                      onClick={() => handleEditClick(task, index)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger mt-2 me-4"
                      onClick={() => {
                        console.log("Full task object (for delete):", task);
                        handleDelete(task.Id); // ✅ Capital 'I'
                      }}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListPages;
