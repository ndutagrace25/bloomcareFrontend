import React, { Component } from "react";
import PropTypes from "prop-types";
// import classnames from "classnames";

import { InputFields, Button } from "../common";

class CreatePlant extends Component {
  state = {
    plant_date: "",
    expected_pick_date: "",
    status: "",
    block: "",
    bed: "",
    flower: ""
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onChangeDate = date => {
    this.setState({ date });
  };

  submitNewPlant = e => {
    e.preventDefault();
    const {
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
    this.props.handleCreatePlant(plant);
  };

  componentWillReceiveProps = () => {
    const {
      plant_date,
      expected_pick_date,
      status,
      block,
      bed,
      flower
    } = this.props;
    this.setState({
      plant_date,
      expected_pick_date,
      status,
      block,
      bed,
      flower
    });
  };

  render() {
    const {
      plant_date,
      expected_pick_date,
      status,
      block,
      bed,
    //   flower
    } = this.state;
    const { errors, blockList, bedList, flowerList } = this.props;

    //Fetching Blocks
    const allBlocks = blockList
      ? blockList.map(blockList => (
          <React.Fragment key={blockList._id}>
            <option value={blockList._id} style={{ fontStyle: "normal" }}>
              {blockList.block_name}
            </option>
          </React.Fragment>
        ))
      : null;

    //Fetching Beds
    const allBed = bedList
      ? bedList.map(bedList => (
          <React.Fragment key={bedList._id}>
            <option value={bedList._id} style={{ fontStyle: "normal" }}>
              {bedList.bed_name}
            </option>
          </React.Fragment>
        ))
      : null;

    //Fetching Flowers
    const allFlower = (flowerList) ? flowerList.map(flowerList => (
      <React.Fragment key={flowerList._id}>
        <option value={flowerList._id} style={{ fontStyle: "normal" }}>
          {flowerList.name}
        </option>
      </React.Fragment>
    )): null;

    return (
      <div data-test="CreatePlantComponent">
        <Button
          type="button"
          className="btn btn-primary btn-sm"
          dataTarget="#addNewPlant"
          dataToggle="modal"
          value="Add Plant"
        />
        <div
          className="modal fade"
          id="addNewPlant"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-notify modal-info" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add Plant{" "}
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
                    {/* PLANT DATE */}
                    <InputFields
                      otherProps={
                        <span
                          className="input-group-addon"
                          style={{ marginRight: "3px" }}
                        >
                          <i className="fas fa-stop" />
                        </span>
                      }
                      className="datepicker"
                      type="date"
                      name="plant_date"
                      onChange={this.onChange}
                      label="Plant Date"
                      placeholder="Plant Date"
                      value={plant_date}
                    //   error={errors.plant_date}
                    />

                    {/* EXPECTED PICK DATE */}
                    <InputFields
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
                    //   error={errors.expected_pick_date}
                    />

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
                        value={status}
                        onChange={this.onChange}
                        style={{ fontSize: "14px" }}
                      >
                        <option value="" disabled>
                          --Select Plant Status--
                        </option>
                        <option value="1" style={{ fontStyle: "normal" }}>
                          Active
                        </option>
                        <option value="0" style={{ fontStyle: "normal" }}>
                          Inactive
                        </option>
                      </select>
                      {errors && (
                        // <div className="invalid-feedback">{errors.status}</div> 
                        ""
                      )}
                    </div>

                    {/* BLOCK SELECT OPTION */}
                    <div className="form-group">
                      <span
                        className="input-group-addon"
                        style={{ marginRight: "3px" }}
                      >
                        <i className="fas fa-th-large" />
                      </span>
                      <label htmlFor="block">Block Name</label>
                      <select
                        name="block"
                        // className={classnames(
                        //   "form-control selectPlaceholder",
                        //   {
                        //     "is-invalid": errors.block
                        //   }
                        // )}
                        value={block}
                        onChange={this.onChange}
                        style={{ fontSize: "14px" }}
                      >
                        <option value="">--Select Block--</option>
                        {allBlocks}
                      </select>

                      {/* {errors && (
                        <div className="invalid-feedback">{errors.block}</div>
                      )} */}
                    </div>

                    {/* BED SELECT OPTION */}
                    <div className="form-group">
                      <span
                        className="input-group-addon"
                        style={{ marginRight: "3px" }}
                      >
                        <i className="fas fa-th-large" />
                      </span>
                      <label htmlFor="bed">Bed Name</label>
                      <select
                        name="bed"
                        // className={classnames(
                        //   "form-control selectPlaceholder",
                        //   {
                        //     "is-invalid": errors.bed
                        //   }
                        // )}
                        value={bed}
                        onChange={this.onChange}
                        style={{ fontSize: "14px" }}
                      >
                        <option value="">--Select Bed--</option>
                        {allBed}
                      </select>

                      {/* {errors && (
                        <div className="invalid-feedback">{errors.bed}</div>
                      )} */}
                    </div>

                    {/* FLOWER SELECT OPTION */}
                    <div className="form-group">
                      <span
                        className="input-group-addon"
                        style={{ marginRight: "3px" }}
                      >
                        <i className="fas fa-th-large" />
                      </span>
                      <label htmlFor="flower">Flower Name</label>
                      <select
                        name="flower"
                        // className={classnames(
                        //   "form-control selectPlaceholder",
                        //   {
                        //     "is-invalid": errors.flower
                        //   }
                        // )}
                        // value={flower}
                        onChange={this.onChange}
                        style={{ fontSize: "14px" }}
                      >
                        <option value="">--Select Flower--</option>
                        {allFlower}
                      </select>

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
                    value="Add Plant"
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

CreatePlant.propTypes = {
  handleCreatePlant: PropTypes.func.isRequired,
  blockList: PropTypes.array,
  bedList: PropTypes.array,
  flowerList: PropTypes.array
};

export default CreatePlant;
