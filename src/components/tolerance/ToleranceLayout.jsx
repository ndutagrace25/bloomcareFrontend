import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import moment from "moment";

import {
  fetchTolerance,
  createTolerance,
  updateTolerance,
  deleteTolerance,
  fetchToleranceType,
  fetchAllTolerance
} from "../../actions/toleranceActions";

import {
  Navbar,
  Preloader,
  ContentContainer,
  TableWrap,
  ExportButton,
  Pagination
} from "../common";

import { ToleranceList, SearchTolerance, CreateTolerance } from ".";

class ToleranceLayout extends Component {
  state = {
    page: 0,
    limit: 10,
    count: 0,
    name: "",
    to: 0,
    from: 0,
    tolerance: [],
    toleranceType: [],
    tolerance_type: "",
    errors: {},
    preloaderStyle: "d-none",
    toleranceCount: 0,
    successMessage: "",
    create_name: "",
    create_from: "",
    create_to: "",
    create_type: "",
    create_tolerance_type: "",
    search_name: "",
    search_from: "",
    search_to: "",
    search_type: "",
    search_tolerance_type: ""
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

    const {
      page,
      limit,
      search_name,
      search_from,
      search_to,
      search_tolerance_type
    } = this.state;

    this.fetchTolerance(
      page,
      limit,
      search_name,
      search_from,
      search_to,
      search_tolerance_type
    );
  };

  handleCloseSearch = () => {
    this.setState({
      search_name: "",
      search_from: "",
      search_to: "",
      search_tolerance_type: ""
    });

    const { page, limit } = this.state;

    this.fetchTolerance(page, limit, "", "", "", "");
  };

  handleIncrementPage = e => {
    e.preventDefault();
    const { page, limit, count, name, from, to, tolerance_type } = this.state;

    const totalPages = Math.ceil(count / limit);
    const newPage = page + 1;

    if (newPage < totalPages) {
      this.setState({ page: newPage, toleranceCount: newPage * limit });
      this.fetchTolerance(newPage, limit, name, from, to, tolerance_type);
    }
  };

  handleDecrementPage = e => {
    e.preventDefault();
    const { page, limit, name, from, to, tolerance_type } = this.state;
    const newPage = page - 1;
    if (newPage >= 0) {
      this.setState({ page: newPage, toleranceCount: newPage * limit });
      this.fetchTolerance(newPage, limit, name, from, to, tolerance_type);
    }
  };

  handleOnChangePage = e => {
    const { limit, name, from, to, tolerance_type } = this.state;
    const newPage = parseInt(e.target.value);
    this.setState({
      [e.target.name]: newPage,
      toleranceCount: newPage * limit
    });
    this.fetchTolerance(newPage, limit, name, from, to, tolerance_type);
  };

  handleCreateTolerance = tolerance => {
    this.handlePreloaderStyle("d-block");
    this.setState({
      create_name: tolerance.name,
      create_tolerance_type: tolerance.tolerance_type
    });
    this.props.createTolerance(tolerance);
  };

  fetchTolerance = (page, limit, name, tolerance_type) => {
    this.handlePreloaderStyle("d-block");
    this.props.fetchTolerance(page, limit, name, tolerance_type);
  };

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
    this.props.fetchAllTolerance();
    const { page, limit, name, tolerance_type } = this.state;
    this.fetchTolerance(page, limit, name, tolerance_type);
    this.props.fetchToleranceType();
  }

  componentWillReceiveProps(nextProps) {
    this.handlePreloaderStyle("d-none");
    if (nextProps.tolerance.items) {
      const newtolerance = nextProps.tolerance.items;
      this.setState({
        tolerance: newtolerance,
        count: nextProps.tolerance.rows
      });
    }

    if (nextProps.toleranceType) {
      //   console.log(nextProps.toleranceType);
      this.setState({
        toleranceType: nextProps.toleranceType
      });
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }

    if (nextProps.toleranceCreated) {
      const toleranceCreated = nextProps.toleranceCreated;
      if (toleranceCreated.message === "Success") {
        this.setState({
          successMessage: toleranceCreated.message,
          create_name: "",
          create_from: "",
          create_to: "",
          create_tolerance_type: ""
        });

        JSON.stringify(
          Swal.fire("Tolerance Created Successful", "", "success")
        );
        const { page, limit, name, from, to, tolerance_type } = this.state;
        this.fetchTolerance(page, limit, name, from, to, tolerance_type);
        nextProps.toleranceCreated.message = "";
      }
    }

    if (nextProps.toleranceDeleted) {
      const toleranceDeleted = nextProps.toleranceDeleted;
      if (toleranceDeleted.message === "Success") {
        this.setState({
          successMessage: toleranceDeleted.message
        });
        nextProps.toleranceDeleted.message = "";
        const { page, limit, name, from, to, tolerance_type } = this.state;
        this.fetchTolerance(page, limit, name, from, to, tolerance_type);
      }
    }

    if (nextProps.toleranceUpdated) {
      const toleranceUpdated = nextProps.toleranceUpdated;
      if (toleranceUpdated.message === "Success") {
        this.setState({
          successMessage: toleranceUpdated.message
        });

        JSON.stringify(
          Swal.fire("Tolerance Updated Successful", "", "success")
        );
        nextProps.toleranceUpdated.message = "";
        const { page, limit, name, from, to, tolerance_type } = this.state;
        this.fetchTolerance(page, limit, name, from, to, tolerance_type);
      }
    }
  }

  render() {
    const {
      tolerance,
      toleranceType,
      preloaderStyle,
      errors,
      page,
      limit,
      count,
      toleranceCount,
      successMessage,
      create_name,
      create_from,
      create_to,
      create_tolerance_type,
      search_name,
      search_tolerance_type,
      search_from,
      search_to
    } = this.state;

    const exportTolerance = tolerance
      ? tolerance.map(tolerance => {
          const data = {
            Tolerance_Name: tolerance.name,
            From: tolerance.from,
            To: tolerance.to,
            Tolerance_Type: tolerance.tolerance_type.name
          };
          return data;
        })
      : null;

    return (
      <div className="components-view" data-test="ToleranceLayoutComponent">
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
                tableTitle="Tolerance"
                createButton={
                  <CreateTolerance
                    handlePreloaderStyle={this.handlePreloaderStyle}
                    handleCreateTolerance={this.handleCreateTolerance}
                    errors={errors}
                    name={create_name}
                    from={create_from}
                    to={create_to}
                    tolerance_type={create_tolerance_type}
                    successMessage={successMessage}
                    toleranceType={toleranceType}
                    onChange={this.onChangeNumber}
                  />
                }
                exportButton={
                  <ExportButton
                    data={exportTolerance}
                    filename={
                      moment().format("DD/MM/YYYY H:mm:ss") + " Tolerance.csv"
                    }
                  />
                }
                tableContent={
                  <React.Fragment>
                    <ToleranceList
                      tolerance={tolerance}
                      errors={errors}
                      toleranceCount={toleranceCount + 1}
                      toleranceType={toleranceType}
                      updateTolerance={this.props.updateTolerance}
                      deleteTolerance={this.props.deleteTolerance}
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

              <SearchTolerance
                onChange={this.onChange}
                onChangeNumber={this.onChangeNumber}
                handleSearch={this.handleSearch}
                handleCloseSearch={this.handleCloseSearch}
                search_name={search_name}
                search_from={search_from}
                search_to={search_to}
                search_tolerance_type={search_tolerance_type}
                toleranceType={toleranceType}
              />
            </React.Fragment>
          }
        />
      </div>
    );
  }
}

ToleranceLayout.propTypes = {
  fetchTolerance: PropTypes.func.isRequired,
  tolerance: PropTypes.object.isRequired,
  toleranceType: PropTypes.array,
  createTolerance: PropTypes.func.isRequired,
  updateTolerance: PropTypes.func.isRequired,
  deleteTolerance: PropTypes.func.isRequired,
  fetchToleranceType: PropTypes.func.isRequired,
  errors: PropTypes.object
};

const mapStateToProps = state => ({
  tolerance: state.tolerance.tolerance,
  toleranceType: state.tolerance.toleranceType,
  errors: state.tolerance.toleranceErrors,
  auth: state.auth,
  toleranceCreated: state.tolerance.toleranceCreated,
  toleranceDeleted: state.tolerance.toleranceDeleted,
  toleranceUpdated: state.tolerance.toleranceUpdated
});

export default connect(mapStateToProps, {
  fetchTolerance,
  createTolerance,
  updateTolerance,
  deleteTolerance,
  fetchToleranceType,
  fetchAllTolerance
})(ToleranceLayout);
