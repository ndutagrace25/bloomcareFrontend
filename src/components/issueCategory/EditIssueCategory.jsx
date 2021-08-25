import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import { InputFields, Button } from "../common";

class EditIsueCategory extends Component {
  state = {
    _id: 0,
    name: "",
    issue: "",
    errors: {}
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentDidMount() {
    const { _id, name, issue } = this.props;
    this.setState({
      _id,
      name,
      issue
    });
  }

  submitNewIssueCategory = e => {
    e.preventDefault();
    const { _id, name, issue } = this.state;
    const issueCategory = {
      name,
      issue
    };

    this.props.handlePreloaderStyle("d-block");
    this.props.updateIssueCategory(_id, issueCategory);
  };

  render() {
    const { _id, name, issue } = this.state;
    const { errors, issueList } = this.props;
    const allIssueList =
      issueList instanceof Array
        ? issueList.map(issueList => (
            <React.Fragment key={issueList._id}>
              <option value={issueList._id}>{issueList.issue_name}</option>
            </React.Fragment>
          ))
        : null;
    return (
      <div data-test="EditIssueCategoryComponent">
        <Button
          type="button"
          className="btn btn-primary btn-sm"
          dataTarget={"#editIsueCategory" + _id}
          dataToggle="modal"
          otherProps={
            <i
              className="fas fa-pen"
              data-toggle="tooltip"
              data-placement="top"
              title="Edit Issue Category"
            />
          }
        />
        <div
          className="modal fade"
          id={"editIsueCategory" + _id}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-notify modal-info" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit Issue Category{" "}
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
                    <div className="form-group">
                      <span
                        className="input-group-addon"
                        style={{ marginRight: "3px" }}
                      >
                        <i className="fas fa-th-large" />
                      </span>
                      <label htmlFor="issue">Issue Name</label>
                      <select
                        name="issue"
                        className={classnames("form-control", {
                          "is-invalid": errors && errors.issue
                        })}
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
                    value="Update Issue Category"
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

EditIsueCategory.propTypes = {
  updateIssueCategory: PropTypes.func.isRequired,
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  issue: PropTypes.string.isRequired,
  issueList: PropTypes.array.isRequired,
  errors: PropTypes.object
};

export default EditIsueCategory;
