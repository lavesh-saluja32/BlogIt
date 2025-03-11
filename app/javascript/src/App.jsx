import React from "react";

import { either, isEmpty, isNil } from "ramda";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { Login, Signup } from "components/Authentication";
import { getFromLocalStorage } from "utils/storage";

import PrivateRoute from "./components/commons/PrivateRoute";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import Create from "./components/Post/Create";
import Edit from "./components/Post/Edit";
import Preview from "./components/Post/Preview";
import Show from "./components/Post/Show";
import Sidebar from "./components/Sidebar";

const App = () => {
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken);

  return (
    <Router>
      <ToastContainer />
      <div className="flex">
        {isLoggedIn && <Sidebar />}
        <div
          className={`h-screen ${!isLoggedIn} ? "w-[100vw]" : "w-[90vw]"
         p-10 pb-10 pt-20`}
        >
          <Switch>
            <Route exact component={Preview} path="/post/:slug/preview" />
            <Route exact component={Dashboard} path="/posts" />
            <Route exact component={Signup} path="/signup" />
            <Route exact component={Login} path="/login" />
            <Route exact component={Show} path="/post/:slug/show" />
            <Route exact component={Edit} path="/post/:slug/edit" />
            <Route exact component={Create} path="/post/create" />
            <Route exact path="/about" render={() => <div>About Page</div>} />
            <PrivateRoute
              component={Home}
              condition={isLoggedIn}
              path="/"
              redirectRoute="/login"
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
