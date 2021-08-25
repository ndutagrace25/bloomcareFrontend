import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  NewNavBar,
  DashboardSummaryMenu,
  Preloader,
  NewTable
} from "../common";
import {
  fetchBlockReport,
  fetchBedReport,
  fetchEntryReport,
  farmReportByDate
} from "../../actions/scoutActions";

class NewBedView extends Component {
  state = {
    allBlock: [],
    allBeds: [],
    block_id: "",
    preloaderStyle: "d-none",
    allStations: [],
    bed_id: "",
    // created: new Date().toISOString().substring(0, 10),
    created: "",
    station_id: "",
    stationReport: [],
    stationName: ""
  };

  fetchAllReports = () => {
    const { created } = this.state;
    this.handlePreloaderStyle("d-block");
    // this.props.farmReport();
    this.props.farmReportByDate(created);
  };

  handlePreloaderStyle = newStyle => {
    this.setState({ preloaderStyle: newStyle });
  };

  fetchBlockBeds = blockId => {
    this.handlePreloaderStyle("d-block");
    const { created } = this.state;
    this.setState({
      block_id: blockId
    });
    this.props.fetchBlockReport(blockId, created);
  };

  fetchBedStations = bedId => {
    const { created, station_id } = this.state;
    this.handlePreloaderStyle("d-block");
    this.setState({
      bed_id: bedId
    });
    this.props.fetchBedReport(bedId, created);
    this.props.fetchEntryReport(station_id, bedId, created);
  };

  fetchStationsReport = (stationId, bedId) => {
    const { created } = this.state;
    this.handlePreloaderStyle("d-block");
    this.setState({
      station_id: stationId
    });
    this.props.fetchEntryReport(stationId, bedId, created);
    this.fetchBedStations(bedId);
  };

  onChange = e => {
    this.handlePreloaderStyle("d-block");
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
    const { station_id, bed_id, created, block_id } = this.state;
    this.props.farmReportByDate(created);
    this.props.fetchEntryReport(station_id, bed_id, created);
    this.fetchBedStations(bed_id);
    this.props.fetchBlockReport(block_id, created);
  };

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    } else {
      this.fetchAllReports();
      this.setState({
        block_id: this.props.location.state.block_id,
        bed_id: this.props.location.state.bed_id
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    this.handlePreloaderStyle("d-none");
    if (nextProps.allBlock) {
      this.setState({
        allBlock: nextProps.allBlock
      });
    }
    if (nextProps.allBeds) {
      this.setState({
        allBeds: nextProps.allBeds.beds
      });
    }
    if (nextProps.allStations) {
      this.setState({
        allStations: nextProps.allStations
      });
    }
    if (nextProps.stationReport) {
      this.setState({
        stationReport: nextProps.stationReport.entryArray,
        stationName: nextProps.stationReport.fetchedEntryName
      });
    }
  }

  checkActiveBlockTab = (blockAlert, blockId) => {
    const { block_id } = this.state;
    let className;
    if (blockAlert === "Danger") {
      if (blockId === block_id) {
        className = "nav-link px-4 py-3 text-nowrap b-danger active";
      } else {
        className = "nav-link px-4 py-3 text-nowrap b-danger";
      }
    } else if (blockAlert === "Warning") {
      if (blockId === block_id) {
        className = "nav-link px-4 py-3 text-nowrap b-warning active";
      } else {
        className = "nav-link px-4 py-3 text-nowrap b-warning";
      }
    } else if (blockAlert === "Success") {
      if (blockId === block_id) {
        className = "nav-link px-4 py-3 text-nowrap b-success active";
      } else {
        className = "nav-link px-4 py-3 text-nowrap b-success";
      }
    } else {
      if (blockId === block_id) {
        className = "nav-link px-4 py-3 text-nowrap b-noData active";
      } else {
        className = "nav-link px-4 py-3 text-nowrap b-noData";
      }
    }
    return className;
  };

  checkActiveBedTab = (bedkAlert, bedId) => {
    const { bed_id } = this.state;
    let className;
    if (bedkAlert === "Danger") {
      if (bedId === bed_id) {
        className =
          "nav-link px-3 py-2 text-nowrap text-nowrap bd-danger active";
      } else {
        className = "nav-link px-3 py-2 text-nowrap text-nowrap bd-danger";
      }
    } else if (bedkAlert === "Warning") {
      if (bedId === bed_id) {
        className =
          "nav-link px-3 py-2 text-nowrap text-nowrap bd-warning active";
      } else {
        className = "nav-link px-3 py-2 text-nowrap text-nowrap bd-warning";
      }
    } else if (bedkAlert === "Success") {
      if (bedId === bed_id) {
        className =
          "nav-link px-3 py-2 text-nowrap text-nowrap bd-success active";
      } else {
        className = "nav-link px-3 py-2 text-nowrap text-nowrap bd-success";
      }
    } else {
      if (bedId === bed_id) {
        className = "nav-link px-3 py-2 text-nowrap bd-noData active";
      } else {
        className = "nav-link px-3 py-2 text-nowrap bd-noData";
      }
    }
    return className;
  };

  checkActiveStationTab = (stationAlert, stationId) => {
    const { station_id } = this.state;
    let className;
    if (stationAlert === "Danger") {
      if (stationId === station_id) {
        className = "nav-link pl-3 pr-2 py-2 text-nowrap b-danger active";
      } else {
        className = "nav-link pl-3 pr-2 py-2 text-nowrap b-danger";
      }
    } else if (stationAlert === "Warning") {
      if (stationId === station_id) {
        className = "nav-link pl-3 pr-2 py-2 text-nowrap b-warning active";
      } else {
        className = "nav-link pl-3 pr-2 py-2 text-nowrap b-warning";
      }
    } else if (stationAlert === "Success") {
      if (stationId === station_id) {
        className = "nav-link pl-3 pr-2 py-2 text-nowrap b-success active";
      } else {
        className = "nav-link pl-3 pr-2 py-2 text-nowrap b-success";
      }
    } else {
      if (stationId === station_id) {
        className = "nav-link pl-3 pr-2 py-2 text-nowrap b-noData active";
      } else {
        className = "nav-link pl-3 pr-2 py-2 text-nowrap b-noData";
      }
    }
    return className;
  };

  render() {
    const {
      allBlock,
      allBeds,
      block_id,
      preloaderStyle,
      allStations,
      bed_id,
      stationName,
      stationReport,
      station_id,
      created
    } = this.state;
    // fetch all blocks
    const getBlocks =
      allBlock instanceof Array
        ? allBlock.map((block, index) => (
            <a
              className={this.checkActiveBlockTab(block.alert, block.block_id)}
              id={block.block_id + "-tab"}
              data-toggle="pill"
              href={"#" + block.block_id}
              role="tab"
              aria-controls={block.block_id}
              aria-selected="true"
              key={index}
              onClick={() => this.fetchBlockBeds(block.block_id)}
            >
              {block.block_name.substr(block.block_name.indexOf(" ") + 1)}
            </a>
          ))
        : null;

    //   fetch beds belonging to a particular block
    const AllBeds =
      allBeds instanceof Array
        ? allBeds.map((bed, index) => (
            <React.Fragment key={index}>
              <a
                className={this.checkActiveBedTab(bed.alert, bed.bed_id)}
                id={bed.bed_id + "-tab"}
                data-toggle="pill"
                href={"#" + bed.bed_id}
                role="tab"
                aria-controls={bed.bed_id}
                aria-selected="true"
                onClick={() => this.fetchBedStations(bed.bed_id)}
              >
                {bed.bed_number}
              </a>
            </React.Fragment>
          ))
        : null;

    // fetch all stations belonging to a bed
    const AllStations =
      allStations instanceof Array
        ? allStations.map((station, index) => (
            <React.Fragment key={index}>
              <a
                className={this.checkActiveStationTab(
                  station.alert,
                  station.entry_id
                )}
                id={station_id + "-tab"}
                data-toggle="pill"
                href={"#" + station_id}
                role="tab"
                aria-controls={station_id}
                aria-selected="false"
                onClick={() =>
                  this.fetchStationsReport(station.entry_id, bed_id)
                }
              >
                {station.entry_name.substr(station.entry_name.indexOf(" ") + 1)}
              </a>
            </React.Fragment>
          ))
        : null;

    let count = 1;

    // fetch station report
    const AllStationReport =
      stationReport instanceof Array
        ? stationReport.map((point, index) => (
            <tr key={index}>
              <th className="align-middle" scope="row">
                {count++}
              </th>
              <td
                className={
                  point.alert === "Danger"
                    ? "align-middle bd-danger"
                    : point.alert === "Warning"
                    ? "align-middle bd-warning"
                    : point.alert === "Success"
                    ? "align-middle bd-success"
                    : "align-middle bd-noData"
                }
              >
                {point.point_name}
              </td>
              <td>{point.issue_type_name}</td>
              <td>{point.issue_name}</td>
              <td>{point.issue_category}</td>
              <td>{point.value}</td>
              <td>{point.scoring}</td>
            </tr>
          ))
        : null;
    return (
      <React.Fragment>
        <NewNavBar label="BED VIEW" />
        <DashboardSummaryMenu
          breadCrumb={
            <React.Fragment>
              <li className="breadcrumb-item">
                <Link className=" text-decoration-none" to="/dashboard">
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link className="text-decoration-none" to="/farmView">
                  Farm
                </Link>
              </li>
              <li
                className="breadcrumb-item"
                onClick={() =>
                  this.props.history.push({
                    pathname: "/blockView",
                    state: { block_id: block_id }
                  })
                }
              >
                <Link
                  className="text-decoration-none"
                  to="/blockView"
                  params={{ block_id }}
                >
                  Blocks
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Beds
              </li>
            </React.Fragment>
          }
        />
        <Preloader preloaderStyle={preloaderStyle} />
        <section className="d-flex col-md-12 px-n15 height88">
          <div className="d-flex flex-column mt-2 col-xm-2 px-n15 border-right">
            <h6 className="px-4 mb-2">BLOCKS</h6>
            <div
              className="nav flex-column nav-pills text-grey"
              role="tablist"
              aria-orientation="vertical"
            >
              {getBlocks}
            </div>
          </div>

          <div className="tab-content px-n15 w-100" id="v-pills-tabContent">
            <div
              className="tab-pane fade show active col-md-12 px-n15"
              id={block_id}
              role="tabpanel"
              aria-labelledby={block_id + "-tab"}
            >
              <div className="d-flex">
                <div className="d-flex flex-column mt-2 col-sm-1 border-right px-n15">
                  <h6 className="mb-2 px-15">BEDS</h6>
                  {/* <form action="" className="mb-2 px-15">
                    <input
                      type="number"
                      className="form-control form-control-sm"
                      placeholder="search..."
                    />
                  </form> */}

                  <div
                    className="overflow-auto"
                    id={block_id}
                    role="tabpanel"
                    aria-labelledby={block_id + "-tab"}
                  >
                    <div
                      className="nav flex-column nav-pills text-grey"
                      role="tablist"
                      aria-orientation="vertical"
                    >
                      {AllBeds}
                    </div>
                  </div>
                </div>
                <div
                  className="tab-content col-sm-11 px-n15 "
                  id="bed-pills-tabContent"
                >
                  <div
                    className="main tab-pane fade show active"
                    id={bed_id}
                    role="tabpanel"
                    aria-labelledby={bed_id + "-tab"}
                  >
                    <div className="d-flex">
                      <div className="d-flex flex-column mt-2 col-sm-1 border-right px-n15">
                        <h6 className="mb-2 px-15">STATIONS</h6>
                        {/* <form action="" className="mb-2 px-15">
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            placeholder="search..."
                          />
                        </form> */}

                        <div className="overflow-auto">
                          <div
                            className="nav flex-column nav-pills text-grey"
                            role="tablist"
                            aria-orientation="vertical"
                          >
                            {AllStations}
                          </div>
                        </div>
                      </div>

                      <div
                        className="tab-content col-sm-11"
                        id="bed-pills-tabContent"
                      >
                        <div
                          className="tab-pane fade show active"
                          id={station_id}
                          role="tabpanel"
                          aria-labelledby={station_id + "-tab"}
                        >
                          <div className="d-flex flex-row justify-content-between align-items-end my-2">
                            <h5 className="mb-0 text-uppercase">
                              {stationName}
                            </h5>
                            <form className="form-inline">
                              <div className="form-group">
                                <label htmlFor="dateFrom">Date:</label>
                                <input
                                  type="date"
                                  className="form-control form-control-sm ml-sm-2"
                                  value={created}
                                  name="created"
                                  onChange={this.onChange}
                                />
                              </div>
                            </form>
                          </div>
                          <NewTable
                            tableHead={
                              <tr>
                                <th scope="col">#</th>
                                <th scope="col">Point</th>
                                <th scope="col">Issue Type</th>
                                <th scope="col">Issue </th>
                                <th scope="col">Issue Category</th>
                                <th scope="col">Scoring Value</th>
                                <th scope="col">Scoring</th>
                              </tr>
                            }
                            tableBody={AllStationReport}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

NewBedView.propTypes = {
  farmReport: PropTypes.func.isRequired,
  farmReportByDate: PropTypes.func.isRequired,
  allBlock: PropTypes.array.isRequired,
  fetchBlockReport: PropTypes.func,
  allBeds: PropTypes.object,
  fetchBedReport: PropTypes.func,
  allStations: PropTypes.array,
  fetchEntryReport: PropTypes.func,
  stationReport: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth,
  allBlock: state.scout.farmReportByDate,
  allBeds: state.scout.blockReport,
  allStations: state.scout.bedReport.bedArray,
  stationReport: state.scout.entryReport
});

export default connect(mapStateToProps, {
  fetchBlockReport,
  fetchBedReport,
  fetchEntryReport,
  farmReportByDate
})(withRouter(NewBedView));
