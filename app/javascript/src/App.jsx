import React from "react";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
// import { ToastContainer } from "react-toastify";

import Home from "./components/Home";
import Layout from "./components/Layout";
import Create from "./components/Post/Create";
import Show from "./components/Post/Show";

const App = () => (
  <Router>
    {/* <ToastContainer /> */}
    <Layout>
      <Switch>
        <Route exact component={Show} path="/post/:slug/show" />
        <Route exact component={Create} path="/post/create" />
        <Route exact component={Home} path="/" />
        <Route exact path="/about" render={() => <div>About Page</div>} />
      </Switch>
    </Layout>
  </Router>
);

export default App;
