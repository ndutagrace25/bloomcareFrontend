import React, { Component } from "react";

class NewCreateToleranceType extends Component {
  state = {
    name: ""
  };
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitNewToleranceType = e => {
    e.preventDefault();
    const { name } = this.state;
    const toleranceType = {
      name
    };
    this.props.handlePreloaderStyle("d-block");
    this.props.handleCreateToleranceType(toleranceType);
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
      <div
        className="modal fade"
        id="createtolerancetype"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <form className="modal-content rounded-0">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add Tolerance Type
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
                <label className="col-sm-4 pl-n15">Tolerance Type Name:</label>
                <div className="form-group col-sm-5 pl-n15">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Name"
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
              <div className="d-flex justify-content-between align-items-end mb-4">
                {/* {errors && (
                  <small className="form-text text-danger">
                    {errors.plant_date}
                  </small>
                )} */}
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
                onClick={this.submitNewToleranceType}
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

export default NewCreateToleranceType;
