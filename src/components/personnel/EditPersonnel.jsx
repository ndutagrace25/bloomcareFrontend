import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import { InputFields, Button } from "../common";

class EditPersonnel extends Component {
  state = {
    _id: 0,
    first_name: "",
    last_name: "",
    phone: "",
    status: "",
    personnel_type_id: 0,
    errors: {}
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentDidMount() {
    const {
      _id,
      first_name,
      last_name,
      phone,
      status,
      personnel_type_id
    } = this.props;
    this.setState({
      _id,
      first_name,
      last_name,
      phone,
      status: status.toString(),
      personnel_type_id
    });
  }

  submitNewPersonnel = e => {
    e.preventDefault();
    const {
      _id,
      first_name,
      last_name,
      phone,
      status,
      personnel_type_id
    } = this.state;
    const personnel = {
      first_name,
      last_name,
      phone,
      status,
      personnel_type_id
    };
    this.props.handlePreloaderStyle("d-block");
    this.props.updatePersonnel(_id, personnel);
  };

  render() {
    const {
      _id,
      first_name,
      last_name,
      phone,
      status,
      personnel_type_id
    } = this.state;
    const { errors, personnelType } = this.props;
    const allPersonnelType =
      personnelType instanceof Array
        ? personnelType.map(person => (
            <React.Fragment key={person._id}>
              <option value={person._id}>{person.name}</option>
            </React.Fragment>
          ))
        : null;

    const num = 1;
    const num0 = 0;
    const num1 = status;
    const statusValue = num1.toString();
    const active = num.toString();
    const inactive = num0.toString();
    return (
      <div data-test="EditPersonnelComponent">
        <Button
          className="btn btn-primary btn-sm"
          dataTarget={"#editPersonnel" + _id}
          dataToggle="modal"
          otherProps={
            <i
              className="fas fa-pen"
              data-toggle="tooltip"
              data-placement="top"
              title="Edit Personnel"
            />
          }
        />
        <div
          className="modal fade"
          id={"editPersonnel" + _id}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-notify modal-info" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit Personnel{" "}
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
                          <i className="fas fa-user" />
                        </span>
                      }
                      type="text"
                      name="first_name"
                      onChange={this.onChange}
                      label="Personnel First Name"
                      placeholder="Personnel First Name"
                      value={first_name}
                      error={errors.first_name}
                    />
                    <InputFields
                      otherProps={
                        <span
                          className="input-group-addon"
                          style={{ marginRight: "3px" }}
                        >
                          <i className="fas fa-user" />
                        </span>
                      }
                      type="text"
                      name="last_name"
                      value={last_name}
                      onChange={this.onChange}
                      label="Personnel Last Name"
                      placeholder="Personnel Last Name"
                      error={errors.last_name}
                    />

                    <InputFields
                      otherProps={
                        <span
                          className="input-group-addon"
                          style={{ marginRight: "3px" }}
                        >
                          <i className="fas fa-phone" />
                        </span>
                      }
                      type="number"
                      name="phone"
                      value={phone}
                      onChange={this.onChange}
                      label="Personnel Phone Number"
                      placeholder="Personnel Phone Number"
                      error={errors.phone}
                    />
                    <div className="form-group">
                      <span
                        className="input-group-addon"
                        style={{ marginRight: "3px" }}
                      >
                        <i className="fab fa-accessible-icon" />
                      </span>
                      <label htmlFor="status">Personnel Status</label>
                      <select
                        name="status"
                        className={classnames("form-control", {
                          "is-invalid": errors.status
                        })}
                        value={statusValue}
                        onChange={this.onChange}
                        style={{ fontSize: "14px" }}
                      >
                        <option value="" disabled>
                          --Select Personnel Status--
                        </option>
                        <option value={active}>Active</option>
                        <option value={inactive}>Inactive</option>
                      </select>
                      {errors && (
                        <div className="invalid-feedback">{errors.status}</div>
                      )}
                    </div>

                    <div className="form-group">
                      <span
                        className="input-group-addon"
                        style={{ marginRight: "3px" }}
                      >
                        <i className="fas fa-user-cog" />
                      </span>
                      <label htmlFor="personnel_type_id">Personnel Type</label>
                      <select
                        name="personnel_type_id"
                        className={classnames("form-control", {
                          "is-invalid": errors.status
                        })}
                        value={personnel_type_id}
                        onChange={this.onChange}
                        style={{ fontSize: "14px" }}
                      >
                        <option value="">--Select Personnel Type--</option>
                        {allPersonnelType}
                      </select>

                      {errors && (
                        <div className="invalid-feedback">
                          {errors.personnel_type_id}
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
                    onClick={this.submitNewPersonnel}
                    className="btn btn-sm btn-outline-default waves-effect mr-0"
                    // dataDismiss="modal"
                    value="Update Personnel"
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

EditPersonnel.propTypes = {
  updatePersonnel: PropTypes.func.isRequired,
  _id: PropTypes.string,
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  phone: PropTypes.string,
  status: PropTypes.number,
  personnel_type_id: PropTypes.string,
  personnelType: PropTypes.array,
  errors: PropTypes.object
};

export default EditPersonnel;
