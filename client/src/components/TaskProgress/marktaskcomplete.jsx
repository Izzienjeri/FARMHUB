import React, { useState } from "react";

const MarkTaskComplete = ({ taskId, onMarkComplete }) => {
  const [loading, setLoading] = useState(false);

  const handleMarkComplete = async () => {
    try {
      setLoading(true);

      const response = await fetch(`/api/mark_task_complete`, {
        method: "POST", // Adjust the HTTP method accordingly
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ task_id: taskId }),
      });

      if (!response.ok) {
        throw new Error("Failed to mark task as complete");
      }

      // Notify the parent component that the task has been marked as complete
      onMarkComplete();
    } catch (error) {
      console.error("Error marking task as complete:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleMarkComplete} disabled={loading}>
        Mark as Complete
      </button>
    </div>
  );
};

export default MarkTaskComplete;
