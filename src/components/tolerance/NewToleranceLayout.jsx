import React, { Component } from "react";
import {
  NewTableContainer,
  NewButton,
  Preloader,
  Pagination,
  ExportButton
} from "../common";
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
import { NewToleranceList, NewToleranceFilter, NewCreateTolerance } from ".";

class NewToleranceLayout extends Component {
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
    search_tolerance_type: "",
    allTolerance: []
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
    const {page, limit, search_name} = this.state;
    this.setState({
      [e.target.name]: e.target.value
    });
    this.fetchTolerance(page, limit, e.target.value, search_name)
  };

  onChangeNumber = e => {
    this.setState({
      [e.target.name]: parseInt(e.target.value)
    });
  };

  handleSearch = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });


    this.fetchTolerance(page, limit, e.target.value);

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
  
    const { page, limit, name, tolerance_type } = this.state;
    this.fetchTolerance(page, limit, name, tolerance_type);
    this.props.fetchToleranceType();
    this.props.fetchAllTolerance();
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
      // console.log(nextProps.errors)
      this.setState({
        errors: nextProps.errors
      });
    }


    if (nextProps.toleranceCreated) {
      const toleranceCreated = nextProps.toleranceCreated;
      // console.log(toleranceCreated);
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

    if(nextProps.allTolerance) {
      this.setState({
        allTolerance: nextProps.allTolerance
      })
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
      search_to,
      allTolerance
    } = this.state;

    const exportTolerance = allTolerance
      ? allTolerance.map(tolerance => {
          const data = {
            ToleranceName: tolerance.name,
            From: tolerance.from,
            To: tolerance.to,
            ToleranceType: tolerance.tolerance_type.name
          };
          return data;
        })
      : null;
    return (
      <React.Fragment>
        <div
          className="tab-pane fade col-md-12 px-n15"
          id="tolerance"
          role="tabpanel"
          aria-labelledby="v-pills-home-tab"
        >
          <Preloader
            preloaderStyle={preloaderStyle}
            data-test="PreloaderComponent"
          />
          <div className="d-flex">
            <NewToleranceFilter
              onChange={this.onChange}
              onChangeNumber={this.onChangeNumber}
              handleSearch={this.handleSearch}
              handleCloseSearch={this.handleCloseSearch}
              search_name={search_name}
               />

            <NewTableContainer
              buttonContainer={
                <React.Fragment>
                  <NewButton
                    className="btn btn-info rounded-0 d-flex flex-nowrap align-items-center"
                    dataToggle="modal"
                    dataTarget="#createtolerance"
                    label="Add Tolerance"
                    otherProperties={
                      <img
                        src={require("../../assets/img/add-icon.svg")}
                        height="20"
                        alt="add tolerance"
                        className="mr-sm-1"
                      ></img>
                    }
                  />
                  <NewCreateTolerance
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
                    clearModalErrorAfterClose= {this.clearModalErrorAfterClose}
                  />
                  <ExportButton
                    data={exportTolerance}
                    filename={
                      moment().format("DD/MM/YYYY H:mm:ss") + "Tolerance.csv"
                    }
                  />
                </React.Fragment>
              }
              tableContent={
                <React.Fragment>
                  <NewToleranceList
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
            <NewToleranceFilter
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
          </div>
        </div>
      </React.Fragment>
    );
  }
}

NewToleranceLayout.propTypes = {
  fetchTolerance: PropTypes.func.isRequired,
  // tolerance: PropTypes.object.isRequired,
  // toleranceType: PropTypes.array,
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
  toleranceCreated: state.tolerance.toleranceCreated,
  toleranceDeleted: state.tolerance.toleranceDeleted,
  toleranceUpdated: state.tolerance.toleranceUpdated,
  allTolerance: state.tolerance.allTolerance
});
export default connect(mapStateToProps, {
  fetchTolerance,
  createTolerance,
  updateTolerance,
  deleteTolerance,
  fetchToleranceType,
  fetchAllTolerance
})(NewToleranceLayout);
