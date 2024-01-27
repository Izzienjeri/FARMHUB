import React, { useState, useEffect } from "react";

const TaskProgressList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch tasks from the server when the component mounts
    const fetchTasks = async () => {
      try {
        const response = await fetch("/api/tasks"); // Adjust the API endpoint accordingly

        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }

        const data = await response.json();
        setTasks(data.tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div>
      <h2>Task Progress List</h2>
      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.task_id}>
              <p>Task Name: {task.task_name}</p>
              <p>Task Status: {task.task_status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskProgressList;
