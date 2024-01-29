import React from "react";
import UpdateTaskStatusForm from "../TaskProgress/UpdateTaskStatusForm";
import TaskProgressList from "../TaskProgress/taskprogresslist";

const TaskProgress = () => {
  return (
    <div>
      <h2>Task Progress</h2>
      <UpdateTaskStatusForm />
      <TaskProgressList />
    </div>
  );
};

export default TaskProgress;
