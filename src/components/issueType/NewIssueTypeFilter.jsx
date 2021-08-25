import React, { Component } from "react";
import PropTypes from "prop-types";

class NewIssueTypeFilter extends Component {
  state = {};
  render() {
    const {
      search_name,
    } = this.props;
    // const { NewIssueTypeFilter } = this.props;
    // const allNewIssueTypeList = NewIssueTypeFilter
    //   ? NewIssueTypeFilter.map(issueType => (
    //       <React.Fragment key={issueType._id}>
    //         <div>
    //           <input
    //             className="styled-checkbox"
    //             id={issueType._id}
    //             type="checkbox"
    //             defaultChecked
    //             value={issueType._id}
    //             checked='false'
    //           />
    //         </div>
    //       </React.Fragment>
    //     ))
    //   : null;
    return (
      <div className="d-flex flex-column mt-2 col-sm-2 border-right">
        <h5 className="mb-2">FILTER BY</h5>
        <form action="" className="mb-2">
          <h6>Issue Type Name:</h6>
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Issue Type Name"
            onChange={this.props.onChange}
            value={search_name}
            name="search_name"
            autoComplete="off"
          />
        </form>
      </div>
    );
  }
}

NewIssueTypeFilter.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  handleCloseSearch: PropTypes.func.isRequired,
  search_name: PropTypes.string
};

export default NewIssueTypeFilter;
