import React, { Component } from "react";
import {
  NewNavBar,
  NewTable,
  Pagination,
  Preloader,
  ExportButton
} from "../common";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";

import { fetchScout, fetchAllScouts } from "../../actions/scoutActions";

class ScoutingReport extends Component {
  state = {
    scout: [],
    allScouts: [],
    page: 0,
    limit: 10,
    count: 0,
    preloaderStyle: "d-none",
    date: "",
    entry: "",
    point: "",
    issue: "",
    block: "",
    bed: "",
    variety: "",
    issueCategory: "",
    tolerance: "",
    value: "",
    latitude: "",
    longitude: "",
    scout_personnel: "",
    score: "",
    issue_type: "",
    scoutCount: 0
  };

  handlePreloaderStyle = newStyle => {
    this.setState({ preloaderStyle: newStyle });
  };

  handleIncrementPage = e => {
    e.preventDefault();
    const {
      page,
      limit,
      count,
      date,
      entry,
      point,
      issue,
      block,
      bed,
      variety,
      issueCategory,
      tolerance,
      value,
      latitude,
      longitude,
      scout_personnel,
      score,
      issue_type
    } = this.state;

    const totalPages = Math.ceil(count / limit);
    const newPage = page + 1;

    if (newPage < totalPages) {
      this.setState({ page: newPage, scoutCount: newPage * limit });
      this.fetchScout(
        newPage,
        limit,
        date,
        entry,
        point,
        issue,
        block,
        bed,
        variety,
        issueCategory,
        tolerance,
        value,
        latitude,
        longitude,
        scout_personnel,
        score,
        issue_type
      );
    }
  };

  handleDecrementPage = e => {
    e.preventDefault();
    const {
      page,
      limit,
      date,
      entry,
      point,
      issue,
      block,
      bed,
      variety,
      issueCategory,
      tolerance,
      value,
      latitude,
      longitude,
      scout_personnel,
      score,
      issue_type
    } = this.state;
    const newPage = page - 1;
    if (newPage >= 0) {
      this.setState({ page: newPage, scoutCount: newPage * limit });
      this.fetchScout(
        newPage,
        limit,
        date,
        entry,
        point,
        issue,
        block,
        bed,
        variety,
        issueCategory,
        tolerance,
        value,
        latitude,
        longitude,
        scout_personnel,
        score,
        issue_type
      );
    }
  };

  handleOnChangePage = e => {
    const {
      limit,
      date,
      entry,
      point,
      issue,
      block,
      bed,
      variety,
      issueCategory,
      tolerance,
      value,
      latitude,
      longitude,
      scout_personnel,
      score,
      issue_type
    } = this.state;
    const newPage = parseInt(e.target.value);
    this.setState({ [e.target.name]: newPage, scoutCount: newPage * limit });
    this.fetchScout(
      newPage,
      limit,
      date,
      entry,
      point,
      issue,
      block,
      bed,
      variety,
      issueCategory,
      tolerance,
      value,
      latitude,
      longitude,
      scout_personnel,
      score,
      issue_type
    );
  };

  fetchScout = (
    page,
    limit,
    date,
    entry,
    point,
    issue,
    block,
    bed,
    variety,
    issueCategory,
    tolerance,
    value,
    latitude,
    longitude,
    scout_personnel,
    score,
    issue_type
  ) => {
    this.handlePreloaderStyle("d-block");
    this.props.fetchScout(
      page,
      limit,
      date,
      entry,
      point,
      issue,
      block,
      bed,
      variety,
      issueCategory,
      tolerance,
      value,
      latitude,
      longitude,
      scout_personnel,
      score,
      issue_type
    );
  };

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
    const {
      page,
      limit,
      date,
      entry,
      point,
      issue,
      block,
      bed,
      variety,
      issueCategory,
      tolerance,
      value,
      latitude,
      longitude,
      scout_personnel,
      score,
      issue_type
    } = this.state;
    this.props.fetchAllScouts();
    this.fetchScout(
      page,
      limit,
      date,
      entry,
      point,
      issue,
      block,
      bed,
      variety,
      issueCategory,
      tolerance,
      value,
      latitude,
      longitude,
      scout_personnel,
      score,
      issue_type
    );
  }

  componentWillReceiveProps(nextProps) {
    this.handlePreloaderStyle("d-none");

    if (nextProps.scout) {
      this.setState({
        scout: nextProps.scout.items,
        count: nextProps.scout.rows
      });
    }
    if (nextProps.allScouts) {
      this.setState({
        allScouts: nextProps.allScouts
      });
    }
  }
  render() {
    const {
      allScouts,
      scout,
      page,
      limit,
      count,
      preloaderStyle,
      scoutCount
    } = this.state;

    const AllScouts =
      allScouts instanceof Array
        ? allScouts.map(scout => {
            const allData = {
              First_Name: scout.personnel_first_name,
              Last_Name: scout.personnel_last_name,
              Scout_Date: moment(scout.scout_date).format("DD/MM/YYYY"),
              Block: scout.block_name,
              Bed: scout.bed_name,
              Station: scout.station_name,
              Variety: scout.variety_name,
              Point: scout.point_name,
              Tolerance: scout.tolerance_name,
              Issue: scout.issue_name,
              Issue_Category: scout.issue_category_name,
              Value: scout.scout_value
            };

            return allData;
          })
        : null;

    let scoutCnt = scoutCount + 1;

    const ScoutList =
      scout instanceof Array
        ? scout.map((scout, index) => (
            <React.Fragment key={index}>
              <tr key={index}>
                <td style={{ width: "10px" }}>{scoutCnt++}</td>
                <td>
                  {scout.personnel_first_name === null
                    ? ""
                    : scout.personnel_first_name +
                      " " +
                      scout.personnel_last_name}
                  {/* {scout.created_by.first_name} {scout.created_by.last_name} */}
                </td>
                <td>{moment(scout.scout_date).format("DD/MM/YYYY")}</td>
                <td>{scout.block_name}</td>
                <td>{scout.bed_name}</td>
                <td>{scout.variety_name}</td>
                <td>{scout.station_name}</td>
                <td>{scout.point_name}</td>
                {/* <td>{scout.issue.score.name}</td> */}
                <td>
                  {scout.tolerance_name === null ? "" : scout.tolerance_name}
                </td>
                {/* <td>
        {typeof scout.issueCategory.name === "undefined"
          ? ""
          : 'getting there'}
      </td> */}
                <td>{scout.issue_category_name}</td>
                <td>{scout.issue_name}</td>
                {/* <td>{scout.issue.tolerance_type.name}</td> */}
                <td>{scout.scout_value}</td>
              </tr>
            </React.Fragment>
          ))
        : null;
    return (
      <React.Fragment>
        <NewNavBar label="SCOUT REPORT" />
        <Preloader preloaderStyle={preloaderStyle} />
        <section className="col-md-12 my-2">
          <div className="d-flex mx-auto justify-content-around">
            <ExportButton
              data={AllScouts}
              filename={
                moment().format("DD/MM/YYYY H:mm:ss") + " ScoutReport.csv"
              }
            />

            {/* <button
              type="button"
              className="btn btn-primary rounded-0 d-flex flex-nowrap align-items-center"
              onClick={() => window.print()}
            >
              <img
                src={require("../../assets/img/print-icon.svg")}
                height="20"
                alt="print"
                className="mr-sm-1"
              />
              Export
            </button> */}
          </div>
          <div className="position-absolute r-15">
            <button
              className="btn btn-primary rounded-0"
              type="button"
              data-toggle="collapse"
              data-target="#collapseExample"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              Collapsable Form
            </button>
            <div className="collapse" id="collapseExample">
              <form className="bg-white p-4 shadow min-w-400p">
                <h6>Filter by</h6>
                <div className="form-group d-flex flex-row flex-nowrap align-items-baseline">
                  <label className="col-sm-4 pl-n15 text-nowrap">
                    Issue Category:
                  </label>
                  <select className="col-sm-8 form-control form-control-sm">
                    <option>--Select Scout--</option>
                    <option>issue 1</option>
                    <option>issue 2</option>
                    <option>issue 3</option>
                    <option>issue 4</option>
                  </select>
                </div>
                <div className="form-group d-flex flex-row flex-nowrap align-items-baseline">
                  <label className="col-sm-4 pl-n15 text-nowrap">Block:</label>
                  <select className="col-sm-8 form-control form-control-sm">
                    <option>--Select Block--</option>
                    <option>block 1</option>
                    <option>block 2</option>
                    <option>block 3</option>
                    <option>block 4</option>
                  </select>
                </div>
                <div className="form-group d-flex flex-row flex-nowrap align-items-baseline">
                  <label className="col-sm-4  pl-n15 text-nowrap">Date:</label>
                  <input
                    type="date"
                    className="form-control form-control-sm col-sm-8"
                  />
                </div>

                <button
                  type="reset"
                  className="btn btn-outline-danger d-flex mr-auto rounded-0"
                >
                  RESET
                </button>
              </form>
            </div>
          </div>
        </section>
        <section className="d-flex col-md-12">
          <NewTable
            tableHead={
              <tr>
                <th scope="col">#</th>
                <th scope="col">Scout</th>
                <th scope="col">Date</th>
                <th scope="col">Block</th>
                <th scope="col">Bed</th>
                <th scope="col">Variety</th>
                <th scope="col">Station</th>
                <th scope="col">Point</th>
                <th scope="col">Tolerance</th>
                <th scope="col">Issue Category</th>
                <th scope="col">Issue</th>
                {/* <th scope="col">Tolerance Type</th> */}
                <th scope="col">Value</th>
              </tr>
            }
            tableBody={ScoutList}
          />
        </section>
        {count > 10 ? (
          <Pagination
            page={page}
            limit={limit}
            count={count}
            handleDecrementPage={this.handleDecrementPage}
            handleIncrementPage={this.handleIncrementPage}
            handleOnChangePage={this.handleOnChangePage}
          />
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}

ScoutingReport.propTypes = {
  scout: PropTypes.object,
  allScouts: PropTypes.array,
  fetchAllScouts: PropTypes.func,
  fetchScout: PropTypes.func
};

const mapStateToProps = state => ({
  scout: state.scout.scout,
  auth: state.auth,
  allScouts: state.scout.allScouts
});

export default connect(mapStateToProps, { fetchScout, fetchAllScouts })(
  ScoutingReport
);
