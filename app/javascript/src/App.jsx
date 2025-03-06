import React from "react";

import { either, isEmpty, isNil } from "ramda";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { Login, Signup } from "components/Authentication";
import { getFromLocalStorage } from "utils/storage";

import PrivateRoute from "./components/commons/PrivateRoute";
import Home from "./components/Home";
import Layout from "./components/Layout";
import Create from "./components/Post/Create";
import Show from "./components/Post/Show";

const App = () => {
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken);

  return (
    <Router>
      <Layout>
        <ToastContainer />
        <Switch>
          <Route exact component={Signup} path="/signup" />
          <Route exact component={Login} path="/login" />
          <Route exact component={Show} path="/post/:slug/show" />
          <Route exact component={Create} path="/post/create" />
          <Route exact path="/about" render={() => <div>About Page</div>} />
          <PrivateRoute
            component={Home}
            condition={isLoggedIn}
            path="/"
            redirectRoute="/login"
          />
        </Switch>
      </Layout>
    </Router>
  );
};

export default App;
