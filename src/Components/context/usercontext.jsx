import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserContext = createContext({
  data: [],
  title: "",
  description: "",
  status: "Pending",
  setData: () => {},
  setTitle: () => {},
  setDescription: () => {},
  setStatus: () => {},
  AddtoTable: () => {},
  handleFormSubmit: () => {},
  handleUpdate: () => {},
  handleDelete: () => {},
});

const BASE_URL = "https://localhost:7241/api/TaskMaster";

export const useUserContext = () => useContext(UserContext);

export function UserContextProvider({ children }) {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");

  const navigate = useNavigate();

  const AddtoTable = (newTask) => {
    setData((prev) => [...prev, newTask]);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const payload = {
      id: 0, // New Task
      title,
      description,
      status,
      createdAt: new Date().toISOString(),
    };

    axios
      .post(`${BASE_URL}/TaskMasterSave`, payload)
      .then((response) => {
        const res = response.data;
        if (res.status) {
          // Since save doesn't return inserted row, we reload full list
          fetchTaskList();
          navigate("/ListPages");
        } else {
          alert(res.errorDescription || "Failed to save task");
        }
      })
      .catch((error) => {
        console.error("Error saving task:", error);
      });

    setTitle("");
    setDescription("");
    setStatus("Pending");
  };

  const handleUpdate = (task) => {
    axios
      .put(`${BASE_URL}/TaskMasterUpdate`, JSON.stringify(task), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const res = response.data;
        if (res.status) {
          alert("Task updated successfully!");
          fetchTaskList(); // Reload the task list
        } else {
          alert(res.errorDescription || "Failed to update task");
        }
      })
      .catch((error) => {
        console.error("Error updating task:", error);
        alert("Something went wrong while updating the task.");
      });
  };
    

  const handleDelete = (id) => {
    axios
      .delete(`${BASE_URL}/TaskMasterDelete`, {
        data: {
          id: id, // New Task
          title:"",
          description:"",
          status:"",
          createdAt: new Date().toISOString()
        },
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        const res = response.data;
        if (res.status) {
          fetchTaskList();
        } else {
          alert(res.errorDescription || "Failed to delete task");
        }
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };
  
  

  const fetchTaskList = () => {
    axios
      .get(`${BASE_URL}/GetItemTask`)
      .then((response) => {
        const res = response.data;
        if (res.status) {
          setData(res.data); // res.data contains the actual array of tasks
        } else {
          console.error(res.errorDescription || "No data found");
        }
      })
      .catch((error) => {
        console.error("Error fetching task list:", error);
      });
  };

  useEffect(() => {
    fetchTaskList();
  }, []);

  const value = {
    data,
    title,
    description,
    status,
    setTitle,
    setDescription,
    setStatus,
    setData,
    AddtoTable,
    handleFormSubmit,
    handleUpdate,
    handleDelete,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
