import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

class NewCreateIssueCategory extends Component {
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

    let allIssueList =
      issueList instanceof Array
        ? issueList.map((issue, index) => (
            <React.Fragment key={index}>
              <option value={issue.id} style={{ fontStyle: "normal" }}>
                {issue.issue_name}
              </option>
            </React.Fragment>
          ))
        : null;

    return (
      <React.Fragment>
        <div
          className="modal fade"
          id="createissuecategory"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <form className="modal-content rounded-0">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add Issue Category
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={this.props.clearModalErrorAfterClose}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="d-flex flex-nowrap align-items-baseline">
                  <label className="text-nowrap col-sm-3 pl-n15">Name:</label>
                  <div className="form-group col-sm-5 pl-n15">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Issue Category Name"
                      name="name"
                      onChange={this.onChange}
                      value={name}
                      autoComplete="off"
                    />
                    {errors && (
                      <small className="form-text text-danger">
                        {errors.name}
                      </small>
                    )}
                  </div>
                </div>
                <div className="d-flex flex-nowrap align-items-baseline">
                  <label className="text-nowrap col-sm-3 pl-n15">
                    Issue Name:
                  </label>
                  <div className="form-group col-sm-5 pl-n15">
                    <select
                      name="issue"
                      className={classnames("form-control selectPlaceholder", {
                        "is-invalid": errors.issue
                      })}
                      value={issue}
                      onChange={this.onChange}
                      style={{ fontSize: "14px" }}
                    >
                      <option value="">--Select Issue Name--</option>
                      {allIssueList}
                    </select>
                    {errors && (
                      <div className="invalid-feedback">{errors.issue}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="modal-footer d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-outline-danger rounded-0"
                  data-dismiss="modal"
                  onClick={this.props.clearModalErrorAfterClose}
                >
                  CLOSE
                </button>
                <button
                  type="button"
                  className="btn btn-primary rounded-0"
                  onClick={this.submitNewIssueCategory}
                >
                  SUBMIT
                </button>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
NewCreateIssueCategory.propTypes = {
  // handleCreateIssueType: PropTypes.func.isRequired,
  errors: PropTypes.object
};

export default NewCreateIssueCategory;
