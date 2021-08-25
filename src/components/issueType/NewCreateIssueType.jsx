import React, { Component } from "react";
import PropTypes from "prop-types";

class NewCreateIssueType extends Component {
  state = {
    name: ""
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitNewIssueType = e => {
    e.preventDefault();
    const { name } = this.state;
    const issueType = {
      name
    };
    this.props.handlePreloaderStyle("d-block");
    this.props.handleCreateIssueType(issueType);
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
      <React.Fragment>
        <div
          className="modal fade"
          id="createIssueType"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <form className="modal-content rounded-0">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add Issue Type
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
                      placeholder="Issue Type Name"
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
                  onClick={this.submitNewIssueType}
                >
                  SUBMIT
                </button>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

NewCreateIssueType.propTypes = {
  handleCreateIssueType: PropTypes.func.isRequired,
  errors: PropTypes.object
};

export default NewCreateIssueType;
