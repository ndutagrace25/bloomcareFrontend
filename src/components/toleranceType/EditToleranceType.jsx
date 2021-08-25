import React, { Component } from "react";
import PropTypes from "prop-types";

import { InputFields, Button } from "../common";

class EditToleranceType extends Component {
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
      name: name
    });
  }

  submitNewToleranceType = e => {
    e.preventDefault();
    const { _id, name } = this.state;
    const toleranceType = {
      name
    };
    this.props.handlePreloaderStyle("d-block");
    this.props.updateToleranceType(_id, toleranceType);
  };

  render() {
    const { _id, name } = this.state;
    const { errors } = this.props;
    return (
      <div data-test="EditToleranceTypeComponent">
        <Button
          type="button"
          className="btn btn-primary btn-sm"
          dataTarget={"#editToleranceType" + _id}
          dataToggle="modal"
          otherProps={
            <i
              className="fa fa-pen"
              data-toggle="tooltip"
              data-placement="top"
              title="Edit Tolerance Type"
            />
          }
        />
        <div
          className="modal fade"
          id={"editToleranceType" + _id}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-notify modal-info" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit Tolerance Type{" "}
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
                          <i className="fab fa-connectdevelop" />
                        </span>
                      }
                      type="text"
                      name="name"
                      onChange={this.onChange}
                      label="Tolerance Type Name"
                      placeholder="Tolerance Type Name"
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
                    onClick={this.submitNewToleranceType}
                    className="btn btn-sm btn-outline-default waves-effect mr-0"
                    value="Update Tolerance Type"
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

EditToleranceType.propTypes = {
  updateToleranceType: PropTypes.func.isRequired,
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  errors: PropTypes.object
};

export default EditToleranceType;
