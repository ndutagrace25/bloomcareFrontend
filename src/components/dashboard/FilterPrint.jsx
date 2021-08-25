import React, { Component } from "react";

class FilterPrint extends Component {
  state = {};
  render() {
    const {
      search_variety,
      search_issue,
      search_scout,
      search_date,
      allVariety,
      allIssues,
      allScouts,
      _id
    } = this.props;

    // console.log(allScouts);

    // fetch all varieties
    const AllVarieties =
      allVariety instanceof Array
        ? allVariety.map((variety, index) => (
            <option value={variety.id} key={index}>
              {variety.name}
            </option>
          ))
        : null;

    // fetch all issues
    const AllIssues =
      allIssues instanceof Array
        ? allIssues.map((issue, index) => (
            <option value={issue.id} key={index}>
              {issue.issue_name}
            </option>
          ))
        : null;

    // fetch all scouts
    const AllScouts =
      allScouts instanceof Array
        ? allScouts.map((scout, index) => (
            <option value={scout.id} key={index}>
              {scout.first_name}
            </option>
          ))
        : null;
    return (
      <form className="col-md-8 d-flex mx-auto flex-nowrap align-items-center justify-content-between form-inline">
        <div className="form-group">
          <label htmlFor="input1">Filter by:  Variety</label>
          <select
            className="form-control form-control-sm ml-2"
            id="selectInput3"
            value={search_variety}
            name="search_variety"
            onChange={(e) => this.props.onChange(e, _id)}
          >
            <option value="">All Varieties</option>
            {AllVarieties}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="input1">Issue</label>
          <select
            className="form-control form-control-sm ml-2"
            value={search_issue}
            name="search_issue"
            onChange={(e) => this.props.onChange(e, _id)}
          >
            <option value="">All Issues</option>
            {AllIssues}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="selectInput3">Scout</label>
          <select
            className="form-control form-control-sm ml-2"
            value={search_scout}
            name="search_scout"
            onChange={(e) => this.props.onChange(e, _id)}
          >
            <option value="">All Scouts</option>
            {AllScouts}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="input3">Date</label>
          <input
            type="date"
            className="form-control form-control-sm ml-2"
            value={search_date}
            name="search_date"
            onChange={(e) => this.props.onChange(e, _id)}
          />
        </div>
      </form>
    );
  }
}

export default FilterPrint;
