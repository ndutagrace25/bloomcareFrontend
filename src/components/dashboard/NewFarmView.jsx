import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchtPrintReport } from "../../actions/printActions";
import { farmReport } from "../../actions/scoutActions";
import { fetchAllPersonnel, fetchScouts } from "../../actions/personnelActions";
import { fetchAllVariety } from "../../actions/flowerActions";
import { fetchAllIssue } from "../../actions/issueActions";
import PropTypes from "prop-types";
import { Preloader } from "../common";

import {
  NewNavBar,
  DashboardSummaryMenu,
  NewTable,
  NewButton
} from "../common";
import { NewPrintView } from ".";

class NewFarmView extends Component {
  state = {
    printReport: [],
    blocksReport: [],
    search_variety: "",
    search_issue: "",
    search_scout: "",
    // search_date: new Date().toISOString().substring(0, 10),
    search_date: "",
    allVariety: [],
    allIssues: [],
    allScouts: [],
    preloaderStyle: "d-none",
    block_id: ""
  };

  onChange = (e, blockId) => {
    this.handlePreloaderStyle("d-block");
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });

    const enteredValue = e.target.value;

    const {
      search_variety,
      search_issue,
      search_scout,
      search_date
    } = this.state;

    console.log(e.target.name);
    console.log(search_issue);

    this.props.fetchtPrintReport(
      blockId,
      e.target.name === "search_variety" ? enteredValue : search_variety,
      e.target.name === "search_scout" ? enteredValue : search_scout,
      e.target.name === "search_date" ? enteredValue : search_date,
      e.target.name === "search_issue" ? enteredValue : search_issue
    );
  };

  // resetData = () =>{

  // }

  handlePreloaderStyle = newStyle => {
    this.setState({ preloaderStyle: newStyle });
  };

  fetchAllReports = () => {
    this.handlePreloaderStyle("d-block");
    this.props.farmReport();
    this.props.fetchAllVariety();
    this.props.fetchAllIssue();
    this.props.fetchAllPersonnel();
    this.props.fetchScouts();
  };

  fetchtPrintReport = blockId => {
    this.handlePreloaderStyle("d-block");
    const {
      search_variety,
      search_issue,
      search_scout,
      search_date
    } = this.state;
    this.props.fetchtPrintReport(
      blockId,
      search_variety,
      search_scout,
      search_date,
      search_issue
    );
  };

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
    this.fetchAllReports();
  }

  componentWillReceiveProps(nextProps) {
    this.handlePreloaderStyle("d-none");
    if (nextProps.printReport) {
      this.setState({
        printReport: nextProps.printReport
      });
    }
    if (nextProps.blocksReport) {
      this.setState({
        blocksReport: nextProps.blocksReport
      });
    }
    if (nextProps.allVariety) {
      this.setState({
        allVariety: nextProps.allVariety
      });
    }
    if (nextProps.allIssues) {
      this.setState({
        allIssues: nextProps.allIssues
      });
    }
    if (nextProps.allScouts) {
      console.log(nextProps.allScouts);
      this.setState({
        allScouts: nextProps.allScouts
      });
    }
  }

  getBlockIssues = (alert, issues) => {
    console.log(alert);
    let blockIssues = "";

    if (issues instanceof Array) {
      issues.map((issueType, index) => {
        if (issueType.alert === alert) {
          blockIssues += issueType.issue_type_name + ", ";
        }
      });
    }

    return blockIssues;
  };

  getCurrentBlockId = blockId => {
    this.setState({
      block_id: blockId
    });
  };

  render() {
    const {
      blocksReport,
      printReport,
      search_variety,
      search_issue,
      search_scout,
      search_date,
      allVariety,
      allIssues,
      allScouts,
      preloaderStyle
    } = this.state;

    let count = 1;

    const allBlocks =
      blocksReport instanceof Array
        ? blocksReport.map((block, index) => (
            <tr key={index}>
              <th className="align-middle" scope="row">
                {count++}
              </th>
              <td
                className={
                  block.alert === "Danger"
                    ? "align-middle b-danger"
                    : block.alert === "Warning"
                    ? "align-middle b-warning"
                    : block.alert === "Success"
                    ? "align-middle b-success"
                    : "align-middle b-noData"
                }
              >
                {block.block_name}
              </td>
              <td className="align-middle">{block.alert}</td>
              <td className="align-middle">
                {block.block_issue_types instanceof Array
                  ? block.block_issue_types.map((issueType, index) =>
                      issueType.alert === block.alert
                        ? issueType.issue_type_name + ", "
                        : ""
                    )
                  : null}

                {block.scout_alert === block.alert ? "Scout" : null}
              </td>
              <td className="align-middle">{block.last_scouted.date}</td>
              <td className="align-middle">{block.last_scouted.personnel}</td>
              <td className="align-middle">{block.last_scouted.time}</td>
              <td className="d-flex justify-content-between align-items-center">
                {/* <Link to="/blockView" params={{ block_id: block.block_id }}> */}
                <NewButton
                  className="btn btn-danger rounded-0 d-flex btn-sm"
                  label="Blocks View"
                  onClick={() => {
                    // this.getCurrentBlockId(block.block_id);
                    this.props.history.push({
                      pathname: "/blockView",
                      state: { block_id: block.block_id }
                    });
                  }}
                />
                {/* </Link> */}
                <NewButton
                  className="btn btn-primary rounded-0 d-flex text-nowrap btn-sm"
                  label="Print View"
                  dataToggle="modal"
                  dataTarget={"#printView" + block.block_id}
                  onClick={() => this.fetchtPrintReport(block.block_id)}
                />
                <NewPrintView
                  printReport={printReport}
                  blockName={block.block_name}
                  _id={block.block_id}
                  onChange={this.onChange}
                  search_variety={search_variety}
                  search_issue={search_issue}
                  search_scout={search_scout}
                  search_date={search_date}
                  allVariety={allVariety}
                  allIssues={allIssues}
                  allScouts={allScouts}
                  preloaderStyle={preloaderStyle}
                />
              </td>
            </tr>
          ))
        : null;
    return (
      <React.Fragment>
        <NewNavBar label="FARM VIEW" />
        <DashboardSummaryMenu
          breadCrumb={
            <React.Fragment>
              <li className="breadcrumb-item">
                <Link className=" text-decoration-none" to="/dashboard">
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Farm
              </li>
            </React.Fragment>
          }
        />
        <Preloader preloaderStyle={preloaderStyle} />
        <section className="d-flex col-md-12">
          <NewTable
            tableHead={
              <tr>
                <th scope="col">#</th>
                <th scope="col">Block Name</th>
                <th scope="col">Status</th>
                <th scope="col">Description</th>
                <th scope="col">Last Scouted</th>
                <th scope="col">Last Scouted By</th>
                <th scope="col">Total Time</th>
                <th scope="col" className="w-200p">
                  Actions
                </th>
              </tr>
            }
            tableBody={<React.Fragment>{allBlocks}</React.Fragment>}
          />
        </section>
      </React.Fragment>
    );
  }
}

NewFarmView.propTypes = {
  printReport: PropTypes.array,
  blocksReport: PropTypes.array,
  farmReport: PropTypes.func.isRequired,
  fetchtPrintReport: PropTypes.func.isRequired,
  fetchAllVariety: PropTypes.func.isRequired,
  allVariety: PropTypes.array,
  allIssues: PropTypes.array,
  fetchAllIssue: PropTypes.func.isRequired,
  fetchAllPersonnel: PropTypes.func.isRequired,
  allScouts: PropTypes.array
};

const mapStateToProps = state => ({
  auth: state.auth,
  printReport: state.printReport.printReport,
  blocksReport: state.scout.farmReportAlert,
  allVariety: state.scout.allVariety,
  allIssues: state.issue.allIssue,
  allScouts: state.personnel.allScouts
});

export default connect(mapStateToProps, {
  fetchtPrintReport,
  farmReport,
  fetchAllVariety,
  fetchAllIssue,
  fetchAllPersonnel,
  fetchScouts
})(withRouter(NewFarmView));
