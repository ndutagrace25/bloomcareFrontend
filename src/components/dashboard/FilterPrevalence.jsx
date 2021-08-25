import React from "react";
import PropTypes from "prop-types";
import { InputFields } from "../common";

const FilterPrevalence = ({
  issueCategory,
  issue,
  sdate,
  edate,
  onChange,
  IssueList,
  IssueCategoryList,
  handleSearchPrevalence,
  handleCloseSearchPrevalence,
  selectVaraities,
  selectParentBlock,
  block,
  variety
}) => {
  return (
    <div className="col-md-4" data-test="FilterPrevalenceComponent">
      <div className="card p-3">
        <h4>Filter</h4>
        <form onSubmit={e => handleSearchPrevalence(e)}>
          <div className="form-group">
            <InputFields
              type="date"
              name="sdate"
              onChange={onChange}
              label="Start Date"
              placeholder="Select Date"
              value={sdate}
            />
          </div>
          <div className="form-group">
            <InputFields
              type="date"
              name="edate"
              onChange={onChange}
              label="End Date"
              placeholder="Select Date"
              value={edate}
            />
          </div>
          <div className="form-group">
            <label>Select Issue</label>
            <select
              className="form-control"
              name="issue"
              value={issue}
              onChange={onChange}
            >
              <option>--Select Issue--</option>
              {IssueList}
            </select>
          </div>
          {/* <div className="form-group">
            <label>Select Category</label>
            <select
              className="form-control"
              name="issueCategory"
              value={issueCategory}
              onChange={onChange}
            >
              <option>--Select IssueCategory--</option>
              {IssueCategoryList}
            </select>
          </div> */}
          {/* SELECT BLOCK */}
          <div className="form-group">
            <label>Select Block</label>
            <select
              className="form-control"
              name="block"
              value={block}
              onChange={onChange}
            >
              <option>--Select Block--</option>
              {selectParentBlock}
            </select>
          </div>

          {/* SELECT VARIETY */}
          <div className="form-group">
            <label>Select Variety</label>
            <select
              className="form-control"
              name="variety"
              value={variety}
              onChange={onChange}
            >
              <option>--Select Variety--</option>
              {selectVaraities}
            </select>
          </div>
          <div className="d-flex justify-content-between">
            <button
              className="btn btn-sm btn-outline-danger waves-effect ml-0"
              onClick={handleCloseSearchPrevalence}
            >
              <i className="fas fa-times mr-1"></i>Close
            </button>
            <button
              className="btn btn-sm btn-outline-default waves-effect mr-0"
              type="submit"
            >
              <i className="fas fa-search mr-1"></i>Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
FilterPrevalence.propTypes = {
  issueCategory: PropTypes.string,
  issue: PropTypes.string,
  sdate: PropTypes.string,
  edate: PropTypes.string,
  onChange: PropTypes.func,
  IssueList: PropTypes.array,
  IssueCategoryList: PropTypes.array,
  handleSearchPrevalence: PropTypes.func,
  handleCloseSearchPrevalence: PropTypes.func
};

export default FilterPrevalence;
