import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import { InputFields, Button } from "../common";

class CreateIssueCategory extends Component {
  state = {
    name: "",
    issue: ""
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitNewIssueCategory = e => {
    e.preventDefault();
    const { name, issue } = this.state;
    const issueCategory = {
      name,
      issue
    };
    this.props.handlePreloaderStyle("d-block");
    this.props.handleCreateIssueCategory(issueCategory);
  };

  componentWillReceiveProps = () => {
    const { name, issue } = this.props;
    this.setState({
      name,
      issue
    });
  };

  render() {
    const { name, issue } = this.state;
    const { errors, issueList } = this.props;

    const allIssueList =
      issueList instanceof Array
        ? issueList.map(issueList => (
            <React.Fragment key={issueList._id}>
              <option value={issueList._id} style={{ fontStyle: "normal" }}>
                {issueList.issue_name}
              </option>
            </React.Fragment>
          ))
        : null;

    return (
      <div data-test="CreateIssueCategoryComponent">
        <Button
          type="button"
          className="btn btn-sm btn-outline-default waves-effect ml-0"
          dataTarget="#addNewIssueCategory"
          dataToggle="modal"
          value="Issue Category"
          otherProps={<i className="fas fa-plus mr-1" />}
        />
        <div
          className="modal fade"
          id="addNewIssueCategory"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-notify modal-info" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add Issue Category{" "}
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
                    {/* ISSUE CATEGORY NAME */}
                    <InputFields
                      otherProps={
                        <span
                          className="input-group-addon"
                          style={{ marginRight: "3px" }}
                        >
                          <i className="fas fa-stop" />
                        </span>
                      }
                      type="text"
                      name="name"
                      onChange={this.onChange}
                      label="Issue Category Name"
                      placeholder="Issue Category Name"
                      value={name}
                      error={errors && errors.name}
                    />

                    {/* ISSUE NAME */}
                    <div className="d-flex flex-nowrap align-items-baseline">
                      <span
                        className="input-group-addon"
                        style={{ marginRight: "3px" }}
                      >
                        <i className="fas fa-th-large" />
                      </span>
                      <label htmlFor="issue">Issue Name</label>
                      <div className="form-group">
                        <select
                          name="issue"
                          className={classnames(
                            "form-control selectPlaceholder",
                            {
                              "is-invalid": errors && errors.issue
                            }
                          )}
                          value={issue}
                          onChange={this.onChange}
                          style={{ fontSize: "14px" }}
                        >
                          <option value="">--Select Issue--</option>
                          {allIssueList}
                        </select>
                        {errors && (
                          <div className="invalid-feedback">
                            {errors && errors.issue}
                          </div>
                        )}
                      </div>
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
                    onClick={this.submitNewIssueCategory}
                    className="btn btn-sm btn-outline-default waves-effect mr-0"
                    value="Add Issue Category"
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

CreateIssueCategory.propTypes = {
  handleCreateIssueCategory: PropTypes.func.isRequired,
  issueList: PropTypes.array.isRequired,
  errors: PropTypes.object
};

export default CreateIssueCategory;
