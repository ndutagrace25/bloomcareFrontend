import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import moment from "moment";

import {
  fetchIssue,
  createIssue,
  updateIssue,
  deleteIssue,
  fetchIssueType,
  fetchToleranceType,
  fetchScore,
  fetchAllIssue
} from "../../actions/issueActions";

import {
  NewTableContainer,
  NewButton,
  ExportButton,
  Pagination,
  Preloader
} from "../common";
import { NewIssueList, NewCreateIssue, NewIssueFilter } from ".";

class NewIssueLayout extends Component {
  state = {
    page: 0,
    limit: 10,
    count: 0,
    issue_name: "",
    issue: [],
    issueType: [],
    toleranceType: [],
    scoreList: [],
    issue_type: "",
    tolerance_type: "",
    score: "",
    errors: {},
    preloaderStyle: "d-none",
    issueCount: 0,
    successMessage: "",
    create_issue_name: "",
    create_issue_type: "",
    create_tolerance_type: "",
    create_score: "",
    search_issue_name: "",
    search_issue_type: "",
    search_tolerance_type: "",
    search_score: "",
    allIssue: []
  };

  handlePreloaderStyle = newStyle => {
    this.setState({ preloaderStyle: newStyle });
  };

  clearModalErrorAfterClose = () => {
    this.setState ({
      errors: {},
    })
  }

  onChange = e => {
    const {page, limit, search_issue_name} = this.state;
    this.setState({
      [e.target.name]: e.target.value
    });
    this.fetchIssue(page, limit, search_issue_name)
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
      search_issue_name,
      search_issue_type,
      search_tolerance_type,
      search_score
    } = this.state;

    this.fetchIssue(
      page,
      limit,
      search_issue_name,
      search_issue_type,
      search_tolerance_type,
      search_score
    );
  };

  handleCloseSearch = () => {
    this.setState({
      search_issue_name: "",
      search_issue_type: "",
      search_tolerance_type: "",
      search_score: ""
    });

    const { page, limit } = this.state;

    this.fetchIssue(page, limit, "", "", "", "");
  };

  handleIncrementPage = e => {
    e.preventDefault();
    const {
      page,
      limit,
      count,
      issue_name,
      issue_type,
      tolerance_type,
      score
    } = this.state;

    const totalPages = Math.ceil(count / limit);
    const newPage = page + 1;

    if (newPage < totalPages) {
      this.setState({ page: newPage, issueCount: newPage * limit });
      this.fetchIssue(
        newPage,
        limit,
        issue_name,
        issue_type,
        tolerance_type,
        score
      );
    }
  };

  handleDecrementPage = e => {
    e.preventDefault();
    const {
      page,
      limit,
      issue_name,
      issue_type,
      tolerance_type,
      score
    } = this.state;
    const newPage = page - 1;
    if (newPage >= 0) {
      this.setState({ page: newPage, issueCount: newPage * limit });
      this.fetchIssue(
        newPage,
        limit,
        issue_name,
        issue_type,
        tolerance_type,
        score
      );
    }
  };

  handleOnChangePage = e => {
    const { limit, issue_name, issue_type, tolerance_type, score } = this.state;
    const newPage = parseInt(e.target.value);
    this.setState({ [e.target.name]: newPage, issueCount: newPage * limit });
    this.fetchIssue(
      newPage,
      limit,
      issue_name,
      issue_type,
      tolerance_type,
      score
    );
  };

  handleCreateIssue = issue => {
    this.handlePreloaderStyle("d-block");
    this.setState({
      create_issue_name: issue.issue_name,
      create_issue_type: issue.issue_type,
      create_tolerance_type: issue.tolerance_type,
      create_score: issue.score
    });
    this.props.createIssue(issue);
  };

  fetchIssue = (page, limit, issue_name, issue_type, tolerance_type, score) => {
    this.handlePreloaderStyle("d-block");
    this.props.fetchIssue(
      page,
      limit,
      issue_name,
      issue_type,
      tolerance_type,
      score
    );
  };

  componentDidMount() {
    const {
      page,
      limit,
      issue_name,
      issue_type,
      tolerance_type,
      score
    } = this.state;
    this.fetchIssue(page, limit, issue_name, issue_type, tolerance_type, score);
    this.props.fetchIssueType();
    this.props.fetchToleranceType();
    this.props.fetchScore();
    this.props.fetchAllIssue();
  }

  componentWillReceiveProps(nextProps) {
    this.handlePreloaderStyle("d-none");
    if (nextProps.issue.items) {
      const newIssue = nextProps.issue.items;
      this.setState({
        issue: newIssue,
        count: nextProps.issue.rows
      });
    }
    if(nextProps.allIssue) {
      this.setState({
        allIssue: nextProps.allIssue
      })
    }

    if (nextProps.issueType) {
      this.setState({
        issueType: nextProps.issueType
      });
    }

    if (nextProps.toleranceType) {
      this.setState({
        toleranceType: nextProps.toleranceType
      });
    }

    if (nextProps.scoreList) {
      this.setState({
        scoreList: nextProps.scoreList
      });
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }

    if (nextProps.issueCreated) {
      const issueCreated = nextProps.issueCreated;
      if (issueCreated.message === "Success") {
        this.setState({
          successMessage: issueCreated.message,
          create_issue_name: "",
          create_issue_type: "",
          create_tolerance_type: "",
          create_score: ""
        });

        JSON.stringify(Swal.fire("Issue Created Successful", "", "success"));
        const {
          page,
          limit,
          issue_name,
          issue_type,
          tolerance_type,
          score
        } = this.state;
        this.fetchIssue(
          page,
          limit,
          issue_name,
          issue_type,
          tolerance_type,
          score
        );
        nextProps.issueCreated.message = "";
      }
    }

    if (nextProps.issueDeleted) {
      const issueDeleted = nextProps.issueDeleted;
      if (issueDeleted.message === "Success") {
        this.setState({
          successMessage: issueDeleted.message
        });
        nextProps.issueDeleted.message = "";
        const { page, limit, issue_name, issue_type } = this.state;
        this.fetchIssue(page, limit, issue_name, issue_type);
      }
    }

    if (nextProps.issueUpdated) {
      const issueUpdated = nextProps.issueUpdated;
      if (issueUpdated.message === "Success") {
        this.setState({
          successMessage: issueUpdated.message
        });

        JSON.stringify(Swal.fire("Issue Updated Successful", "", "success"));
        nextProps.issueUpdated.message = "";
        const {
          page,
          limit,
          issue_name,
          issue_type,
          tolerance_type,
          score
        } = this.state;
        this.fetchIssue(
          page,
          limit,
          issue_name,
          issue_type,
          tolerance_type,
          score
        );
      }
    }
  }
  render() {
    const {
      issue,
      issueType,
      toleranceType,
      scoreList,
      preloaderStyle,
      errors,
      page,
      limit,
      count,
      issueCount,
      successMessage,
      create_issue_name,
      create_issue_type,
      create_tolerance_type,
      create_score,
      search_issue_name,
      search_issue_type,
      search_tolerance_type,
      search_score,
      allIssue
    } = this.state;

    const exportIssue = allIssue.map(issue => {
      const data = {
        IssueName: issue.issue_name,
        IssueType: issue.issue_type_name,
        ToleranceType: issue.tolerance_type_name,
        Score: issue.score_name
      };
      return data;
    });
    return (
      <React.Fragment>
        <div
          className="tab-pane fade col-md-12 px-n15"
          id="issue"
          role="tabpanel"
          aria-labelledby="v-pills-home-tab"
        >
          <Preloader
            preloaderStyle={preloaderStyle}
            data-test="PreloaderComponent"
          />
          <div className="d-flex">
            <NewIssueFilter
              onChange={this.onChange}
              onChangeNumber={this.onChangeNumber}
              handleSearch={this.handleSearch}
              handleCloseSearch={this.handleCloseSearch}
              search_issue_name={search_issue_name}
              search_issue_type={search_issue_type}
              search_tolerance_type={search_tolerance_type}
              search_score={search_score}
              issueType={issueType}
              toleranceType={toleranceType}
              scoreList={scoreList}
            />
            <NewTableContainer
              buttonContainer={
                <React.Fragment>
                  <NewButton
                    className="btn btn-info rounded-0 d-flex flex-nowrap align-items-center"
                    dataToggle="modal"
                    dataTarget="#createissue"
                    label="Add Issue"
                    otherProperties={
                      <img
                        src={require("../../assets/img/add-icon.svg")}
                        height="20"
                        alt="add tolerance-type"
                        className="mr-sm-1"
                      ></img>
                    }
                  />
                  <NewCreateIssue
                    handlePreloaderStyle={this.handlePreloaderStyle}
                    handleCreateIssue={this.handleCreateIssue}
                    errors={errors}
                    issue_name={create_issue_name}
                    issue_type={create_issue_type}
                    tolerance_type={create_tolerance_type}
                    score={create_score}
                    successMessage={successMessage}
                    issueType={issueType}
                    toleranceType={toleranceType}
                    scoreList={scoreList}
                    clearModalErrorAfterClose= {this.clearModalErrorAfterClose}
                  />
                  <ExportButton
                    data={exportIssue}
                    filename={
                      moment().format("DD/MM/YYYY H:mm:ss") + " Issue.csv"
                    }
                  />
                </React.Fragment>
              }
              tableContent={
                <React.Fragment>
                  <NewIssueList
                    issue={issue}
                    errors={errors}
                    issueCount={issueCount + 1}
                    issueType={issueType}
                    toleranceType={toleranceType}
                    scoreList={scoreList}
                    updateIssue={this.props.updateIssue}
                    deleteIssue={this.props.deleteIssue}
                    handlePreloaderStyle={this.handlePreloaderStyle}
                    successMessage={successMessage}
                  />
                  {count ? (
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

NewIssueLayout.propTypes = {
  fetchIssue: PropTypes.func.isRequired,
  // issue: PropTypes.object.isRequired,
  // issueType: PropTypes.object.isRequired,
  // toleranceType: PropTypes.array.isRequired,
  scoreList: PropTypes.array.isRequired,
  createIssue: PropTypes.func.isRequired,
  updateIssue: PropTypes.func.isRequired,
  deleteIssue: PropTypes.func.isRequired,
  fetchIssueType: PropTypes.func.isRequired,
  fetchToleranceType: PropTypes.func.isRequired,
  fetchScore: PropTypes.func.isRequired,
  errors: PropTypes.object
};

const mapStateToProps = state => ({
  issue: state.issue.issue,
  issueType: state.issue.issueType,
  errors: state.issue.IssueErrors,
  issueCreated: state.issue.issueCreated,
  issueDeleted: state.issue.issueDeleted,
  issueUpdated: state.issue.issueUpdated,
  toleranceType: state.issue.toleranceType,
  scoreList: state.issue.scoreList,
  allIssue: state.issue.allIssue
});

export default connect(mapStateToProps, {
  fetchIssue,
  createIssue,
  updateIssue,
  deleteIssue,
  fetchIssueType,
  fetchToleranceType,
  fetchScore,
  fetchAllIssue
})(NewIssueLayout);
