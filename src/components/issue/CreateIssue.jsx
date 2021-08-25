import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import { InputFields, Button } from "../common";

class CreateIssue extends Component {
  state = {
    issue_name: "",
    issue_type: "",
    tolerance_type: "",
    score: 0
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

  submitNewIssue = e => {
    e.preventDefault();
    const { issue_name, issue_type, tolerance_type, score } = this.state;
    const issue = {
      issue_name,
      issue_type,
      tolerance_type,
      score
    };
    this.props.handlePreloaderStyle("d-block");
    this.props.handleCreateIssue(issue);
  };

  componentWillReceiveProps = () => {
    const { issue_name, issue_type, tolerance_type, score } = this.props;
    this.setState({
      issue_name,
      issue_type,
      tolerance_type,
      score
    });
  };

  render() {
    const { issue_name, issue_type, tolerance_type, score } = this.state;
    const { errors, issueType, toleranceType, scoreList } = this.props;
    // console.log(issueType);
    const allIssueType =
      issueType instanceof Array
        ? issueType.map(issueType => (
            <React.Fragment key={issueType._id}>
              <option value={issueType._id} style={{ fontStyle: "normal" }}>
                {issueType.name}
              </option>
            </React.Fragment>
          ))
        : null;

    const allToleranceType =
      toleranceType instanceof Array
        ? toleranceType.map(toleranceType => (
            <React.Fragment key={toleranceType._id}>
              <option value={toleranceType._id} style={{ fontStyle: "normal" }}>
                {toleranceType.name}
              </option>
            </React.Fragment>
          ))
        : null;

    const allscoreList =
      scoreList instanceof Array
        ? scoreList.map(scoreList => (
            <React.Fragment key={scoreList._id}>
              <option value={scoreList._id} style={{ fontStyle: "normal" }}>
                {scoreList.name}
              </option>
            </React.Fragment>
          ))
        : null;

    return (
      <div data-test="CreateIssueComponent">
        <Button
          type="button"
          className="btn btn-sm btn-outline-default waves-effect ml-0"
          dataTarget="#addNewIssue"
          dataToggle="modal"
          value="Issue"
          otherProps={<i className="fas fa-plus mr-1" />}
        />
        <div
          className="modal fade"
          id="addNewIssue"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-notify modal-info" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add Issue{" "}
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
              <form noValidate>
                <div className="modal-body">
                  <div className="container-fluid">
                    {/* ISSUE NAME */}
                    <InputFields
                      otherProps={
                        <span
                          className="input-group-addon"
                          style={{ marginRight: "3px" }}
                        >
                          <i className="far fa-times-circle" />
                        </span>
                      }
                      type="text"
                      name="issue_name"
                      onChange={this.onChange}
                      label="Issue Name"
                      placeholder="Issue Name"
                      value={issue_name}
                      error={errors && errors.issue_name}
                    />

                    {/* ISSUE TYPE */}
                    <div className="form-group">
                      <span
                        className="input-group-addon"
                        style={{ marginRight: "3px" }}
                      >
                        <i className="far fa-times-circle" />
                      </span>
                      <label htmlFor="issue_type">Issue Type Name</label>
                      <select
                        name="issue_type"
                        className={classnames(
                          "form-control selectPlaceholder",
                          {
                            "is-invalid": errors && errors.issue_type
                          }
                        )}
                        value={issue_type}
                        onChange={this.onChange}
                        style={{ fontSize: "14px" }}
                      >
                        <option value="">--Select Issue Type--</option>
                        {allIssueType}
                      </select>

                      {errors && (
                        <div className="invalid-feedback">
                          {errors && errors.issue_type}
                        </div>
                      )}
                    </div>

                    {/* TOLERANCE TYPE */}
                    <div className="form-group">
                      <span
                        className="input-group-addon"
                        style={{ marginRight: "3px" }}
                      >
                        <i className="far fa-times-circle" />
                      </span>
                      <label htmlFor="tolerance_type">
                        Tolerance Type Name
                      </label>
                      <select
                        name="tolerance_type"
                        className={classnames(
                          "form-control selectPlaceholder",
                          {
                            "is-invalid": errors && errors.tolerance_type
                          }
                        )}
                        value={tolerance_type}
                        onChange={this.onChange}
                        style={{ fontSize: "14px" }}
                      >
                        <option value="">--Select Tolerance Type--</option>
                        {allToleranceType}
                      </select>

                      {errors && (
                        <div className="invalid-feedback">
                          {errors && errors.tolerance_type}
                        </div>
                      )}
                    </div>

                    {/* SCORE */}
                    <div className="form-group">
                      <span
                        className="input-group-addon"
                        style={{ marginRight: "3px" }}
                      >
                        <i className="far fa-times-circle" />
                      </span>
                      <label htmlFor="score">Score</label>
                      <select
                        name="score"
                        className={classnames(
                          "form-control selectPlaceholder",
                          {
                            "is-invalid": errors && errors.score
                          }
                        )}
                        value={score}
                        onChange={this.onChange}
                        style={{ fontSize: "14px" }}
                      >
                        <option value="">--Select Score--</option>
                        {allscoreList}
                      </select>

                      {errors && (
                        <div className="invalid-feedback">
                          {errors && errors.score}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <Button
                    type="button"
                    className="btn btn-sm btn-outline-danger waves-effect ml-0"
                    dataDismiss="modal"
                    value="Close"
                  />

                  <Button
                    type="button"
                    onClick={this.submitNewIssue}
                    className="btn btn-sm btn-outline-default waves-effect mr-0"
                    value="Add Issue"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateIssue.propTypes = {
  handleCreateIssue: PropTypes.func.isRequired,
  issueType: PropTypes.array.isRequired,
  toleranceType: PropTypes.array.isRequired,
  scoreList: PropTypes.array.isRequired,
  errors: PropTypes.object
};

export default CreateIssue;
