import React, { Component } from "react";
import PropTypes from "prop-types";
// import classnames from "classnames";

// import { InputFields, NewButton } from "../common";
// import { NewIssueCategoryList } from ".";

class NewIssueCategoryFilter extends Component {
  state = {};
  render() {
    const {
      search_issue,
    } = this.props;
    // const { NewIssueCategoryList } = this.props;
    // const allNewIssueCategoryList = NewIssueCategoryList
    //   ? NewIssueCategoryList.map(category => (
    //       <React.Fragment key={category._id}>
    //         <div>
    //           <input
    //             className="styled-checkbox"
    //             id={category._id}
    //             type="checkbox"
    //             defaultChecked
    //             value={category._id}
    //             checked='false'
    //           />
    //         </div>
    //       </React.Fragment>
    //     ))
    //   : null;
    return (
      <div className="d-flex flex-column mt-2 col-sm-2 border-right">
        <h5 className="mb-2">FILTER BY</h5>
        <h6>Issue Category Name:</h6>
        <form action="" className="mb-2">
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder=" Issue Category Name"
            onChange={this.props.onChange}
            value={search_issue}
            name="search_issue"
            autoComplete="off"
          />
        </form>
      </div>
    );
  }
}

NewIssueCategoryFilter.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  handleCloseSearch: PropTypes.func.isRequired,
  search_name: PropTypes.string
};

export default NewIssueCategoryFilter;
