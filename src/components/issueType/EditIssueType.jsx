import React, { Component } from "react";
import PropTypes from "prop-types";

import { InputFields, Button } from "../common";

class EditIssueType extends Component {
  state = {
    _id: 0,
    name: "",
    errors: {}
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentDidMount() {
    const { _id, name } = this.props;
    this.setState({
      _id,
      name
    });
  }

  submitNewIssueType = e => {
    e.preventDefault();
    const { _id, name } = this.state;
    const issueType = {
      name
    };
    this.props.handlePreloaderStyle("d-block");
    this.props.updateIssueType(_id, issueType);
  };

  render() {
    const { _id, name } = this.state;
    const { errors } = this.props;
    return (
      <div data-test="EditIssueTypeComponent">
        <Button
          type="button"
          className="btn btn-primary btn-sm"
          dataTarget={"#editIssueType" + _id}
          dataToggle="modal"
          otherProps={
            <i
              className="fa fa-pen"
              data-toggle="tooltip"
              data-placement="top"
              title="Edit Issue Type"
            />
          }
        />
        <div
          className="modal fade"
          id={"editIssueType" + _id}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-notify modal-info" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit Issue Type{" "}
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
                    value="Update Issue Type"
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

EditIssueType.propTypes = {
  updateIssueType: PropTypes.func.isRequired,
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  errors: PropTypes.object
};

export default EditIssueType;
