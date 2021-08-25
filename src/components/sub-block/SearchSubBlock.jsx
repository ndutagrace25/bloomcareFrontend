import React, { Component } from "react";
import PropTypes from "prop-types";

import { InputFields, Button } from "../common";

class SearchSubBlock extends Component {
  render() {
    const { search_name, search_block } = this.props;
    const { blockList } = this.props;
    const allBlocks = blockList.map(blockList => (
      <React.Fragment key={blockList._id}>
        <option value={blockList._id} style={{ fontStyle: "normal" }}>
          {blockList.block_name}
        </option>
      </React.Fragment>
    ));
    return (
      <React.Fragment>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Search</h5>
            <form noValidate onSubmit={e => this.props.handleSearch(e)}>
                {/* SUB-BLOCK NAME */}
              <InputFields
                type="text"
                name="search_name"
                onChange={this.props.onChange}
                value={search_name}
                label="Sub-Block Name"
              />
             {/* BLOCK NAME */}
              <div className="form-group">
                <label htmlFor="block">Block Name</label>
                <select
                  name="search_block"
                  className="form-control selectPlaceholder"
                  value={search_block}
                  onChange={this.props.onChange}
                  style={{ fontSize: "14px" }}
                >
                  <option value="" disabled>--Select Block--</option>
                  {allBlocks}
                </select>
              </div>
              <div className="mt-3">
                <Button
                  onClick={this.props.handleCloseSearch}
                  className="btn btn-default btn-sm"
                  otherProps={<i className="fa fa-times" />}
                  value=" Close Search"
                />

                <Button
                  type="submit"
                  className="btn btn-warning btn-sm"
                  otherProps={<i className="fa fa-search" />}
                  value=" Search"
                />
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

SearchSubBlock.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  handleCloseSearch: PropTypes.func.isRequired,
  search_name: PropTypes.string,
  search_block: PropTypes.string
};

export default SearchSubBlock;
