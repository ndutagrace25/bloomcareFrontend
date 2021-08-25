import React, { Component } from "react";
import { NewNavBar, DashboardSummaryMenu } from "../common";
import { FarmSummary, PrevalenceSummary, ScoutPerformanceSummary } from ".";

class DashboardSummary extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <NewNavBar label="DASHBOARD" />
        <DashboardSummaryMenu
          breadCrumb={
            <li className="breadcrumb-item active" aria-current="page">
              Home
            </li>
          }
        />
        <FarmSummary />
        <PrevalenceSummary />
        <ScoutPerformanceSummary />
      </React.Fragment>
    );
  }
}

export default DashboardSummary;
