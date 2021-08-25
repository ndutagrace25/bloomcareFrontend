import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import moment from "moment";

import {
  fetchIssueType,
  createIssueType,
  updateIssueType,
  deleteIssueType
} from "../../actions/issueTypeActions";

import {
  NewTableContainer,
  NewButton,
  ExportButton,
  Pagination,
  Preloader
} from "../common";

import { NewIssueTypeList, NewCreateIssueType, NewIssueTypeFilter } from ".";

class NewIssueTypeLayout extends Component {
  state = {
    page: 0,
    limit: 10,
    count: 0,
    name: "",
    issueType: {},
    errors: {},
    preloaderStyle: "d-none",
    issueTypeCount: 0,
    successMessage: "",
    create_name: "",
    search_name: "",
    exportIssueType: []
  };

  handlePreloaderStyle = newStyle => {
    this.setState({ preloaderStyle: newStyle });
  };

  clearModalErrorAfterClose = () =>{
    this.setState({
      errors: {},
    })
  }

  onChange = e => {
    const { page, limit, search_name } = this.state;

    this.setState({
      [e.target.name]: e.target.value
    });

    this.fetchIssueType(page, limit, e.target.value, search_name);
  };

  onChangeNumber = e => {
    this.setState({
      [e.target.name]: parseInt(e.target.value)
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { page, limit, search_name } = this.state;

    this.fetchIssueType(page, limit, search_name);
  };

  handleCloseSearch = () => {
    this.setState({
      search_name: ""
    });

    const { page, limit } = this.state;

    this.fetchIssueType(page, limit, "");
  };

  handleIncrementPage = e => {
    e.preventDefault();
    const { page, limit, count, name } = this.state;
    const totalPages = Math.ceil(count / limit);
    const newPage = page + 1;

    if (newPage < totalPages) {
      this.setState({ page: newPage, issueTypeCount: newPage * limit });
      this.fetchIssueType(newPage, limit, name);
    }
  };

  handleDecrementPage = e => {
    e.preventDefault();
    const { page, limit, name } = this.state;
    const newPage = page - 1;
    if (newPage >= 0) {
      this.setState({ page: newPage, issueTypeCount: newPage * limit });
      this.fetchIssueType(newPage, limit, name);
    }
  };

  handleOnChangePage = e => {
    const { limit, name } = this.state;
    const newPage = parseInt(e.target.value);
    this.setState({
      [e.target.name]: newPage,
      issueTypeCount: newPage * limit
    });
    this.fetchIssueType(newPage, limit, name);
  };

  handleCreateIssueType = issueType => {
    this.handlePreloaderStyle("d-block");
    this.setState({
      create_name: issueType.name
    });
    this.props.createIssueType(issueType);
  };

  fetchIssueType = (page, limit, name) => {
    this.handlePreloaderStyle("d-block");
    this.props.fetchIssueType(page, limit, name);
  };

  componentDidMount() {
    const { page, limit, name } = this.state;
    this.fetchIssueType(page, limit, name);
  }

  componentWillReceiveProps(nextProps) {
    this.handlePreloaderStyle("d-none");
    if (nextProps.issueType.items) {
      const newissueType = nextProps.issueType;
      this.setState({
        issueType: newissueType,
        count: nextProps.issueType.rows,
        exportIssueType: nextProps.issueType.items
      });
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }

    if (nextProps.issueTypeCreated) {
      const issueTypeCreated = nextProps.issueTypeCreated;
      if (issueTypeCreated.message === "Success") {
        this.setState({
          successMessage: issueTypeCreated.message,
          create_name: ""
        });
        JSON.stringify(
          Swal.fire("Issue Type Created Successful", "", "success")
        );
        const { page, limit, name } = this.state;
        this.fetchIssueType(page, limit, name);
        nextProps.issueTypeCreated.message = "";
      }
    }

    if (nextProps.issueTypeDeleted) {
      const issueTypeDeleted = nextProps.issueTypeDeleted;
      if (issueTypeDeleted.message === "Success") {
        this.setState({
          successMessage: issueTypeDeleted.message
        });
        nextProps.issueTypeDeleted.message = "";
        const { page, limit, name } = this.state;
        this.fetchIssueType(page, limit, name);
      }
    }

    if (nextProps.issueTypeUpdated) {
      const issueTypeUpdated = nextProps.issueTypeUpdated;
      if (issueTypeUpdated.message === "Success") {
        this.setState({
          successMessage: issueTypeUpdated.message
        });
        JSON.stringify(
          Swal.fire("Issue Type Updated Successful", "", "success")
        );
        nextProps.issueTypeUpdated.message = "";
        const { page, limit, name } = this.state;
        this.fetchIssueType(page, limit, name);
      }
    }
  }

  render() {
    const {
      issueType,
      preloaderStyle,
      errors,
      page,
      limit,
      count,
      issueTypeCount,
      successMessage,
      create_name,
      search_name,
      exportIssueType
    } = this.state;

    const exportIssueTypes = exportIssueType.map(issueType => {
      const data = { IssueTypeName: issueType.issue_type_name };
      return data;
    });
    return (
      <React.Fragment>
        <div
          className="tab-pane fade col-md-12 px-n15"
          id="issueType"
          role="tabpanel"
          aria-labelledby="v-pills-home-tab"
        >
          <Preloader
            preloaderStyle={preloaderStyle}
            data-test="PreloaderComponent"
          />
          <div className="d-flex">
            <NewIssueTypeFilter
              onChange={this.onChange}
              onChangeNumber={this.onChangeNumber}
              handleSearch={this.handleSearch}
              handleCloseSearch={this.handleCloseSearch}
              search_name={search_name}
            />
            <NewTableContainer
              buttonContainer={
                <React.Fragment>
                  {/* CREATE IS INACTIVE AT THE MOMENT */}
                  {/* <NewButton
                    className="btn btn-info rounded-0 d-flex flex-nowrap align-items-center"
                    dataToggle="modal"
                    dataTarget="#createIssueType"
                    label="Issue Type"
                    otherProperties={
                      <img
                        src={require("../../assets/img/add-icon.svg")}
                        height="20"
                        alt="ISSUE TYPE"
                        className="mr-sm-1"
                      ></img>
                    }
                  />
                  <NewCreateIssueType
                    handlePreloaderStyle={this.handlePreloaderStyle}
                    handleCreateIssueType={this.handleCreateIssueType}
                    errors={errors}
                    name={create_name}
                    successMessage={successMessage}
                    clearModalErrorAfterClose={this.clearModalErrorAfterClose}
                  /> */}
                  <ExportButton
                    data={exportIssueTypes}
                    filename={
                      moment().format("DD/MM/YYYY H:mm:ss") + " Stations.csv"
                    }
                  />
                </React.Fragment>
              }
              tableContent={
                <React.Fragment>
                  <NewIssueTypeList
                    issueType={issueType}
                    errors={errors}
                    issueTypeCount={issueTypeCount + 1}
                    updateIssueType={this.props.updateIssueType}
                    deleteIssueType={this.props.deleteIssueType}
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

NewIssueTypeLayout.propTypes = {
  fetchIssueType: PropTypes.func.isRequired,
  // issueType: PropTypes.object.isRequired,
  createIssueType: PropTypes.func.isRequired,
  updateIssueType: PropTypes.func.isRequired,
  deleteIssueType: PropTypes.func.isRequired,
  errors: PropTypes.object,
  auth: PropTypes.object
};

const mapStateToProps = state => ({
  issueType: state.issueType.issueType,
  errors: state.issueType.issueTypeErrors,
  issueTypeCreated: state.issueType.issueTypeCreated,
  issueTypeDeleted: state.issueType.issueTypeDeleted,
  issueTypeUpdated: state.issueType.issueTypeUpdated
});

export default connect(mapStateToProps, {
  fetchIssueType,
  createIssueType,
  updateIssueType,
  deleteIssueType
})(NewIssueTypeLayout);
