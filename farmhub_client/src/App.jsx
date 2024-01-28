import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./components/Auth/login";
import Logout from "./components/Auth/logout";
import Register from "./components/Auth/register";
import Dashboard from "./components/Dashboard/dashboard";
import FarmManagement from "./components/Dashboard/farmmanagement";
import TaskAssignment from "./components/Dashboard/taskassignment";
import TaskProgress from "./components/Dashboard/taskprogress";

function App() {
  return (
    <Router>
      <div>
        <h1>FARMHUB</h1>
        <Link to="/auth/register">Register </Link>
        <Link to="/auth/login">Login </Link>
        <Link to="/auth/logout">Logout </Link>
      </div>
      <div></div>
      <div>
        <Routes>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/logout" element={<Logout />} />
          <Route path="/auth/register" element={<Register />} />

          <Route path="/Dashboard/dashboard" element={<Dashboard />} />
          <Route
            path="/Dashboard/farmmanagement"
            element={<FarmManagement />}
          />
          <Route
            path="/Dashboard/taskassignment"
            element={<TaskAssignment />}
          />
          <Route path="/Dashboard/taskprogress" element={<TaskProgress />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
