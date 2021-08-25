import React, { Component } from "react";
import PropTypes from "prop-types";

class NewEntryFilter extends Component {
  state = {};
  render() {
    const { search_name } = this.props;
    // const { EntryList } = this.props;
    // const allEntryList = EntryList
    //   ? EntryList.map(entry => (
    //       <React.Fragment key={entry._id}>
    //         <div>
    //           <input
    //             className="styled-checkbox"
    //             id={entry._id}
    //             type="checkbox"
    //             defaultChecked
    //             value={entry._id}
    //             checked='false'
    //           />
    //         </div>
    //       </React.Fragment>
    //     ))
    //   : null;
    return (
      <div className="d-flex flex-column mt-2 col-sm-2 border-right">
        <h5 className="mb-2">FILTER BY</h5>
        <form action="" className="mb-2">
          <h6>Station Number:</h6>
          <input
            type="number"
            className="form-control form-control-sm"
            placeholder="Station Number"
            onChange={this.props.handleSearch}
            value={search_name}
            name="search_name"
            autoComplete="off"
          />
        </form>

        {/*  */}
      </div>
    );
  }
}

NewEntryFilter.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  handleCloseSearch: PropTypes.func.isRequired,
  search_name: PropTypes.string
};

export default NewEntryFilter;
