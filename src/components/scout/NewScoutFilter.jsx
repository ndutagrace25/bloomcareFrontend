import React, { Component } from "react";

class NewScoutFilter extends Component {
  state = {};
  render() {
    return (
      <div className="d-flex flex-column mt-2 col-sm-2 border-right">
        <h5 className="mb-2">FILTER BY</h5>
        <form action="" className="mb-2">
          <input
            type="number"
            className="form-control form-control-sm"
            placeholder="enter bed no"
          />
        </form>
        <div className="overflow-auto">
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
        </div>
      </div>
    );
  }
}

export default NewScoutFilter;
