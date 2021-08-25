import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

class NewEditTolerance extends Component {
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
    const alltoleranceType =
      toleranceType instanceof Array
        ? toleranceType.map((toleranceType, index) => (
            <React.Fragment key={index}>
              <option value={toleranceType.id}>{toleranceType.name}</option>
            </React.Fragment>
          ))
        : null;
    return (
      <React.Fragment>
        {" "}
        <div
          className="modal fade"
          id={"edittoleranceselected" + _id}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <form className="modal-content rounded-0">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit Tolerance
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
                  <label className="text-nowrap col-sm-2 pl-n15">
                    TOLERANCE Name:
                  </label>
                  <div className="form-group col-sm-5 pl-n15">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Tolerance Name"
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
                  <label className="text-nowrap col-sm-2 pl-n15">FROM:</label>
                  <div className="form-group col-sm-5 pl-n15">
                    <input
                      className="form-control"
                      type="number"
                      placeholder="From"
                      name="from"
                      onChange={this.onChangeNumber}
                      value={from}
                      autoComplete="off"
                    />
                    {errors && (
                      <small className="form-text text-danger">
                        {errors.from}
                      </small>
                    )}
                  </div>
                </div>
                <div className="d-flex flex-nowrap align-items-baseline">
                  <label className="text-nowrap col-sm-2 pl-n15">TO:</label>
                  <div className="form-group col-sm-5 pl-n15">
                    <input
                      className="form-control"
                      type="number"
                      placeholder="To"
                      name="to"
                      onChange={this.onChangeNumber}
                      value={to}
                      autoComplete="off"
                    />
                    {errors && (
                      <small className="form-text text-danger">
                        {errors.to}
                      </small>
                    )}
                  </div>
                </div>
                <div className="d-flex flex-nowrap align-items-baseline">
                  <label className="col-sm-2 pl-n15">
                    TOLERANCE TYPE:
                  </label>
                  <div className="form-group col-sm-5 pl-n15">
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
                      <small className="form-text text-danger">
                        {errors.name}
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
                  onClick={this.submitNewTolerance}
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
NewEditTolerance.propTypes = {
  updateTolerance: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  errors: PropTypes.object
};

export default NewEditTolerance;
