import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/register" component={Register} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/farm_management" component={FarmManagement} />
          <Route path="/task_assignment" component={TaskAssignment} />
          <Route path="/task_progress" component={TaskProgress} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
