import React, { Component } from "react";
import PropTypes from "prop-types";

class NewToleranceFilter extends Component {
  state = {};
  render() {
    const {
      search_name,
    } = this.props;
    // const { NewToleranceList } = this.props;
    // const allNewToleranceList = NewToleranceList
    //   ? NewToleranceList.map(tolerance => (
    //       <React.Fragment key={tolerance._id}>
    //         <div>
    //           <input
    //             className="styled-checkbox"
    //             id={tolerance._id}
    //             type="checkbox"
    //             defaultChecked
    //             value={tolerance._id}
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
          <h6>Tolerance Name:</h6>
          <input
            type="score"
            className="form-control form-control-sm"
            placeholder="Tolerance Name"
            onChange={this.props.onChange}
            value={search_name}
            name="search_name"
            autoComplete="off"
          />
        </form>
        {/* <div className="overflow-auto">
          <div className="mb-2">
            <h6>Tolerance Type:</h6>

            <div>
              <input
                type="radio"
                id="test1"
                name="radio-group"
                // checked
                value=""
                onChange={this.props.onChange}
              />
              <label htmlFor="test1">Score 1</label>
            </div>
            <div>
              <input
                type="radio"
                id="test2"
                name="radio-group"
                // onChange={this.props.onChange}
              />
              <label htmlFor="test2">Score 2</label>
            </div>
            <div>
              <input
                type="radio"
                id="test3"
                name="radio-group"
                // onChange={this.props.onChange}
              />
              <label htmlFor="test3">Score 3</label>
            </div>
          </div>
        </div> */}
      </div>
    );
  }
}

NewToleranceFilter.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  handleCloseSearch: PropTypes.func.isRequired,
  search_name: PropTypes.string
};

export default NewToleranceFilter;
