import React, { useState, useEffect } from "react";

const TaskProgress = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5555/task_progress/tasks", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTasks(data.tasks);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, []);
  const handleMarkComplete = (taskId) => {
    fetch("/task_progress/mark_task_complete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ task_id: taskId }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);

        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.task_id === taskId
              ? { ...task, task_status: "Completed" }
              : task
          )
        );
      })
      .catch((error) => {
        console.error("Error marking task as complete:", error);
      });
  };

  return (
    <div>
      <h2>Task Progress</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.task_id}>
            {task.task_name} - Status: {task.task_status}
            {task.task_status === "Pending" && (
              <button onClick={() => handleMarkComplete(task.task_id)}>
                Mark Complete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskProgress;
