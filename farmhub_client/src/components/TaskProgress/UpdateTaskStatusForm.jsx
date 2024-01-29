// /home/izzie/Moringa/phase-4/FARMHUB/farmhub_client/src/components/Dashboard/UpdateTaskStatusForm.jsx
import React, { useState, useEffect } from "react";

const UpdateTaskStatusForm = () => {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    task_id: "",
    task_status: "",
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          "http://localhost:5555/task_progress/tasks"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }

        const data = await response.json();
        setTasks(data.tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
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
      const response = await fetch(
        "http://localhost:5555/task_progress/update_status",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update task status");
      }

      console.log("Task status updated successfully");
      setFormData({
        task_id: "",
        task_status: "",
      });
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  return (
    <div>
      <h3>Update Task Status</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Select Task:
          <select
            name="task_id"
            value={formData.task_id}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Task
            </option>
            {tasks.map((task) => (
              <option key={task.task_id} value={task.task_id}>
                {task.task_name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          New Status:
          <input
            type="text"
            name="task_status"
            value={formData.task_status}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Update Task Status</button>
      </form>
    </div>
  );
};

export default UpdateTaskStatusForm;
