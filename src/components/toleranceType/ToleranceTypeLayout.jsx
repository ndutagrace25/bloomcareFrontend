import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import moment from "moment";

import {
  fetchToleranceType,
  createToleranceType,
  updateToleranceType,
  deleteToleranceType
} from "../../actions/toleranceTypeActions";

import {
  Navbar,
  //   Error,
  Preloader,
  ContentContainer,
  TableWrap,
  ExportButton,
  Pagination
} from "../common";

import { ToleranceTypeList, SearchToleranceType, CreateToleranceType } from ".";

class ToleranceTypeLayout extends Component {
  state = {
    page: 0,
    limit: 10,
    count: 0,
    toleranceType: [],
    errors: {},
    preloaderStyle: "d-none",
    name: "",
    successMessage: "",
    search_name: "",
    create_name: "",
    toleranceTypeCount: 0
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
    this.fetchToleranceType(page, limit, search_name);
  };

  handleCloseSearch = () => {
    this.setState({
      search_name: ""
    });

    const { page, limit } = this.state;
    this.fetchToleranceType(page, limit, "");
  };

  handleIncrementPage = e => {
    e.preventDefault();
    const { page, limit, count, name } = this.state;
    const totalPages = Math.ceil(count / limit);
    const newPage = page + 1;
    if (newPage < totalPages) {
      this.setState({ page: newPage, toleranceTypeCount: newPage * limit });
      this.fetchToleranceType(newPage, limit, name);
    }
  };

  handleDecrementPage = e => {
    e.preventDefault();
    const { page, limit, name } = this.state;
    const newPage = page - 1;
    if (newPage >= 0) {
      this.setState({ page: newPage, toleranceTypeCount: newPage * limit });
      this.fetchToleranceType(newPage, limit, name);
    }
  };

  handleOnChangePage = e => {
    const { limit, name } = this.state;
    const newPage = parseInt(e.target.value);
    this.setState({
      [e.target.name]: newPage,
      toleranceTypeCount: newPage * limit
    });
    this.fetchToleranceType(newPage, limit, name);
  };

  handleCreateToleranceType = toleranceType => {
    this.handlePreloaderStyle("d-block");
    this.setState({
      create_name: toleranceType.name
    });
    this.props.createToleranceType(toleranceType);
  };

  fetchToleranceType = (page, limit, name) => {
    this.handlePreloaderStyle("d-block");
    this.props.fetchToleranceType(page, limit, name);
  };

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
    const { page, limit, name } = this.state;
    this.fetchToleranceType(page, limit, name);
  }

  componentWillReceiveProps(nextProps) {
    this.handlePreloaderStyle("d-none");
    if (nextProps.toleranceType.items) {
      const newToleranceType = nextProps.toleranceType.items;
      this.setState({
        toleranceType: newToleranceType,
        count: nextProps.toleranceType.rows
      });
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }

    if (nextProps.toleranceTypeCreated) {
      const toleranceTypeCreated = nextProps.toleranceTypeCreated;
      if (toleranceTypeCreated.message === "Success") {
        this.setState({
          successMessage: toleranceTypeCreated.message,
          create_name: ""
        });
        const { page, limit, name } = this.state;
        JSON.stringify(
          Swal.fire("Tolerance Type Created Successful", "", "success")
        );
        this.fetchToleranceType(page, limit, name);
        nextProps.toleranceTypeCreated.message = "";
      }
    }

    if (nextProps.toleranceTypeUpdated) {
      const toleranceTypeUpdated = nextProps.toleranceTypeUpdated;
      if (toleranceTypeUpdated.message === "Success") {
        this.setState({
          successMessage: toleranceTypeUpdated.message
        });
        JSON.stringify(
          Swal.fire("Tolerance Type Updated Successful", "", "success")
        );

        nextProps.toleranceTypeUpdated.message = "";
        const { page, limit, name } = this.state;
        this.fetchToleranceType(page, limit, name);
      }
    }

    if (nextProps.toleranceTypeDeleted) {
      const toleranceTypeDeleted = nextProps.toleranceTypeDeleted;
      if (toleranceTypeDeleted.message === "Success") {
        this.setState({
          successMessage: toleranceTypeDeleted.message
        });
        nextProps.toleranceTypeDeleted.message = "";
        const { page, limit, name } = this.state;
        this.fetchToleranceType(page, limit, name);
      }
    }
  }

  render() {
    const {
      toleranceType,
      preloaderStyle,
      errors,
      page,
      limit,
      count,
      toleranceTypeCount,
      successMessage,
      create_name,
      search_name,
      name
    } = this.state;

    const exportToleranceType = toleranceType.map(toleranceType => {
      const data = { ToleranceTypeName: toleranceType.name };
      return data;
    });

    return (
      <div className="components-view" data-test="ToleranceTypeLayoutComponent">
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
                tableTitle="Tolerance Type"
                createButton={
                  <CreateToleranceType
                    handlePreloaderStyle={this.handlePreloaderStyle}
                    handleCreateToleranceType={this.handleCreateToleranceType}
                    errors={errors}
                    name={create_name}
                  />
                }
                exportButton={
                  <ExportButton
                    data={exportToleranceType}
                    filename={
                      moment().format("DD/MM/YYYY H:mm:ss") +
                      " ToleranceType.csv"
                    }
                  />
                }
                tableContent={
                  <React.Fragment>
                    {" "}
                    <ToleranceTypeList
                      toleranceType={toleranceType}
                      errors={errors}
                      toleranceTypeCount={toleranceTypeCount + 1}
                      updateToleranceType={this.props.updateToleranceType}
                      deleteToleranceType={this.props.deleteToleranceType}
                      handlePreloaderStyle={this.handlePreloaderStyle}
                      name={name}
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

              <SearchToleranceType
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

ToleranceTypeLayout.propTypes = {
  fetchToleranceType: PropTypes.func.isRequired,
  toleranceType: PropTypes.object.isRequired,
  createToleranceType: PropTypes.func.isRequired,
  updateToleranceType: PropTypes.func.isRequired,
  deleteToleranceType: PropTypes.func.isRequired,
  errors: PropTypes.object,
  auth: PropTypes.object
};

const mapStateToProps = state => ({
  toleranceType: state.toleranceType.toleranceType,
  errors: state.toleranceType.toleranceTypeErrors,
  auth: state.auth,
  toleranceTypeCreated: state.toleranceType.toleranceTypeCreated,
  toleranceTypeUpdated: state.toleranceType.toleranceTypeUpdated,
  toleranceTypeDeleted: state.toleranceType.toleranceTypeDeleted
});

export default connect(
  mapStateToProps,
  {
    fetchToleranceType,
    createToleranceType,
    updateToleranceType,
    deleteToleranceType
  }
)(ToleranceTypeLayout);
