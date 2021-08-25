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
  Navbar,
  //   Error,
  Preloader,
  ContentContainer,
  ExportButton,
  Pagination,
  TableWrap
} from "../common";

import { PointList, SearchPoint, CreatePoint } from ".";

class PointLayout extends Component {
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

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
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
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
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
      create_name,
      search_name,
      exportpoint
    } = this.state;

    const exportpoints = exportpoint.map(point => {
      const data = { point_Name: point.name };
      return data;
    });

    return (
      <div className="components-view" data-test="PointLayoutComponent">
        <Preloader
          preloaderStyle={preloaderStyle}
          data-test="PreloaderComponent"
        />
        <Navbar data-test="NavbarComponent" />
        {/* <Error message={errors} /> */}
        <ContentContainer
          data-test="ContainerComponent"
          content={
            <React.Fragment>
              <TableWrap
                tableTitle="Points"
                createButton={
                  <CreatePoint
                    handlePreloaderStyle={this.handlePreloaderStyle}
                    handleCreatePoint={this.handleCreatePoint}
                    errors={errors}
                    name={create_name}
                    successMessage={successMessage}
                  />
                }
                exportButton={
                  <ExportButton
                    data={exportpoints}
                    filename={
                      moment().format("DD/MM/YYYY H:mm:ss") + " point.csv"
                    }
                  />
                }
                tableContent={
                  <React.Fragment>
                    {" "}
                    <PointList
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
              <SearchPoint
                onChange={this.onChange}
                onChangeNumber={this.onChangeNumber}
                handleSearch={this.handleSearch}
                handleCloseSearch={this.handleCloseSearch}
                search_name={search_name}
              />
            </React.Fragment>
          }
        />
      </div>
    );
  }
}

PointLayout.propTypes = {
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
  auth: state.auth,
  pointCreated: state.point.pointCreated,
  pointDeleted: state.point.pointDeleted,
  pointUpdated: state.point.pointUpdated
});

export default connect(
  mapStateToProps,
  {
    fetchPoint,
    createPoint,
    updatePoint,
    deletePoint
  }
)(PointLayout);
