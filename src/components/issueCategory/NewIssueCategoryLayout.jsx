import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import moment from "moment";
import {
  NewTableContainer,
  NewButton,
  Pagination,
  ExportButton,
  Preloader
} from "../common";

import {
  fetchIssueCategory,
  createIssueCategory,
  updateIssueCategory,
  deleteIssueCategory,
  fetchAllIssueCategory
} from "../../actions/issueCategoryActions";
import { fetchAllIssue } from "../../actions/issueActions";

import {
  NewCreateIssueCategory,
  NewIssueCategoryList,
  NewIssueCategoryFilter
  // NewEditIssueCategory
} from ".";

class NewIssueCategoryLayout extends Component {
  state = {
    page: 0,
    limit: 10,
    count: 0,
    name: "",
    issueCategory: [],
    issueList: [],
    issue: "",
    errors: {},
    preloaderStyle: "d-none",
    issueCategoryCount: 0,
    successMessage: "",
    create_name: "",
    create_issue: "",
    search_name: "",
    search_issue: "",
    allIssueCategory: []
  };

  handlePreloaderStyle = newStyle => {
    this.setState({ preloaderStyle: newStyle });
  };

  clearModalErrorAfterClose = () => {
    this.setState({
      errors: {}
    });
  };

  onChange = e => {
    const { page, limit, search_issue } = this.state;

    this.setState({
      [e.target.name]: e.target.value
    });

    this.fetchIssueCategory(page, limit, e.target.value, search_issue);
  };

  onChangeNumber = e => {
    this.setState({
      [e.target.name]: parseInt(e.target.value)
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { page, limit, search_issue } = this.state;

    this.fetchIssueCategory(page, limit, search_issue);
  };

  handleCloseSearch = () => {
    this.setState({
      search_name: "",
      search_issue: ""
    });

    const { page, limit } = this.state;

    this.fetchIssueCategory(page, limit, "", "");
  };

  handleIncrementPage = e => {
    e.preventDefault();
    const { page, limit, count, name, issue } = this.state;
    const totalPages = Math.ceil(count / limit);
    const newPage = page + 1;

    if (newPage < totalPages) {
      this.setState({ page: newPage, issueCategoryCount: newPage * limit });
      this.fetchIssueCategory(newPage, limit, name, issue);
    }
  };

  handleDecrementPage = e => {
    e.preventDefault();
    const { page, limit, name, issue } = this.state;
    const newPage = page - 1;
    if (newPage >= 0) {
      this.setState({ page: newPage, issueCategoryCount: newPage * limit });
      this.fetchIssueCategory(newPage, limit, name, issue);
    }
  };

  handleOnChangePage = e => {
    const { limit, name, issue } = this.state;
    const newPage = parseInt(e.target.value);
    this.setState({
      [e.target.name]: newPage,
      issueCategoryCount: newPage * limit
    });
    this.fetchIssueCategory(newPage, limit, name, issue);
  };

  handleCreateIssueCategory = issueCategory => {
    this.handlePreloaderStyle("d-block");
    this.setState({
      create_name: issueCategory.name,
      create_issue: issueCategory.issue
    });
    this.props.createIssueCategory(issueCategory);
  };

  fetchIssueCategory = (page, limit, name, issue) => {
    this.handlePreloaderStyle("d-block");
    this.props.fetchIssueCategory(page, limit, name, issue);
  };

  componentDidMount() {
    const { page, limit, name, issue } = this.state;
    this.fetchIssueCategory(page, limit, name, issue);
    this.props.fetchAllIssue();
    this.props.fetchAllIssueCategory();
  }

  componentWillReceiveProps(nextProps) {
    this.handlePreloaderStyle("d-none");
    if (nextProps.issueCategory.items) {
      const newissueCategory = nextProps.issueCategory.items;
      this.setState({
        issueCategory: newissueCategory,
        count: nextProps.issueCategory.rows
      });
    }
    if (nextProps.allIssueCategory) {
      this.setState({
        allIssueCategory: nextProps.allIssueCategory
      });
    }

    if (nextProps.issueList) {
      this.setState({
        issueList: nextProps.issueList
      });
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }

    if (nextProps.issueCategoryCreated) {
      const issueCategoryCreated = nextProps.issueCategoryCreated;
      if (issueCategoryCreated.message === "Success") {
        this.setState({
          successMessage: issueCategoryCreated.message,
          create_name: "",
          create_issue: ""
        });

        JSON.stringify(
          Swal.fire("Issue Category Created Successful", "", "success")
        );
        const { page, limit, name, issue } = this.state;
        this.fetchIssueCategory(page, limit, name, issue);
        nextProps.issueCategoryCreated.message = "";
      }
    }

    if (nextProps.issueCategoryDeleted) {
      const issueCategoryDeleted = nextProps.issueCategoryDeleted;
      if (issueCategoryDeleted.message === "Success") {
        this.setState({
          successMessage: issueCategoryDeleted.message
        });
        nextProps.issueCategoryDeleted.message = "";
        const { page, limit, name, issue } = this.state;
        this.fetchIssueCategory(0, limit, name, issue);
      }
    }

    if (nextProps.issueCategoryUpdated) {
      const issueCategoryUpdated = nextProps.issueCategoryUpdated;
      if (issueCategoryUpdated.message === "Success") {
        this.setState({
          successMessage: issueCategoryUpdated.message
        });

        JSON.stringify(
          Swal.fire("Issue Category Updated Successful", "", "success")
        );
        nextProps.issueCategoryUpdated.message = "";
        const { page, limit, name, issue } = this.state;
        this.fetchIssueCategory(page, limit, name, issue);
      }
    }
  }

  render() {
    const {
      issueCategory,
      issueList,
      preloaderStyle,
      errors,
      page,
      limit,
      count,
      issueCategoryCount,
      successMessage,
      create_name,
      create_issue,
      // search_name,
      search_issue,
      allIssueCategory
    } = this.state;

    const exportIssueCategory = allIssueCategory.map(issueCategory => {
      const data = {
        IssueCategoryName: issueCategory.issue_category_name,
        IssueName: issueCategory.issue_name
      };
      return data;
    });

    return (
      <React.Fragment>
        <div
          className="tab-pane fade col-md-12 px-n15"
          id="issueCategory"
          role="tabpanel"
          aria-labelledby="v-pills-home-tab"
        >
          <Preloader
            preloaderStyle={preloaderStyle}
            data-test="PreloaderComponent"
          />
          <div className="d-flex">
            <NewIssueCategoryFilter
              onChange={this.onChange}
              onChangeNumber={this.onChangeNumber}
              handleSearch={this.handleSearch}
              handleCloseSearch={this.handleCloseSearch}
              // search_name={search_name}
              search_issue={search_issue}
              issueList={issueList}
            />
            <NewTableContainer
              buttonContainer={
                <React.Fragment>
                  <NewButton
                    className="btn btn-info rounded-0 d-flex flex-nowrap align-items-center"
                    dataToggle="modal"
                    dataTarget="#createissuecategory"
                    label="Add Issue Category"
                    otherProperties={
                      <img
                        src={require("../../assets/img/add-icon.svg")}
                        height="20"
                        alt="add tolerance-type"
                        className="mr-sm-1"
                      ></img>
                    }
                  />
                  <NewCreateIssueCategory
                    handlePreloaderStyle={this.handlePreloaderStyle}
                    handleCreateIssueCategory={this.handleCreateIssueCategory}
                    errors={errors}
                    name={create_name}
                    issue={create_issue}
                    successMessage={successMessage}
                    issueList={issueList}
                    clearModalErrorAfterClose={this.clearModalErrorAfterClose}
                  />
                  <ExportButton
                    data={exportIssueCategory}
                    filename={
                      moment().format("DD/MM/YYYY H:mm:ss") +
                      " issuecategory.csv"
                    }
                  />
                </React.Fragment>
              }
              tableContent={
                <React.Fragment>
                  <NewIssueCategoryList
                    issueCategory={issueCategory}
                    errors={errors}
                    issueCategoryCount={issueCategoryCount + 1}
                    issueList={issueList}
                    updateIssueCategory={this.props.updateIssueCategory}
                    deleteIssueCategory={this.props.deleteIssueCategory}
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
NewIssueCategoryLayout.propTypes = {
  fetchIssueCategory: PropTypes.func.isRequired,
  // issueCategory: PropTypes.object,
  // issueList: PropTypes.array.isRequired,
  createIssueCategory: PropTypes.func.isRequired,
  updateIssueCategory: PropTypes.func.isRequired,
  deleteIssueCategory: PropTypes.func.isRequired,
  fetchAllIssue: PropTypes.func.isRequired,
  errors: PropTypes.object
};

const mapStateToProps = state => ({
  issueCategory: state.issueCategory.issueCategory,
  issueList: state.issue.allIssue,
  errors: state.errors,
  issueCategoryCreated: state.issueCategory.issueCategoryCreated,
  issueCategoryDeleted: state.issueCategory.issueCategoryDeleted,
  issueCategoryUpdated: state.issueCategory.issueCategoryUpdated,
  allIssueCategory: state.issueCategory.allIssueCategory
});

export default connect(mapStateToProps, {
  fetchIssueCategory,
  createIssueCategory,
  updateIssueCategory,
  deleteIssueCategory,
  fetchAllIssue,
  fetchAllIssueCategory
})(NewIssueCategoryLayout);
