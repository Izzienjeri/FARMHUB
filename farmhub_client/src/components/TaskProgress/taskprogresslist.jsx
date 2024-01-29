import React, { useEffect, useState } from "react";

const TaskProgressList = () => {
  const [taskProgress, setTaskProgress] = useState([]);

  useEffect(() => {
    const fetchTaskProgress = async () => {
      try {
        const response = await fetch(
          "http://localhost:5555/task_progress/task_progress"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch task progress");
        }

        const data = await response.json();
        setTaskProgress(data.taskProgress);
      } catch (error) {
        console.error("Error fetching task progress:", error);
      }
    };

    fetchTaskProgress();
  }, []);

  return (
    <div>
      <h3>Task Progress List</h3>
      <ul>
        {taskProgress.map((progress) => (
          <li key={progress.task_progress_id}>
            {progress.task_name} - Status: {progress.task_status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskProgressList;
