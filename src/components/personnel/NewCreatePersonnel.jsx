import React, { Component } from "react";
import PropTypes from "prop-types";


class NewCreatePersonnel extends Component {
  state = {
    first_name: "",
    last_name: "",
    phone: "",
    status: "",
    personnel_type_id: ""
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitNewPersonnel = e => {
    e.preventDefault();
    const {
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
    this.props.handleCreatePersonnel(personnel);
  };

  componentWillReceiveProps = () => {
    const {
      first_name,
      last_name,
      phone,
      status,
      personnel_type_id
    } = this.props;
    this.setState({
      first_name,
      last_name,
      phone,
      status,
      personnel_type_id
    });
  };

  render() {
    const {
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
            <React.Fragment key={person.id}>
              <option value={person.id} style={{ fontStyle: "normal" }}>
                {person.personnel_type_name}
              </option>
            </React.Fragment>
          ))
        : null;
    return (
      <div
        className="modal fade"
        id="createpersonnel"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <form className="modal-content rounded-0">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add Personnel
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
                <label className="text-nowrap col-sm-3 pl-n15">
                  FIrst Name:
                </label>
                <div className="form-group col-sm-5 pl-n15">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="First Name"
                    name="first_name"
                    onChange={this.onChange}
                    value={first_name}
                    autoComplete="off"
                  />
                  {errors && (
                    <small className="form-text text-danger">
                      {errors.first_name}
                    </small>
                  )}
                </div>
              </div>
              <div className="d-flex flex-nowrap align-items-baseline">
                <label className="col-sm-3 pl-n15">Last Name:</label>
                <div className="form-group col-sm-5 pl-n15">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Last Name"
                    name="last_name"
                    onChange={this.onChange}
                    value={last_name}
                    autoComplete="off"
                  />
                  {errors && (
                    <small className="form-text text-danger">
                      {errors.last_name}
                    </small>
                  )}
                </div>
              </div>
              <div className="d-flex flex-nowrap align-items-baseline">
                <label className="col-sm-3 pl-n15">Phone:</label>
                <div className="form-group col-sm-5 pl-n15">
                <input
                  className="form-control"
                  type="number"
                  placeholder="Phone Number"
                  name="phone"
                  onChange={this.onChange}
                  value={phone}
                  autoComplete="off"
                />
                {errors && (
                  <small className="form-text text-danger">
                    {errors.phone}
                  </small>
                )}
                </div>

              </div>
              <div className="d-flex flex-nowrap align-items-baseline">
                <label htmlFor="status" className="text-nowrap col-sm-3 pl-n15">
                  Personnel Status:
                </label>
                <div className="form-group col-sm-5 pl-n15">
                <select
                  name="status"
                  className="form-control"
                  value={status}
                  onChange={this.onChange}
                >
                  <option value="" disabled>
                    --Personnel Status--
                  </option>
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </select>
                {errors && (
                      <small className="form-text text-danger">
                        {errors.status}
                      </small>
                    )}
                </div>

              </div>
              <div className="d-flex flex-nowrap align-items-end mb-3">
                <label
                  htmlFor="col-sm-2 pl-n1"
                  className="text-nowrap col-sm-3 pl-n15"
                >
                  Personnel Type:
                </label>
                <div className="form-group col-sm-5 pl-n15">
                <select
                  name="personnel_type_id"
                  className="form-control"
                  value={personnel_type_id}
                  onChange={this.onChange}
                >
                  <option value="" disabled className="selectPlaceholder">
                    --Personnel Type--
                  </option>
                  {allPersonnelType}
                </select>

                {errors && (
                      <small className="form-text text-danger">
                        {errors.personnel_type_id}
                      </small>
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
                onClick={this.submitNewPersonnel}
              >
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

NewCreatePersonnel.propTypes = {
  handleCreatePersonnel: PropTypes.func.isRequired,
  errors: PropTypes.object,
  personnelType: PropTypes.array.isRequired
};

export default NewCreatePersonnel;
