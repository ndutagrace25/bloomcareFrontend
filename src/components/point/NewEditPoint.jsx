import React, { Component } from "react";
import PropTypes from "prop-types";

class NewEditPoint extends Component {
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

  submitNewPoint = e => {
    e.preventDefault();
    const { _id, name } = this.state;
    const point = {
      name
    };
    this.props.handlePreloaderStyle("d-block");
    this.props.updatePoint(_id, point);
  };

  render() {
    const { _id, name } = this.state;
    const { errors } = this.props;
    return (
      <React.Fragment>
        <div
          className="modal fade"
          id={"editpointselected" + _id}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <form className="modal-content rounded-0">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit Point
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
                {/* POINT NAME */}
                <div className="d-flex flex-nowrap align-items-baseline">
                  <label className="col-sm-2 pl-n15">Name:</label>
                  <div className="form-group col-sm-5 pl-n15">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Entry Name"
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
                  onClick={this.submitNewPoint}
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

NewEditPoint.propTypes = {
  updatePoint: PropTypes.func,
  _id: PropTypes.string,
  name: PropTypes.string,
  errors: PropTypes.object
};

export default NewEditPoint;
