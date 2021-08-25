import React, { Component } from "react";
import PropTypes from "prop-types";

import { InputFields, Button, SearchContainer } from "../common";

class SearchBlock extends Component {
  render() {
    const { search_parent, search_name, parentBlockList } = this.props;
    const allBlocks = parentBlockList
      ? parentBlockList.map(parentBlockList => (
          <React.Fragment key={parentBlockList._id}>
            <option value={parentBlockList._id} style={{ fontStyle: "normal" }}>
              {parentBlockList.name}
            </option>
          </React.Fragment>
        ))
      : null;
    return (
      <SearchContainer
        data-test="SearchBlockComponent"
        searchForm={
          <form noValidate onSubmit={e => this.props.handleSearch(e)}>
            <InputFields
              type="text"
              name="search_name"
              onChange={this.props.onChange}
              value={search_name}
              label="Block Name"
            />
            {/* PARENT BLOCK */}
            <div className="form-group">
              <label htmlFor="parent">Parent</label>
              <select
                name="search_parent"
                className="form-control selectPlaceholder"
                value={search_parent}
                onChange={this.props.onChange}
                style={{ fontSize: "14px" }}
              >
                <option value="">--Select Parent--</option>
                {allBlocks}
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

SearchBlock.propTypes = {
  handleCloseSearch: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  search_parent: PropTypes.string,
  search_name: PropTypes.string,
  parentBlockList: PropTypes.array.isRequired
};

export default SearchBlock;
