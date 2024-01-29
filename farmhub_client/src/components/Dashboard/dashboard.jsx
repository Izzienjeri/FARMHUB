import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import UserProfile from "./UserProfile";
import FarmManagement from "./farmmanagement";
import TaskAssignment from "./taskassignment";
import TaskProgress from "./taskprogress";

const Dashboard = () => {
  const cardStyle = {
    transition: "transform 0.3s ease-in-out",
    cursor: "pointer",
  };

  const hoverStyle = {
    transform: "translateY(-10px)",
  };

  const [style, setStyle] = React.useState(cardStyle);

  return (
    <div>
      <div
        style={style}
        onMouseOver={() => setStyle(hoverStyle)}
        onMouseOut={() => setStyle(cardStyle)}
      >
        <Link to="/dashboard/user_profile">My Profile</Link>
      </div>
      <div
        style={style}
        onMouseOver={() => setStyle(hoverStyle)}
        onMouseOut={() => setStyle(cardStyle)}
      >
        <Link to="/dashboard/farm_management">Farm Management</Link>
      </div>
      <div
        style={style}
        onMouseOver={() => setStyle(hoverStyle)}
        onMouseOut={() => setStyle(cardStyle)}
      >
        <Link to="/dashboard/task_assignment">Task Assignment</Link>
      </div>
      <div
        style={style}
        onMouseOver={() => setStyle(hoverStyle)}
        onMouseOut={() => setStyle(cardStyle)}
      >
        <Link to="/dashboard/task_progress">Task Progress</Link>
      </div>

      <div>
        <Routes>
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
