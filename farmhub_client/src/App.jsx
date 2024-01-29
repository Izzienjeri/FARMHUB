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
        <Link to="/register">Register </Link>
        <Link to="/login">Login </Link>
        <Link to="/logout">Logout </Link>
      </div>
      <div></div>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />

          <Route path="/dashboard/*" element={<Dashboard />} />
          {/* <Route path="/farmmanagement" element={<FarmManagement />} />
          <Route path="/taskassignment" element={<TaskAssignment />} />
          <Route path="/taskprogress" element={<TaskProgress />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
