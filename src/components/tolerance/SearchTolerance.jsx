import React, { Component } from "react";
import PropTypes from "prop-types";

import { InputFields, Button, SearchContainer } from "../common";

class SearchTolerance extends Component {
  render() {
    const { search_name, search_tolerance_type } = this.props;
    const { toleranceType } = this.props;
    const alltoleranceType = (toleranceType) ? toleranceType.map(toleranceType => (
      <React.Fragment key={toleranceType._id}>
        <option value={toleranceType._id} style={{ fontStyle: "normal" }}>
          {toleranceType.name}
        </option>
      </React.Fragment>
    )): null;
    return (
      <SearchContainer
        data-test="SearchToleranceComponent"
        searchForm={
          <form noValidate onSubmit={e => this.props.handleSearch(e)}>
            {/* TOLERANCE NAME */}
            <InputFields
              type="text"
              name="search_name"
              onChange={this.props.onChange}
              value={search_name}
              label="Tolerance Name"
            />

            {/* TOLERANCE TYPE NAME */}
            <div className="form-group">
              <label htmlFor="tolerance_type">Tolerance Type</label>
              <select
                name="search_tolerance_type"
                className="form-control selectPlaceholder"
                value={search_tolerance_type}
                onChange={this.props.onChange}
                style={{ fontSize: "14px" }}
              >
                <option value="">--Select Tolerance Type--</option>
                {alltoleranceType}
              </select>
            </div>
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

SearchTolerance.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  handleCloseSearch: PropTypes.func.isRequired,
  search_name: PropTypes.string,
  search_percentage: PropTypes.string,
  search_tolerance_type: PropTypes.string,
  toleranceType: PropTypes.array

};

export default SearchTolerance;
