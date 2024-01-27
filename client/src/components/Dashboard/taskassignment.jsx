import React, { useState } from "react";

const TaskAssignment = () => {
  const [workerId, setWorkerId] = useState("");
  const [taskName, setTaskName] = useState("");

  const handleWorkerChange = (e) => {
    setWorkerId(e.target.value);
  };

  const handleTaskNameChange = (e) => {
    setTaskName(e.target.value);
  };

  const handleAssignTask = () => {
    fetch("/task_assignment/assign_task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        worker_id: parseInt(workerId),
        task_name: taskName,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Task assigned successfully:", data.message);

        setWorkerId("");
        setTaskName("");
      })
      .catch((error) => {
        console.error("Error assigning task:", error);
      });
  };

  return (
    <div>
      <h2>Task Assignment</h2>
      <form>
        <label>
          Worker ID:
          <input type="text" value={workerId} onChange={handleWorkerChange} />
        </label>
        <br />
        <label>
          Task Name:
          <input type="text" value={taskName} onChange={handleTaskNameChange} />
        </label>
        <br />
        <button type="button" onClick={handleAssignTask}>
          Assign Task
        </button>
      </form>
    </div>
  );
};

export default TaskAssignment;
