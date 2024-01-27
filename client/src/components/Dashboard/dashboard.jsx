import React from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import UserProfile from "./userprofile";
import FarmManagement from "./farmmanagement";
import TaskAssignment from "./taskassignment";
import TaskProgress from "./taskprogress";

const Dashboard = () => {
  const { path, url } = useRouteMatch();

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to={`${url}`}>Dashboard</Link>
          </li>
          <li>
            <Link to={`${url}/user_profile`}>My Profile</Link>
          </li>
          <li>
            <Link to={`${url}/farm_management`}>Farm Management</Link>
          </li>
          <li>
            <Link to={`${url}/task_assignment`}>Task Assignment</Link>
          </li>
          <li>
            <Link to={`${url}/task_progress`}>Task Progress</Link>
          </li>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      </nav>
      <div>
        <Switch>
          <Route exact path={path}>
            <h2>Welcome to the Dashboard!</h2>
          </Route>
          <Route path={`${path}/user_profile`} component={UserProfile} />
          <Route path={`${path}/farm_management`} component={FarmManagement} />
          <Route path={`${path}/task_assignment`} component={TaskAssignment} />
          <Route path={`${path}/task_progress`} component={TaskProgress} />
        </Switch>
      </div>
    </div>
  );
};

export default Dashboard;
