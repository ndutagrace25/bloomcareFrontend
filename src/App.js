import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";

import store from "./store";
import setAuthToken from "./utilities/setAuthToken";
import { setCurrentUser, logoutPersonnel } from "./actions/authActions";

import "@fortawesome/fontawesome-free/css/all.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-datepicker";
import "react-dates/lib/css/_datepicker.css";
import "react-dates/initialize";

import "bootstrap/dist/css/bootstrap.min.css";
import "./custom.css";

import { Login, ResetPassword } from "./components/auth";
import NotFound from "./components/common/NotFound";
import {
  TimeReportLayout,
  TrackingLayout,
  MainLayout,
  DashboardSummary
} from "./components/Layouts";
import {
  NewFarmView,
  NewBlockView,
  NewBedView,
  ScoutingReport,
  VarietyReport
} from "./components/dashboard";

//check for token
if (localStorage.jwtToken) {
  //set auth token header
  setAuthToken(localStorage.jwtToken);
  //decode token and user info as well as exp
  const decoded = jwt_decode(localStorage.jwtToken);
  //set user and is isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //check for expired token
  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    //logout user
    store.dispatch(logoutPersonnel());

    //redirect to login page
    window.location.href = "/admin";
  }
}

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/admin" component={Login} />
          <Route exact path="/resetPassword" component={ResetPassword} />
          <Route exact path="/timeReport" component={TimeReportLayout} />
          <Route exact path="/tracking" component={TrackingLayout} />
          <Route exact path="/configurations" component={MainLayout} />
          <Route exact path="/dashboard" component={DashboardSummary} />
          <Route exact path="/farmView" component={NewFarmView} />
          <Route exact path="/blockView" component={NewBlockView} />
          <Route exact path="/bedView" component={NewBedView} />
          <Route exact path="/scoutingReport" component={ScoutingReport} />
          <Route exact path="/varietyReport" component={VarietyReport} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
