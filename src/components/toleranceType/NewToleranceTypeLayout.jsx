import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import moment from "moment";
import {
  NewCreateToleranceType,
  NewToleranceTypeList,
  NewToleranceTypeFilter
} from ".";
import {
  NewTableContainer,
  NewButton,
  Preloader,
  Pagination,
  ExportButton
} from "../common";

import {
  fetchToleranceType,
  createToleranceType,
  updateToleranceType,
  deleteToleranceType
} from "../../actions/toleranceTypeActions";

class NewToleranceTypeLayout extends Component {
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

  clearModalErrorAfterClose = () => {
    this.setState({
      errors: {},
    })
  }

  onChange = e => {
    const {page, limit, search_name} =this.state;
    this.setState({
      [e.target.name]: e.target.value
    });
    this.fetchToleranceType(page, limit,e.target.value, search_name)
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
      const data = { Tolerance_Type_Name: toleranceType.name };
      return data;
    });

    return (
      <React.Fragment>
        <div
          className="tab-pane fade col-md-12 px-n15"
          id="toleranceType"
          role="tabpanel"
          aria-labelledby="v-pills-home-tab"
        >
          <Preloader
            preloaderStyle={preloaderStyle}
            data-test="PreloaderComponent"
          />
          <div className="d-flex">
            <NewToleranceTypeFilter
              onChange={this.onChange}
              onChangeNumber={this.onChangeNumber}
              handleSearch={this.handleSearch}
              handleCloseSearch={this.handleCloseSearch}
              search_name={search_name}
            />
            <NewTableContainer
              buttonContainer={
                <React.Fragment>
                  {/* CREATE TOLERANCE TYPE IS INACTIVE AT THE MOMENT */}
                  {/* <NewButton
                    className="btn btn-info rounded-0 d-flex flex-nowrap align-items-center"
                    dataToggle="modal"
                    dataTarget="#createtolerancetype"
                    label="Add Tolerance Type"
                    otherProperties={
                      <img
                        src={require("../../assets/img/add-icon.svg")}
                        height="20"
                        alt="add tolerance-type"
                        className="mr-sm-1"
                      ></img>
                    }
                  />
                  <NewCreateToleranceType
                    handlePreloaderStyle={this.handlePreloaderStyle}
                    handleCreateToleranceType={this.handleCreateToleranceType}
                    errors={errors}
                    name={create_name}
                    clearModalErrorAfterClose={this.clearModalErrorAfterClose}
                  /> */}
                  <ExportButton
                    data={exportToleranceType}
                    filename={
                      moment().format("DD/MM/YYYY H:mm:ss") +
                      " ToleranceType.csv"
                    }
                  />
                </React.Fragment>
              }
              tableContent={
                <React.Fragment>
                  {" "}
                  <NewToleranceTypeList
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
          </div>
        </div>
      </React.Fragment>
    );
  }
}

NewToleranceTypeLayout.propTypes = {
  fetchToleranceType: PropTypes.func.isRequired,
  // toleranceType: PropTypes.object.isRequired,
  createToleranceType: PropTypes.func.isRequired,
  updateToleranceType: PropTypes.func.isRequired,
  deleteToleranceType: PropTypes.func.isRequired,
  // errors: PropTypes.object,
  auth: PropTypes.object
};

const mapStateToProps = state => ({
  toleranceType: state.toleranceType.toleranceType,
  errors: state.toleranceType.toleranceTypeErrors,
  toleranceTypeCreated: state.toleranceType.toleranceTypeCreated,
  toleranceTypeUpdated: state.toleranceType.toleranceTypeUpdated,
  toleranceTypeDeleted: state.toleranceType.toleranceTypeDeleted
});

export default connect(mapStateToProps, {
  fetchToleranceType,
  createToleranceType,
  updateToleranceType,
  deleteToleranceType
})(NewToleranceTypeLayout);
