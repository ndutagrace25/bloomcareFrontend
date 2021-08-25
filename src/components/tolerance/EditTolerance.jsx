import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import { InputFields, Button } from "../common";

class EditTolerance extends Component {
  state = {
    _id: 0,
    name: "",
    from: 0,
    to: 0,
    tolerance_type: "",
    errors: {}
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

  componentDidMount() {
    const { _id, name, from, to, tolerance_type } = this.props;
    this.setState({
      _id,
      name,
      from,
      to,
      tolerance_type
    });
  }

  submitNewTolerance = e => {
    e.preventDefault();
    const { _id, name, from, to, tolerance_type } = this.state;
    const tolerance = {
      name,
      from,
      to,
      tolerance_type
    };
    this.props.handlePreloaderStyle("d-block");
    this.props.updateTolerance(_id, tolerance);
  };

  render() {
    const { _id, name, from, to, tolerance_type } = this.state;
    const { errors, toleranceType } = this.props;
    const alltoleranceType = (toleranceType) ? toleranceType.map(toleranceType => (
      <React.Fragment key={toleranceType._id}>
        <option value={toleranceType._id}>{toleranceType.name}</option>
      </React.Fragment>
    )): null;

    return (
      <div data-test="EditToleranceComponent">
        <Button
          type="button"
          className="btn btn-primary btn-sm"
          dataTarget={"#editTolerance" + _id}
          dataToggle="modal"
          otherProps={
            <i
              className="fa fa-pen"
              data-toggle="tooltip"
              data-placement="top"
              title="Edit Tolerance"
            />
          }
        />
        <div
          className="modal fade"
          id={"editTolerance" + _id}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-notify modal-info" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit Tolerance{" "}
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
                    {/* TOLERANCE NAME */}
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
                      label="Tolerance Name"
                      placeholder="Tolerance Name"
                      value={name}
                      error={errors.name}
                    />

                    {/* TOLERANCE from */}
                    <InputFields
                      otherProps={
                        <span
                          className="input-group-addon"
                          style={{ marginRight: "3px" }}
                        >
                          <i className="far fa-times-circle" />
                        </span>
                      }
                      type="number"
                      name="from"
                      onChange={this.onChangeNumber}
                      label="From"
                      placeholder="from"
                      value={from}
                      error={errors.from}
                    />

                    {/* TOLERANCE TO */}
                    <InputFields
                      otherProps={
                        <span
                          className="input-group-addon"
                          style={{ marginRight: "3px" }}
                        >
                          <i className="far fa-times-circle" />
                        </span>
                      }
                      type="number"
                      name="to"
                      onChange={this.onChangeNumber}
                      label="To"
                      placeholder="to"
                      value={to}
                      error={errors.to}
                    />

                    {/* TOLERANCE TYPE NAME */}
                    <div className="form-group">
                      <span
                        className="input-group-addon"
                        style={{ marginRight: "3px" }}
                      >
                        <i className="far fa-times-circle" />
                      </span>
                      <label htmlFor="tolerance_type">Tolerance Type</label>
                      <select
                        name="tolerance_type"
                        className={classnames("form-control", {
                          "is-invalid": errors.tolerance_type
                        })}
                        value={tolerance_type}
                        onChange={this.onChange}
                      >
                        <option value="">--Select Tolerance Type--</option>
                        {alltoleranceType}
                      </select>

                      {errors && (
                        <div className="invalid-feedback">
                          {errors.tolerance_type}
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
                    onClick={this.submitNewTolerance}
                    className="btn btn-sm btn-outline-default waves-effect mr-0"
                    value="Update Tolerance"
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

EditTolerance.propTypes = {
  updateTolerance: PropTypes.func.isRequired,
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  errors: PropTypes.object
};

export default EditTolerance;
