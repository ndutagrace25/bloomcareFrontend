import React, { Component } from "react";
import PropTypes from "prop-types";


class NewPointFilter extends Component {
  state = {};
  render() {
    const {
      search_name,
    } = this.props;
    // const { NewPointList } = this.props;
    // const allNewPointList = NewPointList
    //   ? NewPointList.map(point => (
    //       <React.Fragment key={point._id}>
    //         <div>
    //           <input
    //             className="styled-checkbox"
    //             id={point._id}
    //             type="checkbox"
    //             defaultChecked
    //             value={point._id}
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
          <h6>Point Name:</h6>
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Point Name"
            onChange={this.props.onChange}
            value={search_name}
            name="search_name"
            autoComplete="off"
          />
        </form>
      </div>
    );
  }
}

NewPointFilter.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  handleCloseSearch: PropTypes.func.isRequired,
  search_name: PropTypes.string
};
export default NewPointFilter;
