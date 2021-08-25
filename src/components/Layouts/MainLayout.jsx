import React, { Component } from "react";
import { NewNavBar, NewEntities, NewContainer } from "../common";
import { NewEntryLayout } from "../entry";
import { NewBedLayout } from "../beds";
import { NewToleranceLayout } from "../tolerance";
import { NewIssueCategoryLayout } from ".";
import { NewIssueLayout } from "../issue";
import { NewToleranceTypeLayout } from ".";
import { NewBlockLayout } from ".";
import { NewPersonnelLayout } from "../personnel";
import { NewPointLayout } from "../point";
import { NewIssueTypeLayout } from "../issueType";
import { VarietyLayout } from "../flower";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class MainLayout extends Component {
  state = {};

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }
  render() {
    return (
      <React.Fragment>
        <NewNavBar label="CONFIGURATIONS" />
        <NewContainer
          content={
            <React.Fragment>
              <NewEntities />
              <div className="tab-content px-n15 w-100">
                <NewEntryLayout />
                <NewBedLayout />
                <NewToleranceLayout />
                <NewIssueCategoryLayout />
                <NewIssueLayout />
                <NewToleranceTypeLayout />
                <NewBlockLayout />
                <NewPersonnelLayout />
                <NewPointLayout />
                <NewIssueTypeLayout />
                <VarietyLayout />
              </div>
            </React.Fragment>
          }
        />
      </React.Fragment>
    );
  }
}

MainLayout.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(MainLayout);
