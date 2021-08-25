import React, { Component } from "react";
// import PropTypes from "prop-types";
// import classnames from "classnames";

// import { InputFields, NewButton } from "../common";

class NewEditIssue extends Component {
  state = {
    _id: 0,
    issue_name: "",
    issue_type: "",
    tolerance_type: "",
    score: "",
    errors: {}
  };
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentDidMount() {
    const { _id, issue_name, issue_type, tolerance_type, score } = this.props;
    this.setState({
      _id,
      issue_name,
      issue_type,
      tolerance_type,
      score
    });
  }

  submitNewIssue = e => {
    e.preventDefault();
    const { _id, issue_name, issue_type, tolerance_type, score } = this.state;
    const issue = {
      issue_name,
      issue_type_id: issue_type,
      tolerance_type_id: tolerance_type,
      score_id: score
    };
    this.props.handlePreloaderStyle("d-block");
    this.props.updateIssue(_id, issue);
  };

  render() {
    const { _id, issue_name, issue_type, tolerance_type, score } = this.state;
    const { errors, issueType, toleranceType, scoreList } = this.props;

    const allIssueType =
      issueType.items instanceof Array
        ? issueType.items.map((issueType, index) => (
            <React.Fragment key={index}>
              <option value={issueType.id}>{issueType.issue_type_name}</option>
            </React.Fragment>
          ))
        : null;

    const alltoleranceType =
      toleranceType instanceof Array
        ? toleranceType.map((toleranceType, index) => (
            <React.Fragment key={index}>
              <option value={toleranceType.id}>{toleranceType.name}</option>
            </React.Fragment>
          ))
        : null;

    const allscoreList =
      scoreList instanceof Array
        ? scoreList.map((scoreList, index) => (
            <React.Fragment key={index}>
              <option value={scoreList.id}>{scoreList.score_name}</option>
            </React.Fragment>
          ))
        : null;
    return (
      <div
        className="modal fade"
        id={"editissueselected" + _id}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <form className="modal-content rounded-0">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Issue
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="d-flex flex-nowrap align-items-end mb-3">
                <label className="text-nowrap col-sm-2 pl-n15">Name:</label>
                <div className="d-flex flex-nowrap justify-content-between col-sm-6 pl-n15">
                  {/* ISSUE NAME */}
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Issue Name"
                    name="issue_name"
                    onChange={this.onChange}
                    value={issue_name}
                    required
                    autoComplete="off"
                  />
                  {errors && (
                    <small className="form-text text-danger">
                      {errors.issue}
                    </small>
                  )}
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-end">
                <label className="col-sm-2 pl-n15">Select:</label>
                <div className="d-flex justify-content-between col-sm-10 px-n15">
                  {/* ISSUE TYPE */}
                  <select
                    className="form-control col-sm-4"
                    name="issue_type"
                    value={issue_type}
                    onChange={this.onChange}
                  >
                    <option>Issue Type</option>
                    {allIssueType}
                  </select>
                  {/* TOLERANCE TYPE */}
                  <select
                    className="form-control col-sm-4"
                    name="tolerance_type"
                    value={tolerance_type}
                    onChange={this.onChange}
                  >
                    <option>Tolerance Type</option>
                    {alltoleranceType}
                  </select>
                  {/* SELECT SCORE */}
                  <select
                    className="form-control col-sm-4"
                    value={score}
                    onChange={this.onChange}
                    name="score"
                  >
                    <option>Score</option>
                    {allscoreList}
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-outline-danger rounded-0"
                data-dismiss="modal"
              >
                CLOSE
              </button>
              <button
                type="button"
                className="btn btn-primary rounded-0"
                onClick={this.submitNewIssue}
              >
                UPDATE
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default NewEditIssue;
