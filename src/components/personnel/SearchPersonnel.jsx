import React, { Component } from "react";
import PropTypes from "prop-types";

import { InputFields, Button, SearchContainer } from "../common";

class SearchPersonnel extends Component {
  render() {
    const {
      search_first_name,
      search_last_name,
      search_phone,
      search_status,
      search_personnel_type
    } = this.props;
    const { personnelType } = this.props;
    const allPersonnelType = (personnelType) ? personnelType.map(person => (
      <React.Fragment key={person._id}>
        <option value={person._id} style={{ fontStyle: "normal" }}>
          {person.name}
        </option>
      </React.Fragment>
    )): null;

    return (
      <React.Fragment>
        <SearchContainer
          data-test="SearchPersonnelComponent"
          searchForm={
            <form
              noValidate
              onSubmit={e => this.props.handleSearch(e)}
              autoComplete="off"
            >
              <InputFields
                type="text"
                name="search_first_name"
                onChange={this.props.onChange}
                value={search_first_name}
                label="First Name"
              />
              <InputFields
                type="text"
                name="search_last_name"
                onChange={this.props.onChange}
                value={search_last_name}
                label="Last Name"
              />
              <InputFields
                type="number"
                name="search_phone"
                onChange={this.props.onChangeNumber}
                value={search_phone}
                label="Phone Number"
              />
              <div className="form-group">
                <label htmlFor="search_status">Personnel Status</label>
                <select
                  name="search_status"
                  className="form-control selectPlaceholder"
                  value={search_status}
                  onChange={this.props.onChange}
                  style={{ fontSize: "14px" }}
                >
                  <option value="" disabled>
                    --Select Personnel Status--
                  </option>
                  <option value="1" style={{ fontStyle: "normal" }}>
                    Active
                  </option>
                  <option value="0" style={{ fontStyle: "normal" }}>
                    Inactive
                  </option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="search_personnel_type">Personnel Type</label>
                <select
                  name="search_personnel_type"
                  className="form-control selectPlaceholder"
                  value={search_personnel_type}
                  onChange={this.props.onChange}
                  style={{ fontSize: "14px" }}
                >
                  <option value="" disabled>
                    --Select Personnel Type--
                  </option>
                  {allPersonnelType}
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
      </React.Fragment>
    );
  }
}

SearchPersonnel.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  handleCloseSearch: PropTypes.func.isRequired,
  search_first_name: PropTypes.string,
  search_last_name: PropTypes.string,
  search_phone: PropTypes.string,
  search_status: PropTypes.string,
  search_personnel_type: PropTypes.string,
  personnelType: PropTypes.array
};

export default SearchPersonnel;
