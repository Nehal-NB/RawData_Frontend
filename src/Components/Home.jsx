import React from "react";
import { useUserContext } from "./context/usercontext";

function Home() {
  const {
    title,
    description,
    status,
    setTitle,
    setDescription,
    setStatus,
    handleFormSubmit,
  } = useUserContext();

  const handleSubmit = (e) => {
    const task = { title, description, status };
    handleFormSubmit(e, task);
  };

  return (
    <div className="container my-5 py-4">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <h2 className="display-5 fw-bold text-center mb-4">
            Create <span className="text-primary">Task</span>
          </h2>
          <form className="p-4 border rounded bg-light" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="Enter task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                placeholder="Enter task description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="status" className="form-label">Status</label>
              <select
                className="form-select"
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Add Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;
