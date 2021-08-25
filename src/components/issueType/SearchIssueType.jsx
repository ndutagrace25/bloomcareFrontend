import React, { Component } from "react";
import PropTypes from "prop-types";

import { InputFields, Button, SearchContainer } from "../common";
 
class SearchIssueType extends Component {
  render() {
    const { search_name } = this.props;
    return (
      <SearchContainer
      data-test="SearchIssueTypeComponent"
        searchForm={
          <form noValidate onSubmit={e => this.props.handleSearch(e)}>
            <InputFields
              type="text"
              name="search_name"
              onChange={this.props.onChange}
              value={search_name}
              label="Issue Type Name"
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

SearchIssueType.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  handleCloseSearch: PropTypes.func.isRequired,
  search_name: PropTypes.string
};

export default SearchIssueType;
