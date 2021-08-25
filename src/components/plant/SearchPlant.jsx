import React, { Component } from "react";
import PropTypes from "prop-types";

import { InputFields, Button } from "../common";

class SearchPlant extends Component {
  render() {
    const {
      search_plant_date,
      search_expected_pick_date,
      search_status,
      search_block,
      search_bed,
      search_flower
    } = this.props;
    const { blockList, bedList, flowerList } = this.props;

    //Fetch blocks
    const allBlocks = blockList
      ? blockList.map(blockList => (
          <React.Fragment key={blockList._id}>
            <option value={blockList._id} style={{ fontStyle: "normal" }}>
              {blockList.block_name}
            </option>
          </React.Fragment>
        ))
      : null;

    //Fetch beds
    const allBed = bedList
      ? bedList.map(bedList => (
          <React.Fragment key={bedList._id}>
            <option value={bedList._id} style={{ fontStyle: "normal" }}>
              {bedList.bed_name}
            </option>
          </React.Fragment>
        ))
      : null;

    //Fetch Flowers
    const allFlower = flowerList
      ? flowerList.map(flowerList => (
          <React.Fragment key={flowerList._id}>
            <option value={flowerList._id} style={{ fontStyle: "normal" }}>
              {flowerList.name}
            </option>
          </React.Fragment>
        ))
      : null;

    return (
      <div className="card" data-test="SearchPlantComponent">
        <div className="card-body">
          <h5 className="card-title">Search</h5>
          <form noValidate onSubmit={e => this.props.handleSearch(e)}>
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
              label="Expected Plant Date"
            />

            {/* PLANT STATUS */}
            <div className="form-group">
              <label htmlFor="status">Plant Status</label>
              <select
                name="search_status"
                className="form-control selectPlaceholder"
                value={search_status}
                onChange={this.props.onChange}
                style={{ fontSize: "14px" }}
              >
                <option value="" disabled>
                  --Select Plant Status--
                </option>
                <option value="1" style={{ fontStyle: "normal" }}>
                  Active
                </option>
                <option value="0" style={{ fontStyle: "normal" }}>
                  Inactive
                </option>
              </select>
            </div>

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

            {/* BED NAME */}
            <div className="form-group">
              <label htmlFor="bed_id">Bed Name</label>
              <select
                name="search_bed"
                className="form-control selectPlaceholder"
                value={search_bed}
                onChange={this.props.onChange}
                style={{ fontSize: "14px" }}
              >
                <option value="" disabled>
                  --Select Bed--
                </option>
                {allBed}
              </select>
            </div>

            {/* FLOWER NAME */}
            <div className="form-group">
              <label htmlFor="flower_id">Flower Name</label>
              <select
                name="search_flower"
                className="form-control selectPlaceholder"
                value={search_flower}
                onChange={this.props.onChange}
                style={{ fontSize: "14px" }}
              >
                <option value="" disabled>
                  --Select Flower--
                </option>
                {allFlower}
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
    );
  }
}

SearchPlant.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  handleCloseSearch: PropTypes.func.isRequired,
  search_plant_date: PropTypes.string,
  search_expected_pick_date: PropTypes.string,
  search_status: PropTypes.string,
  search_block: PropTypes.string,
  search_bed: PropTypes.string,
  search_flower: PropTypes.string
};

export default SearchPlant;
