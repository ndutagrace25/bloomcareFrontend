import React, { Component } from "react";
import PropTypes from "prop-types";

import { InputFields, Button } from "../common";

class CreateIssueType extends Component {
  state = {
    name: ""
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitNewIssueType = e => {
    e.preventDefault();
    const { name } = this.state;
    const issueType = {
      name
    };
    this.props.handlePreloaderStyle("d-block");
    this.props.handleCreateIssueType(issueType);
  };

  componentWillReceiveProps = () => {
    const { name } = this.props;
    this.setState({
      name
    });
  };

  render() {
    const { name } = this.state;
    const { errors } = this.props;
    return (
      <div data-test="CreateIssueTypeComponent">
        <Button
          type="button"
          className="btn btn-sm btn-outline-default waves-effect ml-0"
          dataTarget="#addNewIssueType"
          dataToggle="modal"
          value="Issue Type"
          otherProps={<i className="fas fa-plus mr-1" />}
        />
        <div
          className="modal fade"
          id="addNewIssueType"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-notify modal-info" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add Issue Type{" "}
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
                      name="name"
                      onChange={this.onChange}
                      label="Issue Type Name"
                      placeholder="Issue Type Name"
                      value={name}
                      error={errors.name}
                    />
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
                    onClick={this.submitNewIssueType}
                    className="btn btn-sm btn-outline-default waves-effect mr-0"
                    value="Add Issue Type"
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

CreateIssueType.propTypes = {
  handleCreateIssueType: PropTypes.func.isRequired,
  errors: PropTypes.object
};

export default CreateIssueType;
