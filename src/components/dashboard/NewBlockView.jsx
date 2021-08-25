import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  NewNavBar,
  DashboardSummaryMenu,
  Preloader,
  NewTable,
  Pagination
} from "../common";
import {
  farmReport,
  fetchBlockReport,
  fetchBlockReportPaginated
} from "../../actions/scoutActions";

import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

class NewBlockView extends Component {
  state = {
    allBlock: [],
    preloaderStyle: "d-none",
    blockReport: [],
    block_id: "",
    page: 0,
    limit: 50,
    count: 0,
    bedCount: 0,
    blockReportPaginated: []
  };

  handleIncrementPage = e => {
    e.preventDefault();
    const { page, limit, count, block_id } = this.state;

    const totalPages = Math.ceil(count / limit);

    const newPage = page + 1;

    if (newPage < totalPages) {
      this.setState({ page: newPage, bedCount: newPage * limit });
      this.props.fetchBlockReportPaginated(newPage, limit, block_id);
    }
  };

  handleDecrementPage = e => {
    e.preventDefault();
    const { page, limit, block_id } = this.state;
    const newPage = page - 1;
    if (newPage >= 0) {
      this.setState({ page: newPage, bedCount: newPage * limit });
      this.props.fetchBlockReportPaginated(newPage, limit, block_id);
    }
  };

  handleOnChangePage = e => {
    const { limit, block_id } = this.state;
    const newPage = parseInt(e.target.value);
    this.setState({
      [e.target.name]: newPage,
      bedCount: newPage * limit
    });
    this.props.fetchBlockReportPaginated(newPage, limit, block_id);
  };

  handlePreloaderStyle = newStyle => {
    this.setState({ preloaderStyle: newStyle });
  };

  fetchAllReports = () => {
    const { page, limit } = this.state;

    this.handlePreloaderStyle("d-block");
    this.props.farmReport();
    // this.props.fetchBlockReport(this.props.location.state.block_id);
    this.props.fetchBlockReportPaginated(
      page,
      limit,
      this.props.location.state.block_id
    );
  };

  fetchBlockBeds = blockId => {
    const { page, limit } = this.state;
    this.handlePreloaderStyle("d-block");
    this.setState({
      block_id: blockId
    });
    // this.props.fetchBlockReport(blockId);
    this.props.fetchBlockReportPaginated(page, limit, blockId);
  };

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    } else {
      this.fetchAllReports();
      this.setState({
        block_id: this.props.location.state.block_id
      });
    }
  }

  componentWillReceiveProps = nextProps => {
    this.handlePreloaderStyle("d-none");
    if (nextProps.allBlock) {
      this.setState({
        allBlock: nextProps.allBlock
      });
    }
    if (nextProps.blockReport) {
      this.setState({
        blockReport: nextProps.blockReport.beds
      });
    }
    if (nextProps.blockReportPaginated) {
      console.log(nextProps.blockReportPaginated);
      this.setState({
        blockReportPaginated: nextProps.blockReportPaginated.items,
        count: nextProps.blockReportPaginated.rows
      });
    }
  };

  checkActiveTab = (blockAlert, blockId) => {
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

  render() {
    const {
      allBlock,
      preloaderStyle,
      block_id,
      blockReport,
      page,
      limit,
      count,
      bedCount,
      blockReportPaginated
    } = this.state;
    // fetch all blocks
    const getBlocks =
      allBlock instanceof Array
        ? allBlock.map((block, index) => (
            <a
              className={this.checkActiveTab(block.alert, block.block_id)}
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

    let rawcount = bedCount + 1;
    // fetch beds belonging to a block
    const allBeds =
      blockReportPaginated instanceof Array
        ? blockReportPaginated.map((bed, index) => (
            <React.Fragment key={index}>
              <tr
                onClick={() =>
                  this.props.history.push({
                    pathname: "/bedView",
                    state: { block_id: block_id, bed_id: bed.bed_id }
                  })
                }
                className="clickable"
              >
                <th className="align-middle" scope="row">
                  {rawcount++}
                </th>
                <td
                  className={
                    bed.alert === "Danger"
                      ? "align-middle bd-danger"
                      : bed.alert === "Warning"
                      ? "align-middle bd-warning"
                      : bed.alert === "Success"
                      ? "align-middle bd-success"
                      : "align-middle bd-noData"
                  }
                >
                  {bed.bed_name}
                </td>
                {/* <td className="align-middle">English Kate</td> */}
                <td className="align-middle">{bed.alert}</td>
                {/* <td className="align-middle">water</td> */}
                <td className="align-middle">{bed.last_scouted.date}</td>
                <td className="align-middle">{bed.last_scouted.personnel}</td>
                <td className="align-middle">{bed.last_scouted.time}</td>
              </tr>
            </React.Fragment>
          ))
        : null;

    return (
      <React.Fragment>
        <NewNavBar label="BLOCKS" />
        <Preloader preloaderStyle={preloaderStyle} />
        <DashboardSummaryMenu
          breadCrumb={
            <React.Fragment>
              <li className="breadcrumb-item">
                <Link to="/dashboard" className=" text-decoration-none">
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/farmView" className="text-decoration-none">
                  Farm
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Blocks
              </li>
            </React.Fragment>
          }
        />
        <section className="d-flex col-md-12 px-n15 height88">
          <div className="d-flex flex-column mt-2 col-xm-2 px-n15 min-w-110p border-right">
            <h5 className="px-4 mb-2">BLOCKS</h5>
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
              className="tab-pane fade show active col-md-12"
              id={block_id}
              role="tabpanel"
              aria-labelledby={block_id + "-tab"}
            >
              <NewTable
                tableHead={
                  <React.Fragment>
                    <th scope="col">#</th>
                    <th scope="col">Bed number</th>
                    {/* <th scope="col">Variety</th> */}
                    <th scope="col">Status</th>
                    {/* <th scope="col">Description</th> */}
                    <th scope="col">Date scouted</th>
                    <th scope="col">Scouted by</th>
                    <th scope="col">Total time</th>
                  </React.Fragment>
                }
                tableBody={allBeds}
              />
              {count > 10 ? (
                <Pagination
                  data-test="PaginationComponent"
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
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
NewBlockView.propTypes = {
  farmReport: PropTypes.func.isRequired,
  allBlock: PropTypes.array.isRequired,
  blockReport: PropTypes.object.isRequired,
  fetchBlockReport: PropTypes.func.isRequired,
  fetchBlockReportPaginated: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  allBlock: state.scout.farmReportAlert,
  blockReport: state.scout.blockReport,
  blockReportPaginated: state.scout.blockReportPaginated
});

export default connect(mapStateToProps, {
  farmReport,
  fetchBlockReport,
  fetchBlockReportPaginated
})(withRouter(NewBlockView));
