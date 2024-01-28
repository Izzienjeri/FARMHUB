import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import UserProfile from "./userprofile";
import FarmManagement from "./farmmanagement";
import TaskAssignment from "./taskassignment";
import TaskProgress from "./taskprogress";

const Dashboard = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/user_profile">My Profile</Link>
          </li>
          <li>
            <Link to="/farm_management">Farm Management</Link>
          </li>
          <li>
            <Link to="/task_assignment">Task Assignment</Link>
          </li>
          <li>
            <Link to="/task_progress">Task Progress</Link>
          </li>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      </nav>
      <div>
        <Routes>
          <Route path="/" element={<h2>Welcome to the Dashboard!</h2>} />
          <Route path="/user_profile" element={<UserProfile />} />
          <Route path="/farm_management" element={<FarmManagement />} />
          <Route path="/task_assignment" element={<TaskAssignment />} />
          <Route path="/task_progress" element={<TaskProgress />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
