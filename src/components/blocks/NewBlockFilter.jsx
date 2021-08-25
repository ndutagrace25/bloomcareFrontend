import React, { Component } from "react";
import PropTypes from "prop-types";


class NewBlockFilter extends Component {
  state = {};
  render() {
    const {
      search_name,
    } = this.props;
    // const { NewBlockList } = this.props;
    // const allNewBlockList = NewBlockList
    //   ? NewBlockList.map(block => (
    //       <React.Fragment key={block._id}>
    //         <div>
    //           <input
    //             className="styled-checkbox"
    //             id={block._id}
    //             type="checkbox"
    //             defaultChecked
    //             value={block._id}
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
        <h6>Block Number:</h6>
          <input
            type="number"
            className="form-control form-control-sm"
            placeholder="Block Number"
            onChange={this.props.onChange}
            value={search_name}
            name="search_name"
            autoComplete="off"
          />
        </form>
        {/* <div className="overflow-auto">
          <div className="mb-2">
            <h6>Block Name:</h6>

            <div>
              <input
                type="radio"
                id="test1"
                name="radio-group"
                // checked
                onChange={this.onChange}
              />
              <label htmlFor="test1">Block 1</label>
            </div>
            <div>
              <input type="radio" id="test2" name="radio-group" />
              <label htmlFor="test2">Block 2</label>
            </div>
            <div>
              <input type="radio" id="test3" name="radio-group" />
              <label htmlFor="test3">Block 3</label>
            </div>
          </div>
        </div> */}
      </div>
    );
  }
}

NewBlockFilter.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  handleCloseSearch: PropTypes.func.isRequired,
  search_name: PropTypes.string
};

export default NewBlockFilter;
