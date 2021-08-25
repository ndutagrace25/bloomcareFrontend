import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import moment from "moment";

import {
  fetchPoint,
  createPoint,
  updatePoint,
  deletePoint
} from "../../actions/pointActions";

import {
  NewTableContainer,
  // NewButton,
  Pagination,
  ExportButton,
  Preloader
} from "../common";
import { NewPointFilter, NewPointList } from ".";
class NewPointLayout extends Component {
  state = {
    page: 0,
    limit: 10,
    count: 0,
    name: "",
    point: {},
    errors: {},
    preloaderStyle: "d-none",
    pointCount: 0,
    successMessage: "",
    create_name: "",
    search_name: "",
    exportpoint: []
  };

  handlePreloaderStyle = newStyle => {
    this.setState({ preloaderStyle: newStyle });
  };

  clearModalErrorAfterClose = () => {
    this.setState({
      errors: {},
    })
  }

  onChange = e => {
   const { page, limit, search_name,} = this.state;
   this.setState({
     [e.target.name]: e.target.value
   });
   this.fetchPoint(page, limit, e.target.value, search_name);
  };

  onChangeNumber = e => {
    this.setState({
      [e.target.name]: parseInt(e.target.value)
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { page, limit, search_name } = this.state;

    this.fetchPoint(page, limit, search_name);
  };

  handleCloseSearch = () => {
    this.setState({
      search_name: ""
    });

    const { page, limit } = this.state;

    this.fetchPoint(page, limit, "");
  };

  handleIncrementPage = e => {
    e.preventDefault();
    const { page, limit, count, name } = this.state;
    const totalPages = Math.ceil(count / limit);
    const newPage = page + 1;

    if (newPage < totalPages) {
      this.setState({ page: newPage, pointCount: newPage * limit });
      this.fetchPoint(newPage, limit, name);
    }
  };

  handleDecrementPage = e => {
    e.preventDefault();
    const { page, limit, name } = this.state;
    const newPage = page - 1;
    if (newPage >= 0) {
      this.setState({ page: newPage, pointCount: newPage * limit });
      this.fetchPoint(newPage, limit, name);
    }
  };

  handleOnChangePage = e => {
    const { limit, name } = this.state;
    const newPage = parseInt(e.target.value);
    this.setState({ [e.target.name]: newPage, pointCount: newPage * limit });
    this.fetchPoint(newPage, limit, name);
  };

  handleCreatePoint = point => {
    this.handlePreloaderStyle("d-block");
    this.setState({
      create_name: point.name
    });
    this.props.createPoint(point);
  };

  fetchPoint = (page, limit, name) => {
    this.handlePreloaderStyle("d-block");
    this.props.fetchPoint(page, limit, name);
  };

  componentDidMount() {
    const { page, limit, name } = this.state;
    this.fetchPoint(page, limit, name);
  }

  componentWillReceiveProps(nextProps) {
    this.handlePreloaderStyle("d-none");
    if (nextProps.point.items) {
      const newpoint = nextProps.point;
      this.setState({
        point: newpoint,
        count: nextProps.point.rows,
        exportpoint: nextProps.point.items
      });
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }

    if (nextProps.pointCreated) {
      const pointCreated = nextProps.pointCreated;
      if (pointCreated.message === "Success") {
        this.setState({
          successMessage: pointCreated.message,
          create_name: ""
        });
        JSON.stringify(Swal.fire("point Created Successful", "", "success"));
        const { page, limit, name } = this.state;
        this.fetchPoint(page, limit, name);
        nextProps.pointCreated.message = "";
      }
    }

    if (nextProps.pointDeleted) {
      const pointDeleted = nextProps.pointDeleted;

      if (pointDeleted.message === "Success") {
        this.setState({
          successMessage: pointDeleted.message
        });

        nextProps.pointDeleted.message = "";
        const { page, limit, name } = this.state;
        this.fetchPoint(page, limit, name);
      }
    }

    if (nextProps.pointUpdated) {
      const pointUpdated = nextProps.pointUpdated;

      if (pointUpdated.message === "Success") {
        this.setState({
          successMessage: pointUpdated.message
        });

        JSON.stringify(Swal.fire("point Updated Successful", "", "success"));
        nextProps.pointUpdated.message = "";
        const { page, limit, name } = this.state;
        this.fetchPoint(page, limit, name);
      }
    }
  }

  render() {
    const {
      point,
      preloaderStyle,
      errors,
      page,
      limit,
      count,
      pointCount,
      successMessage,
      // create_name,
      search_name,
      exportpoint
    } = this.state;

    const exportpoints = exportpoint.map(point => {
      const data = { point_Name: point.point_name };
      return data;
    });

    return (
      <React.Fragment>
        <div
          className="tab-pane fade col-md-12 px-n15"
          id="pointlayout"
          role="tabpanel"
          aria-labelledby="v-pills-home-tab"
        >
          <Preloader
            preloaderStyle={preloaderStyle}
            data-test="PreloaderComponent"
          />
          <div className="d-flex">
            <NewPointFilter
              onChange={this.onChange}
              onChangeNumber={this.onChangeNumber}
              handleSearch={this.handleSearch}
              handleCloseSearch={this.handleCloseSearch}
              search_name={search_name}
            />
            <NewTableContainer
              buttonContainer={
                <React.Fragment>
                  {/* CREATE POINT IS DISABLED AT THE MOMENT */}
                  {/* <NewButton
                    className="btn btn-info rounded-0 d-flex flex-nowrap align-items-center"
                    dataToggle="modal"
                    dataTarget="#creatpoint"
                    label="Add Point"
                    otherProperties={
                      <img
                        src={require("../../assets/img/add-icon.svg")}
                        height="20"
                        alt="add_station"
                        className="mr-sm-1"
                      ></img>
                    }
                  />
                  <NewCreatePoint
                    handlePreloaderStyle={this.handlePreloaderStyle}
                    handleCreatePoint={this.handleCreatePoint}
                    errors={errors}
                    name={create_name}
                    successMessage={successMessage}
                    clearModalErrorAfterClose={this.clearModalErrorAfterClose}
                  /> */}
                  <ExportButton
                    data={exportpoints}
                    filename={
                      moment().format("DD/MM/YYYY H:mm:ss") + " Points.csv"
                    }
                  />
                </React.Fragment>
              }
              tableContent={
                <React.Fragment>
                  <NewPointList
                    point={point}
                    errors={errors}
                    pointCount={pointCount + 1}
                    updatePoint={this.props.updatePoint}
                    deletePoint={this.props.deletePoint}
                    handlePreloaderStyle={this.handlePreloaderStyle}
                    successMessage={successMessage}
                  />
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
              }
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

NewPointLayout.propTypes = {
  fetchPoint: PropTypes.func.isRequired,
  point: PropTypes.object.isRequired,
  createPoint: PropTypes.func.isRequired,
  updatePoint: PropTypes.func.isRequired,
  deletePoint: PropTypes.func.isRequired,
  errors: PropTypes.object,
  auth: PropTypes.object
};

const mapStateToProps = state => ({
  point: state.point.point,
  errors: state.point.pointErrors,
  pointCreated: state.point.pointCreated,
  pointDeleted: state.point.pointDeleted,
  pointUpdated: state.point.pointUpdated
});

export default connect(mapStateToProps, {
  fetchPoint,
  createPoint,
  updatePoint,
  deletePoint
})(NewPointLayout);
