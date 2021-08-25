import React, { Component } from 'react';

class NewCreateScout extends Component {
    state = {};
    render() {
      return (
        <div
          className="modal fade"
          id="createscout "
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <form className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add Block(s)
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="d-flex justify-content-between align-items-end mb-4">
                  <label className="col-sm-2 pl-n15">Name:</label>
                  <div className="d-flex justify-content-between col-sm-10 px-n15">
                    <input
                      className="form-control col-sm-5"
                      type="text"
                      placeholder="Block Name"
                      // name="plant_date"
                      // onChange={this.onChange}
                      // value={plant_date}
                    />
                  </div>
                  {/* {errors && (
                    <small className="form-text text-danger">
                      {errors.plant_date}
                    </small>
                  )} */}
                </div>
                <div className="d-flex justify-content-between align-items-end mb-4">
                  <label className="col-sm-2 pl-n15">Number:</label>
                  <div className="d-flex justify-content-between col-sm-10 px-n15">
                    <input
                      className="form-control col-sm-5"
                      type="number"
                      placeholder="Block Number"
                      // name="plant_date"
                      // onChange={this.onChange}
                      // value={plant_date}
                    />
                  </div>
                  {/* {errors && (
                    <small className="form-text text-danger">
                      {errors.plant_date}
                    </small>
                  )} */}
                </div>
              </div>
  
              <div className="modal-footer d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-danger rounded-0"
                  data-dismiss="modal"
                >
                  CLOSE
                </button>
                <button type="submit" className="btn btn-primary rounded-0">
                  ADD BLOCK
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    }
  }
export default NewCreateScout;