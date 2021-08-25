import React, { Component } from "react";
// import PropTypes from "prop-types";

import { InputFields, Button, SearchContainer } from "../common";

class SearchTimeReport extends Component {
  render() {
    const { block, date, parentBlockList } = this.props;
    let allBlocks;
    allBlocks =
      parentBlockList instanceof Array
        ? parentBlockList.map(block => (
            <option
              value={block.id}
              style={{ fontStyle: "normal" }}
              key={block.id}
            >
              {block.block_name}
            </option>
          ))
        : null;
    return (
      <React.Fragment>
        {/* <SearchContainer
          data-test="SearchTimeReportComponent"
          searchForm={
            <form noValidate onSubmit={e => this.props.handleSearch(e)}> */}
        {/* SCOUTED DATE */}
        {/* <InputFields
                type="date"
                name="date"
                onChange={this.props.onChange}
                value={date}
                label="Scouted Date"
              /> */}
        {/* SELECT BLOCK */}
        {/* <div className="form-group">
                <label htmlFor="block">Block Name</label>
                <select
                  name="block"
                  className="form-control selectPlaceholder"
                  value={block}
                  onChange={this.props.onChange}
                  style={{ fontSize: "14px" }}
                >
                  <option value="" disabled>
                    --Select Block--
                  </option>
                  {allBlocks}
                </select>
              </div> */}
        {/* <div className="d-flex justify-content-between">
                <Button
                  onClick={this.props.handleCloseSearch}
                  className="btn btn-sm btn-outline-danger waves-effect ml-0"
                  otherProps={<i className="fas fa-window-close mr-1" />}
                  value=" Close"
                />

                <Button
                  type="submit"
                  className="btn btn-sm btn-outline-default waves-effect mr-0"
                  otherProps={<i className="fas fa-search mr-1" />}
                  value=" Search"
                />
              </div>
            </form>
          }
        /> */}

        <div className="col-md-4 pr-n15 mt-3" data-test="FilterTimeReport">
          <form
            onSubmit={e => this.props.handleSearch(e)}
            className="bg-white p-4"
          >
            <h6>Filter by</h6>
            <div className="form-group form-inline">
              <label className="col-sm-2 pl-n15">Date:</label>
              <input
                type="date"
                name="date"
                onChange={this.props.onChange}
                value={date}
                className="form-control form-control-sm col-sm-10"
              />
            </div>
            <div className="form-group form-inline">
              <label htmlFor="block" className="col-sm-2 pl-n15">
                Block:
              </label>
              <select
                name="block"
                className="col-sm-10 form-control form-control-sm"
                value={block}
                onChange={this.props.onChange}
                style={{ fontSize: "14px" }}
              >
                <option value="" disabled>
                  --Select Block--
                </option>
                {allBlocks}
              </select>
            </div>

            <div className="d-flex justify-content-between">
              <button
                className="btn btn-outline-danger rounded-0"
                onClick={this.props.handleCloseSearch}
              >
                RESET
              </button>
              <button
                className="btn btn-primary rounded-0"
                type="submit"
              >
                SEARCH
              </button>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

// SearchTimeReport.propTypes = {
//   handleSearch: PropTypes.func.isRequired,
//   handleCloseSearch: PropTypes.func.isRequired,
//   search_name: PropTypes.string
// };

export default SearchTimeReport;
