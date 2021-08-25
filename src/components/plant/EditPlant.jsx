import React, { Component } from "react";
import PropTypes from "prop-types";
// import classnames from "classnames";
import moment from "moment";

import { Button } from "../common";

class EditPlant extends Component {
  state = {
    _id: 0,
    plant_date: "",
    expected_pick_date: "",
    status: "",
    block: "",
    bed: "",
    flower: "",
    errors: {},
    focused: false
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentDidMount() {
    const {
      _id,
      plant_date,
      expected_pick_date,
      status,
      block,
      bed,
      flower
    } = this.props;

    this.setState({
      _id,
      plant_date: moment(plant_date).format("YYYY-MM-DD"),
      expected_pick_date: moment(expected_pick_date).format("YYYY-MM-DD"),
      block,
      status,
      bed,
      flower
    });
  }

  submitNewPlant = e => {
    e.preventDefault();
    const {
      _id,
      plant_date,
      expected_pick_date,
      status,
      block,
      bed,
      flower
    } = this.state;
    const plant = {
      plant_date,
      expected_pick_date,
      status,
      block,
      bed,
      flower
    };
    this.props.handlePreloaderStyle("d-block");
    this.props.updatePlant(_id, plant);
  };

  render() {
    const {
      _id,
    //   plant_date,
    //   expected_pick_date,
    //   status,
    //   block,
    //   bed,
    //   flower
    } = this.state;
    // const { errors, blockList, bedList, flowerList } = this.props;

    // Fetch block
    // const allBlocks = blockList
    //   ? blockList.map(blockList => (
    //       <React.Fragment key={blockList._id}>
    //         <option value={blockList._id}>{blockList.block_name}</option>
    //       </React.Fragment>
    //     ))
    //   : null;

    //Fetch bed
    // const allBed = bedList
    //   ? bedList.map(bedList => (
    //       <React.Fragment key={bedList._id}>
    //         <option value={bedList._id}>{bedList.bed_name}</option>
    //       </React.Fragment>
    //     ))
    //   : null;

    //Fetch flowers
    // const allFlower = flowerList
    //   ? flowerList.map(flowerList => (
    //       <React.Fragment key={flowerList._id}>
    //         <option value={flowerList._id}>{flowerList.name}</option>
    //       </React.Fragment>
    //     ))
    //   : null;

    const num = 1;
    const num0 = 0;
    // const num1 = status;
    // const statusValue = num1;
    const active = num;
    const inactive = num0;

    return (
      <div data-test="EditPlantComponent">
        <Button
          type="button"
          className="btn btn-info btn-sm"
          dataTarget={"#editPlant" + _id}
          dataToggle="modal"
          otherProps={
            <i
              className="fa fa-pen"
              data-toggle="tooltip"
              data-placement="top"
              title="Edit Plant"
            />
          }
        />
        <div
          className="modal fade"
          id={"editPlant" + _id}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-notify modal-info" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit Plant{" "}
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
              <form noValidate>
                <div className="modal-body">
                  <div className="container-fluid">
                    {/* PICK DATE */}
                    {/* <InputFields
                      otherProps={
                        <span
                          className="input-group-addon"
                          style={{ marginRight: "3px" }}
                        >
                          <i className="fas fa-stop" />
                        </span>
                      }
                      type="date"
                      name="plant_date"
                      onChange={this.onChange}
                      label="Plant Date"
                      placeholder="Plant Date" */}
                    {/* //   value={plant_date}
                    //   error={errors.plant_date}
                    /> */}

                    {/* EXPECTED PICK DATE */}
                    {/* <InputFields
                      otherProps={
                        <span
                          className="input-group-addon"
                          style={{ marginRight: "3px" }}
                        >
                          <i className="fas fa-list-ol" />
                        </span>
                      }
                      type="date"
                      name="expected_pick_date"
                      value={expected_pick_date}
                      onChange={this.onChange}
                      label="Expected Pick Date"
                      placeholder="Expected Pick Date"
                      error={errors.expected_pick_date}
                    /> */}

                    {/* SELECT PLANT STATUS */}
                    <div className="form-group">
                      <span
                        className="input-group-addon"
                        style={{ marginRight: "3px" }}
                      >
                        <i className="fab fa-accessible-icon" />
                      </span>
                      <label htmlFor="status">Plant Status</label>
                      <select
                        name="status"
                        // className={classnames(
                        //   "form-control selectPlaceholder",
                        //   {
                        //     "is-invalid": errors.status
                        //   }
                        // )}
                        // value={statusValue}
                        onChange={this.onChange}
                        style={{ fontSize: "14px" }}
                      >
                        <option value="" disabled>
                          --Select Plant Status--
                        </option>
                        <option value={active} style={{ fontStyle: "normal" }}>
                          Active
                        </option>
                        <option
                          value={inactive}
                          style={{ fontStyle: "normal" }}
                        >
                          Inactive
                        </option>
                      </select>
                      {/* {errors && (
                        <div className="invalid-feedback">{errors.status}</div>
                      )} */}
                    </div>

                    {/* SELECT BLOCK NAME */}
                    <div className="form-group">
                      <span
                        className="input-group-addon"
                        style={{ marginRight: "3px" }}
                      >
                        <i className="fas fa-th-large" />
                      </span>
                      <label htmlFor="block">Block Name</label>
                      {/* <select
                        name="block"
                        className={classnames("form-control", {
                          "is-invalid": errors.block
                        })}
                        value={block}
                        onChange={this.onChange}
                        style={{ fontSize: "14px" }}
                      >
                        <option value="">--Select Block--</option>
                        {allBlocks}
                      </select> */}

                      {/* {errors && (
                        <div className="invalid-feedback">{errors.block}</div>
                      )} */}
                    </div>

                    {/* SELECT BED NAME */}
                    <div className="form-group">
                      <span
                        className="input-group-addon"
                        style={{ marginRight: "3px" }}
                      >
                        <i className="fas fa-th-large" />
                      </span>
                      <label htmlFor="bed">Bed Name</label>
                      {/* <select
                        name="bed"
                        className={classnames("form-control", {
                          "is-invalid": errors.bed
                        })}
                        value={bed}
                        onChange={this.onChange}
                        style={{ fontSize: "14px" }}
                      >
                        <option value="">--Select Bed--</option>
                        {allBed}
                      </select> */}

                      {/* {errors && (
                        <div className="invalid-feedback">{errors.bed}</div>
                      )} */}
                    </div>

                    {/* SELECT FLOWER NAME */}
                    <div className="form-group">
                      <span
                        className="input-group-addon"
                        style={{ marginRight: "3px" }}
                      >
                        <i className="fas fa-th-large" />
                      </span>
                      <label htmlFor="flower">Flower Name</label>
                      {/* <select
                        name="flower"
                        className={classnames("form-control", {
                          "is-invalid": errors.flower
                        })}
                        value={flower}
                        onChange={this.onChange}
                        style={{ fontSize: "14px" }}
                      >
                        <option value="">--Select Flower--</option>
                        {allFlower}
                      </select> */}

                      {/* {errors && (
                        <div className="invalid-feedback">{errors.flower}</div>
                      )} */}
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <Button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    dataDismiss="modal"
                    value="Close"
                  />

                  <Button
                    type="button"
                    onClick={this.submitNewPlant}
                    className="btn btn-success btn-sm"
                    value="Update Plant"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditPlant.propTypes = {
  updatePlant: PropTypes.func.isRequired,
  _id: PropTypes.string,
  plant_date: PropTypes.string,
  expected_pick_date: PropTypes.string,
  status: PropTypes.number
};

export default EditPlant;
