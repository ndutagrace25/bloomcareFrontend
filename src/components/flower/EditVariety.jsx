import React, { Component } from "react";
import PropTypes from "prop-types";

class EditVariety extends Component {
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

  submitNewFlower = e => {
    e.preventDefault();
    const { _id, name } = this.state;
    const flower = {
      name
    };
    this.props.handlePreloaderStyle("d-block");
    this.props.updateFlower(_id, flower);
  };

  render() {
    const { _id, name } = this.state;
    const { errors } = this.props;
    return (
      <React.Fragment>
        <div
          className="modal fade"
          id={"editvarietyselected" + _id}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <form className="modal-content rounded-0">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit Variety
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
                  <label className="col-sm-2 pl-n15">Name:</label>
                  <div className="form-group col-sm-5 pl-n15">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Variety Name"
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
                  onClick={this.submitNewFlower}
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

EditVariety.propTypes = {
  updateFlower: PropTypes.func.isRequired,
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default EditVariety;
