import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import UserProfile from "./UserProfile";
import FarmManagement from "./farmmanagement";
import TaskAssignment from "./taskassignment";
import TaskProgress from "./taskprogress";

const Dashboard = () => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <div
        style={{
          backgroundColor: "#f2f2f2",
          padding: "20px",
          margin: "10px",
          width: "200px",
          borderRadius: "5px",
          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
        }}
      >
        <Link
          to="/dashboard/user_profile"
          style={{
            padding: "10px",
            textDecoration: "none",
            color: "black",
            border: "1px solid black",
            borderRadius: "5px",
            backgroundColor: "#c7ecee",
          }}
        >
          My Profile
        </Link>
      </div>
      <div
        style={{
          backgroundColor: "#f2f2f2",
          padding: "20px",
          margin: "10px",
          width: "200px",
          borderRadius: "5px",
          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
        }}
      >
        <Link
          to="/dashboard/farm_management"
          style={{
            padding: "10px",
            textDecoration: "none",
            color: "black",
            border: "1px solid black",
            borderRadius: "5px",
            backgroundColor: "#b2d8d8",
          }}
        >
          Farm Management
        </Link>
      </div>
      <div
        style={{
          backgroundColor: "#f2f2f2",
          padding: "20px",
          margin: "10px",
          width: "200px",
          borderRadius: "5px",
          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
        }}
      >
        <Link
          to="/dashboard/task_assignment"
          style={{
            padding: "10px",
            textDecoration: "none",
            color: "black",
            border: "1px solid black",
            borderRadius: "5px",
            backgroundColor: "#c7ecee",
          }}
        >
          Task Assignment
        </Link>
      </div>
      <div
        style={{
          backgroundColor: "#f2f2f2",
          padding: "20px",
          margin: "10px",
          width: "200px",
          borderRadius: "5px",
          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
        }}
      >
        <Link
          to="/dashboard/task_progress"
          style={{
            padding: "10px",
            textDecoration: "none",
            color: "black",
            border: "1px solid black",
            borderRadius: "5px",
            backgroundColor: "#b2d8d8",
          }}
        >
          Task Progress
        </Link>
      </div>

      <div style={{ marginTop: "20px", marginLeft: "20px" }}>
        <Routes>
          <Route path="/dashboard/user_profile" element={<UserProfile />} />
          <Route
            path="/dashboard/farm_management"
            element={<FarmManagement />}
          />
          <Route
            path="/dashboard/task_assignment"
            element={<TaskAssignment />}
          />
          <Route path="/dashboard/task_progress" element={<TaskProgress />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
