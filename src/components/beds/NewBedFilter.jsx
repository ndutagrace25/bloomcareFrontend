import React, { Component } from "react";
import PropTypes from "prop-types";

class NewBedFilter extends Component {
  state = {};
  render() {
    // const {
    //   search_bed_name,
    //   search_bed_number,
    //   search_block,
    //   search_sub_block,
    //   search_variety,
    //   search_plant_date,
    //   search_expected_pick_date,
    //   search_status,
    //   blockList,
    //   varietyList
    // } = this.props;

    // const allBlocks = blockList
    //   ? blockList
    //       .filter(block => !block.parent)
    //       .map(blockList => (
    //         <React.Fragment key={blockList._id}>
    //           <div>
    //             <input
    //               type="radio"
    //               // id="test2"
    //               name="radio-group"
    //               value={blockList.parent_block}
    //               onChange={this.props.onChange}
    //             />
    //             <label htmlFor="test2">{blockList.name}</label>
    //           </div>
    //         </React.Fragment>
    //       ))
    //   : null;

    // const allVariety =
    //   varietyList instanceof Array
    //     ? varietyList.map(varietyList => (
    //         <React.Fragment key={varietyList._id}>
    //           <div>
    //             <input
    //               className="styled-checkbox"
    //               // id="styled-checkbox-1"
    //               type="checkbox"
    //               value={varietyList.name}
    //               onChange={this.props.onChange}
    //             />
    //             <label htmlFor="styled-checkbox-1">{varietyList.name}</label>
    //           </div>
    //         </React.Fragment>
    //       ))
    //     : null;
        const {
          search_bed_name,
        } = this.props;
        // const { NewBedList } = this.props;
        // const allNewBedList = NewBedList
        //   ? NewBedList.map(bed => (
        //       <React.Fragment key={bed._id}>
        //         <div>
        //           <input
        //             className="styled-checkbox"
        //             id={bed._id}
        //             type="checkbox"
        //             defaultChecked
        //             value={bed._id}
        //             checked='false'
        //           />
        //         </div>
        //       </React.Fragment>
        //     ))
        //   : null;

    return (
      <React.Fragment>
        <div className="d-flex flex-column mt-2 col-sm-2 border-right">
          <h5 className="mb-2">FILTER BY</h5>
          <form action="" className="mb-2">
            <h6>Bed Number:</h6>
            <input
              type="number"
              className="form-control form-control-sm"
              placeholder="Bed No"
              onChange={this.props.onChange}
              value={search_bed_name}
              name="search_bed_name"
              autoComplete="off"
            />
          </form>

          {/* <div className="overflow-auto"> */}
            {/* SEARCH BLOCK */}
            {/* <h6>Block:</h6> */}
            {/* <div className="mb-2">{allBlocks}</div> */}
            {/* SEARCH SUB-BLOCK */}
            {/* <div className="mb-2"> */}
              {/* <h6>Sub-Block:</h6> */}

              {/* <div>
                <input
                  type="radio"
                  id="test1"
                  name="radio-group"
                  checked
                  onChange={this.props.onChange}
                />
                <label htmlFor="test1">Sub-Block 1</label>
              </div> */}
              {/* <div>
                <input type="radio" id="test2" name="radio-group" />
                <label htmlFor="test2">Sub-Block 2</label>
              </div>
              <div>
                <input type="radio" id="test3" name="radio-group" />
                <label htmlFor="test3">Sub-Block 3</label>
              </div>
            </div> */}
            {/* SEARCH VARIETY */}
            {/* <div className="mb-2">
              <h6>Variety:</h6>
              {allVariety}
            </div>
            <div className="mb-2">
              <h6>Status:</h6>
              <div>
                <input
                  className="styled-checkbox"
                  id="styled-checkbox-4"
                  type="checkbox"
                  value="value4"
                  checked
                  onChange={this.props.onChange}
                />
                <label htmlFor="styled-checkbox-4">Active</label>
              </div> */}
              {/* <div>
                <input
                  className="styled-checkbox"
                  id="styled-checkbox-4"
                  type="checkbox"
                  value="value4"
                  onChange={this.props.onChange}
                  autoComplete="off"
                />
                <label htmlFor="styled-checkbox-4">Inactive</label>
              </div> */}
            {/* </div> */}
          {/* </div> */}
        </div>
      </React.Fragment>
    );
  }
}

NewBedFilter.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  handleCloseSearch: PropTypes.func.isRequired,
  search_bed_name: PropTypes.string,
  search_bed_number: PropTypes.string,
  search_block: PropTypes.string,
  blockList: PropTypes.array.isRequired
  // varietyList: PropTypes.array.isRequired
};

export default NewBedFilter;
