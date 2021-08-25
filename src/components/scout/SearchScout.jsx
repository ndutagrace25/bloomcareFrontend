import React, { Component } from "react";
import PropTypes from "prop-types";
// import moment from "moment";

import { InputFields, Button, SearchContainer } from "../common";

class SearchScout extends Component {
  render() {
    const {
      search_date,
      search_entry,
      search_point,
      search_issue,
      search_block,
      search_bed,
      search_variety,
      search_issueCategory,
      search_tolerance,
      search_value,
      search_latitude,
      search_longitude,
      search_scout_personnel,
      search_score,
      search_issue_type
    } = this.props;
    const {
      allEntries,
      pointList,
      issueList,
      issueCategoryList,
      allBlocks,
      allBeds,
      allVariety,
      allIssueTypes,
      allTolerance,
      allScores
    } = this.props;

    //Fetch Entries
    const Entries = (allEntries) instanceof Array ? allEntries.map(allEntries => (
      <React.Fragment key={allEntries._id}>
        <option value={allEntries._id} style={{ fontStyle: "normal" }}>
          {allEntries.name}
        </option>
      </React.Fragment>
    )): null;

    //Fetch Scores
    const Scores = (allScores) instanceof Array ? allScores.map(allScores => (
      <React.Fragment key={allScores._id}>
        <option value={allScores._id} style={{ fontStyle: "normal" }}>
          {allScores.name}
        </option>
      </React.Fragment>
    )): null;

    //Fetch Blocks
    const Blocks = allBlocks instanceof Array
      ? allBlocks.map(allBlocks => (
          <React.Fragment key={allBlocks._id}>
            <option value={allBlocks._id} style={{ fontStyle: "normal" }}>
              {allBlocks.parent_block}
            </option>
          </React.Fragment>
        ))
      : null;

    //Fetch Beds
    const Beds = allBeds instanceof Array
      ? allBeds.map(allBeds => (
          <React.Fragment key={allBeds._id}>
            <option value={allBeds._id} style={{ fontStyle: "normal" }}>
              {allBeds.bed_name}
            </option>
          </React.Fragment>
        ))
      : null;

    //Fetch Variety
    const Variety = allVariety instanceof Array
      ? allVariety.map(allVariety => (
          <React.Fragment key={allVariety._id}>
            <option value={allVariety._id} style={{ fontStyle: "normal" }}>
              {allVariety.name}
            </option>
          </React.Fragment>
        ))
      : null;

    //Fetch IssueType
    const IssueTypes = allIssueTypes instanceof Array
      ? allIssueTypes.map(allIssueTypes => (
          <React.Fragment key={allIssueTypes._id}>
            <option value={allIssueTypes._id} style={{ fontStyle: "normal" }}>
              {allIssueTypes.name}
            </option>
          </React.Fragment>
        ))
      : null;

    //Fetch Tolerance
    const Tolerance = allTolerance instanceof Array
      ? allTolerance.map(allTolerance => (
          <React.Fragment key={allTolerance._id}>
            <option value={allTolerance._id} style={{ fontStyle: "normal" }}>
              {allTolerance.name}
            </option>
          </React.Fragment>
        ))
      : null;

    let allPoints;
    if (typeof pointList !== "undefined") {
      allPoints = pointList instanceof Array
        ? pointList.map(pointList => (
            <React.Fragment key={pointList._id}>
              <option value={pointList._id} style={{ fontStyle: "normal" }}>
                {pointList.name}
              </option>
            </React.Fragment>
          ))
        : null;
    }

    //Fetch Issues
    const allIssues = issueList instanceof Array
      ? issueList.map(issueList => (
          <React.Fragment key={issueList._id}>
            <option value={issueList._id} style={{ fontStyle: "normal" }}>
              {issueList.issue_name}
            </option>
          </React.Fragment>
        ))
      : null;

    //Fetch Issue Categories
    const allCategories = issueCategoryList instanceof Array
      ? issueCategoryList.map(issueCategoryList => (
          <React.Fragment key={issueCategoryList._id}>
            <option
              value={issueCategoryList._id}
              style={{ fontStyle: "normal" }}
            >
              {issueCategoryList.name}
            </option>
          </React.Fragment>
        ))
      : null;
    return (
      <SearchContainer
        data-test="SearchScoutComponent"
        searchForm={
          <form noValidate onSubmit={e => this.props.handleSearch(e)}>
            {/* PERSONNEL */}
            <InputFields
              type="text"
              name="search_scout_personnel"
              onChange={this.props.onChange}
              value={search_scout_personnel}
              label="Personnel Name"
            />
            {/* DATE */}
            <InputFields
              type="date"
              name="search_date"
              onChange={this.props.onChange}
              value={search_date}
              label="Scouting Date"
            />

            {/* BLOCK*/}
            <div className="form-group">
              <label htmlFor="block">Block Name</label>
              <select
                name="search_block"
                className="form-control selectPlaceholder"
                value={search_block}
                onChange={this.props.onChange}
                style={{ fontSize: "14px" }}
              >
                <option value="" disabled>
                  --Select Block Name--
                </option>
                {Blocks}
              </select>
            </div>

            {/* BLOCK*/}
            <div className="form-group">
              <label htmlFor="bed">Bed Name</label>
              <select
                name="search_bed"
                className="form-control selectPlaceholder"
                value={search_bed}
                onChange={this.props.onChange}
                style={{ fontSize: "14px" }}
              >
                <option value="" disabled>
                  --Select Bed Name--
                </option>
                {Beds}
              </select>
            </div>

            {/* ENTRY*/}
            <div className="form-group">
              <label htmlFor="entry">Entry Name</label>
              <select
                name="search_entry"
                className="form-control selectPlaceholder"
                value={search_entry}
                onChange={this.props.onChange}
                style={{ fontSize: "14px" }}
              >
                <option value="" disabled>
                  --Select Entry Name--
                </option>
                {Entries}
              </select>
            </div>

            {/* POINT*/}
            <div className="form-group">
              <label htmlFor="point">Point</label>
              <select
                name="search_point"
                className="form-control selectPlaceholder"
                value={search_point}
                onChange={this.props.onChange}
                style={{ fontSize: "14px" }}
              >
                <option value="" disabled>
                  --Select Point--
                </option>
                {allPoints}
              </select>
            </div>

            {/* VARIETY*/}
            <div className="form-group">
              <label htmlFor="variety">Variety</label>
              <select
                name="search_variety"
                className="form-control selectPlaceholder"
                value={search_variety}
                onChange={this.props.onChange}
                style={{ fontSize: "14px" }}
              >
                <option value="" disabled>
                  --Select Variety--
                </option>
                {Variety}
              </select>
            </div>

            {/* LONGITUDE */}
            <InputFields
              type="text"
              name="search_longitude"
              onChange={this.props.onChange}
              value={search_longitude}
              label="Longitude"
            />

            {/* LATITUDE */}
            <InputFields
              type="text"
              name="search_latitude"
              onChange={this.props.onChange}
              value={search_latitude}
              label="Latitude"
            />

            {/* ISSUE*/}
            <div className="form-group">
              <label htmlFor="issue">Issue Name</label>
              <select
                name="search_issue"
                className="form-control selectPlaceholder"
                value={search_issue}
                onChange={this.props.onChange}
                style={{ fontSize: "14px" }}
              >
                <option value="" disabled>
                  --Select Issue Name--
                </option>
                {allIssues}
              </select>
            </div>

            {/* ISSUE CATEGORY*/}
            <div className="form-group">
              <label htmlFor="issueCategory">Issue Category</label>
              <select
                name="search_issueCategory"
                className="form-control selectPlaceholder"
                value={search_issueCategory}
                onChange={this.props.onChange}
                style={{ fontSize: "14px" }}
              >
                <option value="" disabled>
                  --Select Issue Category--
                </option>
                {allCategories}
              </select>
            </div>

            {/* ISSUE TYPE*/}
            <div className="form-group">
              <label htmlFor="issueCategory">Issue Type</label>
              <select
                name="search_issue_type"
                className="form-control selectPlaceholder"
                value={search_issue_type}
                onChange={this.props.onChange}
                style={{ fontSize: "14px" }}
              >
                <option value="" disabled>
                  --Select Issue Type--
                </option>
                {IssueTypes}
              </select>
            </div>

            {/* TOLERANCE*/}
            <div className="form-group">
              <label htmlFor="issueType">Tolerance</label>
              <select
                name="search_tolerance"
                className="form-control selectPlaceholder"
                value={search_tolerance}
                onChange={this.props.onChange}
                style={{ fontSize: "14px" }}
              >
                <option value="" disabled>
                  --Select Tolerance--
                </option>
                {Tolerance}
              </select>
            </div>

            {/* SCORE*/}
            <div className="form-group">
              <label htmlFor="score">Score</label>
              <select
                name="search_score"
                className="form-control selectPlaceholder"
                value={search_score}
                onChange={this.props.onChange}
                style={{ fontSize: "14px" }}
              >
                <option value="" disabled>
                  --Select Score--
                </option>
                {Scores}
              </select>
            </div>

            {/* VALUE */}
            <InputFields
              type="number"
              name="search_value"
              onChange={this.props.onChange}
              value={search_value}
              label="Value"
            />

            <div className="d-flex justify-content-between">
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
      />
    );
  }
}

SearchScout.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  handleCloseSearch: PropTypes.func.isRequired,
  search_date: PropTypes.string,
  search_plant: PropTypes.string,
  search_entry: PropTypes.string,
  search_point: PropTypes.string,
  search_issue: PropTypes.string,
  search_issueCategory: PropTypes.string,
  search_value: PropTypes.string
};

export default SearchScout;
