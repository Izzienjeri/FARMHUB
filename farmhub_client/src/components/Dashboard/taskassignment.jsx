import React from "react";
import AssignTaskForm from "../TaskAssignment/assigntaskform";
import TaskList from "../TaskAssignment/tasklist";
const TaskAssignment = () => {
  return (
    <div>
      <h2>Task Assignment</h2>
      <AssignTaskForm />
      <TaskList />
    </div>
  );
};

export default TaskAssignment;
