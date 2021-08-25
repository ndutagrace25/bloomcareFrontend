import React, { Component } from "react";
import PropTypes from "prop-types";

class NewCreatePoint extends Component {
  state = {
    name: ""
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitNewPoint = e => {
    e.preventDefault();
    const { name } = this.state;
    const point = {
      name
    };
    this.props.handlePreloaderStyle("d-block");
    this.props.handleCreatePoint(point);
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
        id="creatpoint"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <form className="modal-content rounded-0">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Point
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
              {/* POINT NAME INPUT */}
              <div className="d-flex flex-nowrap align-items-baseline">
                <label className="col-sm-2 pl-n15">Name:</label>
                <div className="form-group col-sm-5 pl-n15">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Point Name"
                    name="name"
                    onChange={this.onChange}
                    value={name}
                    autoComplete="off"
                  />
                    {errors && (
                  <small className="form-text text-danger">{errors.name}</small>
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
                onClick={this.submitNewPoint}
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

NewCreatePoint.propTypes = {
  handleCreatePoint: PropTypes.func.isRequired,
  errors: PropTypes.object,
  name: PropTypes.string
};

export default NewCreatePoint;
