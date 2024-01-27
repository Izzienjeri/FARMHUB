import React, { useState, useEffect } from "react";

const AssignTaskForm = () => {
  const [workers, setWorkers] = useState([]);
  const [formData, setFormData] = useState({
    worker_id: "",
    task_name: "",
  });

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await fetch("/api/workers");
        if (!response.ok) {
          throw new Error("Failed to fetch workers");
        }

        const data = await response.json();
        setWorkers(data.workers);
      } catch (error) {
        console.error("Error fetching workers:", error);
      }
    };

    fetchWorkers();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/assign_task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to assign the task");
      }

      console.log("Task assigned successfully");
      setFormData({
        worker_id: "",
        task_name: "",
      });
    } catch (error) {
      console.error("Error assigning the task:", error);
    }
  };

  return (
    <div>
      <h2>Assign Task</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Select Worker:
          <select
            name="worker_id"
            value={formData.worker_id}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Worker
            </option>
            {workers.map((worker) => (
              <option key={worker.worker_id} value={worker.worker_id}>
                {worker.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Task Name:
          <input
            type="text"
            name="task_name"
            value={formData.task_name}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Assign Task</button>
      </form>
    </div>
  );
};

export default AssignTaskForm;
