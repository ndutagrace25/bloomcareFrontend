import React, { Component } from "react";
import PropTypes from "prop-types";

import PrintView from "./PrintView";
import { InputFields } from "../common";

class SingleBlockView extends Component {
  render() {
    const {
      allBeds,
      LeftSide,
      RightSide,
      _id,
      onBlockClick,
      selectVaraities,
      selectPersonnel,
      search_variety,
      search_issue,
      search_scout,
      blockName,
      ScoutName,
      VarietyName,
      // bed_id,
      search_date,
      IssueList
    } = this.props;


    return (
      <div data-test="SingleBlockViewComponent">
        <nav className="d-flex justify-content-around">
          <div className="nav nav-tabs " id="nav-tab" role="tablist">
            <a
              className="nav-item nav-link active"
              id="block-view-tab"
              data-toggle="tab"
              href="#block-view"
              role="tab"
              aria-controls="block-view"
              aria-selected="true"
            >
              View
            </a>
            <a
              className="nav-item nav-link"
              id="block-print-tab"
              data-toggle="tab"
              href="#block-print"
              role="tab"
              aria-controls="block-print"
              aria-selected="false"
              onClick={() => {
                onBlockClick(_id);
              }}
            >
              Print
            </a>
          </div>
        </nav>
        <div className="tab-content" id="nav-tabContent">
          <div
            className="tab-pane fade show active"
            id="block-view"
            role="tabpanel"
            aria-labelledby="block-view-tab"
          >
            <div className="container-fluid">
              <div className="beds-container d-flex flex-wrap justify-content-between">
                {allBeds}
              </div>
            </div>
          </div>

          <div
            className="tab-pane fade"
            id="block-print"
            role="tabpanel"
            aria-labelledby="block-print-tab"
          >
            <div className="container-fluid">
              <div className="beds-print-container">
                <form
                  onSubmit={e => this.props.handleSearch(e)}
                  className="col-md-12 d-flex flex-wrap"
                >
                  {/* SELECT VARIETY */}
                  <div className="col-md-2 d-flex justify-content-center mt-1">
                    <div className="form-group">
                      <label>Select Variety</label>
                      <select
                        className="form-control rounded-0"
                        name="search_variety"
                        value={search_variety}
                        onChange={this.props.onChange}
                      >
                        <option value="">All Varieties</option>
                        {selectVaraities}
                      </select>
                    </div>
                  </div>
                  {/* SELECT ISSUE */}
                  <div className="col-md-2 d-flex justify-content-center mt-1">
                    <div className="form-group">
                      <label>Select Issue</label>
                      <select
                        className="form-control rounded-0"
                        name="search_issue"
                        value={search_issue}
                        onChange={this.props.onChange}
                      >
                        <option value="">All Issues</option>
                        {IssueList}
                      </select>
                    </div>
                  </div>
                  {/* SELECT SCOUT */}
                  <div className="col-md-2 d-flex justify-content-center mt-1">
                    <div className="form-group">
                      <label>Select Scout</label>
                      <select
                        className="form-control rounded-0"
                        name="search_scout"
                        onChange={this.props.onChange}
                        value={search_scout}
                      >
                        <option value="">All Scouts</option>
                        {selectPersonnel}
                      </select>
                    </div>
                  </div>
                  {/* SELECT DATE */}
                  <div className="col-md-2 d-flex justify-content-center mt-1">
                    <div className="form-group">
                      <InputFields
                        type="date"
                        name="search_date"
                        onChange={this.props.onChange}
                        label="Date"
                        placeholder="Select Date"
                        value={search_date}
                      />
                    </div>
                  </div>
                  <div className="col-md-2 d-flex justify-content-start">
                    <div className="form-group d-flex align-items-end justify-content-start">
                      <button
                        className="btn-wide btn btn-outline-default waves-effect ml-0 d-flex flex-nowrap align-items-center"
                        type="submit"
                      >
                        <i className="fas fa-search mr-1"></i>Search
                      </button>
                      <button
                        className="btn-wide btn btn-outline-danger waves-effect mr-0 ml-4 d-flex flex-nowrap align-items-center"
                        onClick={this.props.handleCloseSearch}
                      >
                        <i className="fas fa-times mr-1"></i>Close
                      </button>
                    </div>
                  </div>
                </form>
                {/* SYMBOLS */}
                <div className="col-md-12 d-flex justify-content-center">
                  <div className="symbols-menu d-flex justify-content-around">
                    <div className="success-sign">
                      <img src={require("../../assets/svg/blank.svg")} alt="" />
                      OKAY
                    </div>
                    <div className="success-sign">
                      <img
                        src={require("../../assets/svg/warning.svg")}
                        alt=""
                      />
                      WARNING
                    </div>
                    <div className="success-sign">
                      <img
                        src={require("../../assets/svg/danger.svg")}
                        alt=""
                      />
                      DANGER
                    </div>
                  </div>
                </div>
                {/* PRINT VIEW */}
                <PrintView
                  LeftSide={LeftSide}
                  RightSide={RightSide}
                  _id={_id}
                  blockName={blockName}
                  search_scout={search_scout}
                  search_date={search_date}
                  ScoutName={ScoutName}
                  VarietyName={VarietyName}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SingleBlockView.propTypes = {
  allBeds: PropTypes.array.isRequired,
  LeftSide: PropTypes.array.isRequired,
  RightSide: PropTypes.array.isRequired,
  _id: PropTypes.string.isRequired,
  onBlockClick: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  handleCloseSearch: PropTypes.func.isRequired,
  search_variety: PropTypes.string,
  search_scout: PropTypes.string,
  search_date: PropTypes.string
};

export default SingleBlockView;
