import React, { Component } from "react";
import PropTypes from "prop-types";

class NewEditPersonnel extends Component {
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
      // personnel_type_id
    } = this.state;
    const { errors, personnelType } = this.props;
    const allPersonnelType =
      personnelType instanceof Array
        ? personnelType.map(person => (
            <React.Fragment key={person.id}>
              <option value={person.id}>{person.personnel_type_name}</option>
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
      <React.Fragment>
        <div
          className="modal fade"
          id={"editpersonnelselected" + _id}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <form className="modal-content rounded-0">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit Personnel
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
              <div className="modal-body">
                {/* FIRST NAME */}
                <div className="d-flex flex-nowrap align-items-baseline">
                  <label className="text-nowrap col-sm-3 pl-n15">
                    First Name:
                  </label>
                  <div className="form-group col-sm-5 pl-n15">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="First Name"
                      name="first_name"
                      value={first_name}
                      onChange={this.onChange}
                      required
                      autoComplete="off"
                    />
                    {errors && (
                      <small className="form-text text-danger">
                        {errors.first_name}
                      </small>
                    )}
                  </div>
                </div>
                {/* SECOND NAME */}
                <div className="d-flex flex-nowrap align-items-baseline">
                  <label className="text-nowrap col-sm-3 pl-n15">
                    Last Name:
                  </label>
                  <div className="form-group col-sm-5 pl-n15">
                    <input
                      type="text"
                      className="form-control"
                      name="last_name"
                      value={last_name}
                      onChange={this.onChange}
                      placeholder="Last Name"
                      required
                      autoComplete="off"
                    />
                    {errors && (
                      <small className="form-text text-danger">
                        {errors.last_name}
                      </small>
                    )}
                  </div>
                </div>
                {/* PHONE NUMBER */}
                <div className="d-flex flex-nowrap align-items-baseline">
                  <label className="text-nowrap col-sm-3 pl-n15">Phone:</label>
                  <div className="form-group col-sm-5 pl-n15">
                    <input
                      type="number"
                      className="form-control"
                      name="phone"
                      value={phone}
                      onChange={this.onChange}
                      placeholder="Phone"
                      required
                      autoComplete="off"
                    />
                    {errors && (
                      <small className="form-text text-danger">
                        {errors.phone}
                      </small>
                    )}
                  </div>
                </div>
                {/* STATUS */}
                <div className="d-flex flex-nowrap align-items-baseline">
                  <label className="text-nowrap col-sm-3 pl-n15">Status:</label>
                  <div className="form-group col-sm-5 pl-n15">
                    <select
                      name="status"
                      className="form-control"
                      value={statusValue}
                      onChange={this.onChange}
                    >
                      <option value="" disabled>
                        --Select Status--
                      </option>
                      <option value={active}>Active</option>
                      <option value={inactive}>Inactive</option>
                    </select>
                    {errors && (
                      <small className="form-text text-danger">
                        {errors.status}
                      </small>
                    )}
                  </div>
                </div>
                {/* PERSONNEL TYPE */}
                <div className="d-flex flex-nowrap align-items-baseline">
                  <label className="text-nowrap col-sm-3 pl-n15">
                    Personnel Type:
                  </label>
                  <div className="form-group col-sm-5 pl-n15">
                    <select
                      name="status"
                      className="form-control"
                      value={statusValue}
                      onChange={this.onChange}
                    >
                      <option value="" disabled>
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
                >
                  CLOSE
                </button>
                <button
                  type="button"
                  className="btn btn-primary rounded-0"
                  onClick={this.submitNewPersonnel}
                >
                  UPDATE
                </button>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

NewEditPersonnel.propTypes = {
  updatePersonnel: PropTypes.func.isRequired,
  _id: PropTypes.number,
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  phone: PropTypes.string,
  status: PropTypes.number,
  personnel_type_id: PropTypes.number,
  personnelType: PropTypes.array,
  errors: PropTypes.object
};

export default NewEditPersonnel;
