import React, { Component } from "react";
import PropTypes from "prop-types";

class NewEditIssueCategory extends Component {
  state = {
    _id: 0,
    name: "",
    issue: "",
    errors: {}
  };
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentDidMount() {
    const { _id, name, issue } = this.props;
    this.setState({
      _id,
      name,
      issue
    });
  }

  submitNewIssueCategory = e => {
    e.preventDefault();
    const { _id, name, issue } = this.state;
    const issueCategory = {
      name,
      issue
    };

    this.props.handlePreloaderStyle("d-block");
    this.props.updateIssueCategory(_id, issueCategory);
  };

  render() {
    const { _id, name } = this.state;
    const { errors } = this.props;
    // const allIssueList =
    //   issueList instanceof Array
    //     ? issueList.map(issueList => (
    //         <React.Fragment key={issueList._id}>
    //           <option value={issueList._id}>{issueList.issue_name}</option>
    //         </React.Fragment>
    //       ))
    //     : null;
    return (
      <React.Fragment>
        <div
          className="modal fade"
          id={"editissuecategoryselected" + _id}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <form className="modal-content rounded-0">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit Issue Category
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
                <div className="d-flex justify-content-between align-items-end mb-4">
                  <label className="col-sm-2 pl-n15">Name:</label>
                  <div className="d-flex justify-content-between col-sm-10 px-n15">
                    <input
                      className="form-control col-sm-5"
                      type="text"
                      placeholder="Entry Name"
                      name="name"
                      onChange={this.onChange}
                      value={name}
                      autoComplete="off"
                    />
                  </div>
                  {errors && (
                    <small className="form-text text-danger">
                      {errors.name}
                    </small>
                  )}
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
                  onClick={this.submitNewIssueCategory}
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

NewEditIssueCategory.propTypes = {
  updateIssueCategory: PropTypes.func.isRequired,
  // _id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  issue: PropTypes.number.isRequired,
  // issueList: PropTypes.array.isRequired,
  errors: PropTypes.object
};

export default NewEditIssueCategory;
