import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FarmPreloader } from "../common";

import { farmReport } from "../../actions/scoutActions";

class FarmSummary extends Component {
  state = { farmReportAlert: [], preloaderStyle: "d-none" };

  fetchAllReports = () => {
    this.handlePreloaderStyle("d-block");
    this.props.farmReport();
  };

  handlePreloaderStyle = newStyle => {
    this.setState({ preloaderStyle: newStyle });
  };

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
    this.fetchAllReports();
  }

  componentWillReceiveProps(nextProps) {
    this.handlePreloaderStyle("d-none");
    if (nextProps.farmReportAlert) {
      const newfarmReportAlert = nextProps.farmReportAlert;
      this.setState({
        farmReportAlert: newfarmReportAlert
      });
    }
  }

  render() {
    const { farmReportAlert, preloaderStyle } = this.state;

    const allParentBlocks =
      farmReportAlert instanceof Array
        ? farmReportAlert.map((parent, index) => (
            <div
              className={
                parent.alert === "Warning"
                  ? "mr-4 p-1 d-flex flex-column block-warning"
                  : parent.alert === "Danger"
                  ? "mr-4 p-1 d-flex flex-column block-danger"
                  : parent.alert === "Default"
                  ? "mr-4 p-1 d-flex flex-column block-noData"
                  : "mr-4 p-1 d-flex flex-column block-success"
              }
              key={index}
            >
              <p className="text-uppercase text-white text-center text-nowrap p-3 mb-2">
                {parent.block_name}
              </p>
              {parent.block_issue_types instanceof Array
                ? parent.block_issue_types.map((issueType, index) => (
                    <React.Fragment key={index}>
                      <span
                        className={
                          issueType.alert === "Danger"
                            ? "text-nowrap mb-2 ml-2 b-danger"
                            : issueType.alert === "Warning"
                            ? "text-nowrap mb-2 ml-2 b-warning"
                            : issueType.alert === "Success"
                            ? "text-nowrap mb-2 ml-2 b-success"
                            : "text-nowrap mb-2 ml-2 b-noData"
                        }
                      >
                        {issueType.issue_type_name}
                      </span>
                    </React.Fragment>
                  ))
                : null}

              <span
                className={
                  parent.scout_alert === "Danger"
                    ? "text-nowrap mb-2 ml-2 b-danger"
                    : parent.scout_alert === "Warning"
                    ? "text-nowrap mb-2 ml-2 b-warning"
                    : parent.scout_alert === "Success"
                    ? "text-nowrap mb-2 ml-2 b-success"
                    : "text-nowrap mb-2 ml-2 b-noData"
                }
              >
                {parent.scout_alert && "Scout"}
              </span>
            </div>
          ))
        : null;
    return (
      <section className="col-md-12 pb-2 mb-2 db-section h250">
        <div className="d-flex justify-content-between">
          <FarmPreloader preloaderStyle={preloaderStyle} />
          {allParentBlocks}
        </div>
      </section>
    );
  }
}

FarmSummary.propsTypes = {
  farmReportAlert: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  farmReportAlert: state.scout.farmReportAlert
});

export default connect(mapStateToProps, { farmReport })(
  withRouter(FarmSummary)
);
