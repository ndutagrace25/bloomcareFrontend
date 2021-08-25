import React, { Component } from "react";
import PropTypes from "prop-types";

class NewIssueFilter extends Component {
  state = {};
  render() {
    const {
      search_issue_name,
      // search_issue_type,
      // search_tolerance_type,
      // search_score
    } = this.props;
    // const { issueType, toleranceType, scoreList } = this.props;

    // const allIssueType =
    //   issueType.items instanceof Array
    //     ? issueType.items.map((issueType, index) => (
    //         <React.Fragment key={index}>
    //           <div>
    //             <input
    //               className="styled-checkbox"
    //               // id="styled-checkbox-1"
    //               type="checkbox"
    //               value={issueType.name}
    //             />
    //             <label htmlFor="styled-checkbox-1">{issueType.name}</label>
    //           </div>
    //         </React.Fragment>
    //       ))
    //     : null;

    // const alltoleranceType =
    //   toleranceType instanceof Array
    //     ? toleranceType.map((toleranceType, index) => (
    //         <React.Fragment key={index}>
    //           <div>
    //             <input
    //               className="styled-checkbox"
    //               // id="styled-checkbox-1"
    //               type="checkbox"
    //               value={toleranceType.tolerance_type_name}
    //             />
    //             <label htmlFor="styled-checkbox-1">{toleranceType.name}</label>
    //           </div>
    //         </React.Fragment>
    //       ))
    //     : null;

    // const allscoreList =
    //   scoreList instanceof Array
    //     ? scoreList.map((scoreList, index) => (
    //         <React.Fragment key={index}>
    //           <div>
    //             <input
    //               className="styled-checkbox"
    //               // id="styled-checkbox-1"
    //               type="radio"
    //               value={scoreList.name}
    //             />
    //             <label htmlFor="styled-checkbox-1">{scoreList.name}</label>
    //           </div>
    //         </React.Fragment>
    //       ))
    //     : null;

    // const { NewIssueList } = this.props;
    // const allNewIssueList = NewIssueList
    //   ? NewIssueList.map((issue, index) => (
    //       <React.Fragment key={index}>
    //         <div>
    //           <input
    //             className="styled-checkbox"
    //             id={issue._id}
    //             type="checkbox"
    //             defaultChecked
    //             value={issue._id}
    //             checked="false"
    //           />
    //         </div>
    //       </React.Fragment>
    //     ))
    //   : null;

    return (
      <div className="d-flex flex-column mt-2 col-sm-2 border-right">
        <h5 className="mb-2">FILTER BY</h5>
        <form action="" className="mb-2">
          <h6>Issue Name:</h6>
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Issue Name"
            onChange={this.props.onChange}
            value={search_issue_name}
            name="search_issue_name"
            autoComplete="off"
          />
        </form>
        {/* <div className="overflow-auto"> */}
        {/* SEARCH ISSUE TYPE */}
        {/* <h6>Issue Type:</h6>
          <div className="mb-2">{allIssueType}</div> */}

        {/* SEARCH TOLERANCE TYPE */}
        {/* <div className="mb-2">
            <h6>Tolerance Type:</h6>
            {alltoleranceType} */}
        {/* </div> */}
        {/* SCORE TYPE */}
        {/* <div className="mb-2">
            <h6>Score:</h6>
            {allscoreList}
          </div>
        </div> */}
      </div>
    );
  }
}

NewIssueFilter.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  handleCloseSearch: PropTypes.func.isRequired,
  search_issue_name: PropTypes.string,
  search_issue_type: PropTypes.string,
  search_tolerance_type: PropTypes.string,
  search_score: PropTypes.string,
  // issueType: PropTypes.array.isRequired,
  // toleranceType: PropTypes.array.isRequired,
  scoreList: PropTypes.array.isRequired
};

export default NewIssueFilter;
