import React, { Component } from "react";
import PropTypes from "prop-types";

import { InputFields, Button, SearchContainer } from "../common";

class SearchBed extends Component {
  render() {
    const {
      search_bed_name,
      search_bed_number,
      search_block,
      search_sub_block,
      search_variety,
      search_plant_date,
      search_expected_pick_date,
      search_status
    } = this.props;
    const { blockList, varietyList } = this.props;
    const allBlocks = blockList
      ? blockList.map(blockList => (
          <React.Fragment key={blockList._id}>
            <option
              value={blockList.parent_block}
              style={{ fontStyle: "normal" }}
            >
              {blockList.parent_block}
            </option>
          </React.Fragment>
        ))
      : null;

    const allSubBlock = blockList
      ? blockList.map(blockList => (
          <React.Fragment key={blockList._id}>
            <option
              value={blockList.sub_block_name}
              style={{ fontStyle: "normal" }}
            >
              {blockList.sub_block_name}
            </option>
          </React.Fragment>
        ))
      : null;

    const allVariety = varietyList
      ? varietyList.map(varietyList => (
          <React.Fragment key={varietyList._id}>
            <option value={varietyList.name} style={{ fontStyle: "normal" }}>
              {varietyList.name}
            </option>
          </React.Fragment>
        ))
      : null;

    return (
      <SearchContainer
        data-test="SearchBedComponent"
        searchForm={
          <form noValidate onSubmit={e => this.props.handleSearch(e)}>
            {/* BED NAME */}
            <InputFields
              type="text"
              name="search_bed_name"
              onChange={this.props.onChange}
              value={search_bed_name}
              label="Bed Name"
            />
            {/* BED NUMBER */}
            <InputFields
              type="text"
              name="search_bed_number"
              onChange={this.props.onChange}
              value={search_bed_number}
              label="Bed Number"
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
                <option value="" disabled>
                  --Select Block--
                </option>
                {allBlocks}
              </select>
            </div>
            {/* SUB-BLOCK NAME */}
            <div className="form-group">
              <label htmlFor="sub_block_name">Sub-Block Name</label>
              <select
                name="search_sub_block"
                className="form-control selectPlaceholder"
                value={search_sub_block}
                onChange={this.props.onChange}
                style={{ fontSize: "14px" }}
              >
                <option value="" disabled>
                  --Select Sub-Block--
                </option>
                {allSubBlock}
              </select>
            </div>
            {/* VARIETY NAME */}
            <div className="form-group">
              <label htmlFor="variety">Variety Name</label>
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
                {allVariety}
              </select>
            </div>
            {/* PLANT DATE */}
            <InputFields
              type="date"
              name="search_plant_date"
              onChange={this.props.onChange}
              value={search_plant_date}
              label="Plant Date"
            />

            {/* EXPECTED PLANT DATE */}
            <InputFields
              type="date"
              name="search_expected_pick_date"
              onChange={this.props.onChange}
              value={search_expected_pick_date}
              label="Expected Pick Date"
            />
            {/* BED STATUS */}
            <div className="form-group">
              <label htmlFor="status">Bed Status</label>
              <select
                name="search_status"
                className="form-control selectPlaceholder"
                value={search_status}
                onChange={this.props.onChange}
                style={{ fontSize: "14px" }}
              >
                <option value="" disabled>
                  --Select Bed Status--
                </option>
                <option value="1" style={{ fontStyle: "normal" }}>
                  Active
                </option>
                <option value="0" style={{ fontStyle: "normal" }}>
                  Inactive
                </option>
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

SearchBed.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  handleCloseSearch: PropTypes.func.isRequired,
  search_bed_name: PropTypes.string,
  search_bed_number: PropTypes.string,
  search_block: PropTypes.string,
  blockList: PropTypes.array.isRequired,
  varietyList: PropTypes.array.isRequired
};

export default SearchBed;
