import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

class NewCreateTolerance extends Component {
  state = {
    name: "",
    from: 0,
    to: 0,
    tolerance_type: ""
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

  submitNewTolerance = e => {
    e.preventDefault();
    const { name, from, to, tolerance_type } = this.state;
    // let toleType = parseInt(tolerance_type);
    const tolerance = {
      name,
      from,
      to,
      tolerance_type
    };
    console.log(tolerance);
    this.props.handlePreloaderStyle("d-block");
    this.props.handleCreateTolerance(tolerance);
  };

  componentWillReceiveProps = () => {
    const { name, from, to, tolerance_type } = this.props;
    this.setState({
      name,
      from,
      to,
      tolerance_type
    });
  };
  render() {
    const { name, from, to, tolerance_type } = this.state;
    const { errors, toleranceType } = this.props;

    const alltoleranceType =
      toleranceType instanceof Array
        ? toleranceType.map((toleranceType, index) => (
            <React.Fragment key={index}>
              <option value={toleranceType.id} style={{ fontStyle: "normal" }}>
                {toleranceType.name}
              </option>
            </React.Fragment>
          ))
        : null;
    return (
      <div
        className="modal fade"
        id="createtolerance"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <form className="modal-content rounded-0">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add Tolerance
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
                  Tolerance Name:
                </label>
                <div className="form-group col-sm-5 pl-n15">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="name"
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
                <label className="text-nowrap col-sm-3 pl-n15">From:</label>
                <div className="form-group col-sm-5 pl-n15">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="from"
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
                <label className="text-nowrap col-sm-3 pl-n15">To:</label>
                <div className="form-group col-sm-5 pl-n15">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="to"
                    name="to"
                    onChange={this.onChangeNumber}
                    value={to}
                    autoComplete="off"
                  />
                  {errors && (
                    <small className="form-text text-danger">{errors.to}</small>
                  )}
                </div>
              </div>
              <div className="d-flex flex-nowrap align-items-baseline">
                <label className="text-nowrap col-sm-3 pl-n15">
                  Tolerance Type:
                </label>
                <div className="form-group col-sm-5 pl-n15">
                  <select
                    name="tolerance_type"
                    className={classnames("form-control selectPlaceholder", {
                      "is-invalid": errors.tolerance_type
                    })}
                    value={tolerance_type}
                    onChange={this.onChange}
                    style={{ fontSize: "14px" }}
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
                type="submit"
                className="btn btn-primary rounded-0"
                onClick={this.submitNewTolerance}
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

NewCreateTolerance.propTypes = {
  handleCreateTolerance: PropTypes.func.isRequired,
  // toleranceType: PropTypes.array.isRequired,
  errors: PropTypes.object
};

export default NewCreateTolerance;
