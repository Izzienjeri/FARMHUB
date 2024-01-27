import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Login from "./components/Auth/login";
import Logout from "./components/Auth/logout";
import Register from "./components/Auth/register";
// import Dashboard from "./components/Dashboard/dashboard";
// import FarmManagement from "./components/Dashboard/farmmanagement";
// import TaskAssignment from "./components/Dashboard/taskassignment";
// import TaskProgress from "./components/Dashboard/taskprogress";

function App() {
  return (
    <Router>
      <div>
        <h1>FARMHUB</h1>
        <Link to="./components/Auth/register">Register </Link>
        <Link to="./components/Auth/login">Login </Link>
        <Link to="./components/Auth/logout">Logout </Link>
      </div>
      <div></div>
      <div>
        <Switch>
          {/* <Route exact path="/" component={Home} /> */}
          <Route path="./Auth/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/register" component={Register} />
        </Switch>
      </div>
    </Router>
  );
}
export default App;
