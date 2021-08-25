import React, { Component } from "react";
import PropTypes from "prop-types";

// import { InputFields, NewButton, SearchContainer } from "../common";

class NewPersonnelFilter extends Component {

  handleCheckBox = (value) => {

  }
  render() {
    const {
      search_first_name,
      search_last_name,
      search_phone,
      // search_status,
      // search_personnel_type
    } = this.props;
    // const { personnelType } = this.props;
    // const allPersonnelType = personnelType
    //   ? personnelType.map(person => (
    //       <React.Fragment key={person._id}>
    //         <div>
    //           <input
    //             className="styled-checkbox"
    //             id={person._id}
    //             type="checkbox"
    //             checked={false}
    //             value={person._id}
    //             onChange={this.handleCheckBox.bind(this)}

    //           />
    //           <label htmlFor="styled-checkbox-1">{person.name}</label>
    //         </div>
    //       </React.Fragment>
    //     ))
    //   : null;
    return (
      <div className="d-flex flex-column mt-2 col-sm-2 border-right">
        <h5 className="mb-2">FILTER BY</h5>
        <form action="" className="mb-2">
          <h6>First Name:</h6>
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Personnel Name"
            onChange={this.props.handleSearch}
            value={search_first_name}
            name="search_first_name"
            autoComplete="off"
          />
        </form>
        <div className="overflow-auto">
          {/* LAST NAME */}
          <div className="mb-2">
            <h6>Last Name:</h6>
            <div>
              <input
                type="text"
                className="form-control form-control-sm"
                // id="test1"
                name="search_last_name"
                onChange={this.props.handleSearch}
                value={search_last_name}
                placeholder="Last Name"
                autoComplete="off"
              />
            </div>
          </div>
          {/* PHONE NUMBER */}
          <div className="mb-2">
            <h6>Phone Number:</h6>
            <div>
              <input
                type="number"
                className="form-control form-control-sm"
                // id="test1"
                name="search_phone"
                value={search_phone}
                onChange={this.props.handleSearch}
                placeholder="Phone Number"
                autoComplete="off"
              />
            </div>
          </div>
          {/* PERSONNEL STATUS */}
          {/* <div className="mb-2">
            <h6>Personnel Status:</h6>
            <div>
              <input
                type="checkbox"
                id="inactive"
                name="search_status"
                value="1"
                onChange={this.props.onChange}
                className="styled-checkbox"
                onClick={this.handleCheckBox}
              />
              <label htmlFor="styled-checkbox-1">Active</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="active"
                name="search_status"
                value="0"
                onChange={this.props.onChange}
                className="styled-checkbox"
                autoComplete="off"
              />
              <label htmlFor="styled-checkbox-1">Inactive</label>
            </div>
          </div> */}
          {/* <div className="mb-2">
            <h6>Personnel Type:</h6>
            {allPersonnelType}
          </div> */}
        </div>
      </div>
    );
  }
}

NewPersonnelFilter.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  handleCloseSearch: PropTypes.func.isRequired,
  search_first_name: PropTypes.string,
  search_last_name: PropTypes.string,
  search_phone: PropTypes.string,
  search_status: PropTypes.string,
  search_personnel_type: PropTypes.string,
  personnelType: PropTypes.array
};

export default NewPersonnelFilter;
