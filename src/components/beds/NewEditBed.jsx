import React, { Component } from "react";
import moment from "moment";
import PropTypes from "prop-types";

class NewEditBed extends Component {
  state = {
    _id: 0,
    bed_name: "",
    bed_number: "",
    block: "",
    sub_block_name: "",
    variety: "",
    plant_date: "",
    expected_pick_date: "",
    status: "",
    errors: {}
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentDidMount() {
    const {
      _id,
      bed_name,
      bed_number,
      block,
      sub_block_name,
      variety,
      plant_date,
      expected_pick_date,
      status
    } = this.props;
    this.setState({
      _id,
      bed_name,
      bed_number,
      block,
      sub_block_name,
      variety,
      plant_date: moment(plant_date).format("YYYY-MM-DD"),
      expected_pick_date: moment(expected_pick_date).format("YYYY-MM-DD"),
      status
    });
  }

  submitNewBed = e => {
    e.preventDefault();
    const {
      _id,
      bed_name,
      bed_number,
      block,
      // sub_block_name,
      variety,
      plant_date,
      expected_pick_date,
      status
    } = this.state;
    const bed = {
      bed_name,
      bed_number,
      block_id: block,
      // sub_block_name,
      variety_id: variety,
      plant_date,
      expected_pick_date,
      status
    };
    this.props.handlePreloaderStyle("d-block");
    this.props.updateBed(_id, bed);
  };

  render() {
    const {
      _id,
      bed_name,
      bed_number,
      block,
      sub_block_name,
      variety,
      plant_date,
      expected_pick_date,
      status
    } = this.state;

    const { blockList, varietyList } = this.props;
    // const {errors} = this.props;

    // map block
    const allBlocks =
      blockList instanceof Array
        ? blockList
            .filter(block => !block.parent)
            .map((blockList, index) => (
              <React.Fragment key={index}>
                <option value={blockList.id}>{blockList.block_name}</option>
              </React.Fragment>
            ))
        : null;

    let blockId = parseInt(block);

    // map sub_block
    const allSubBlock =
      blockList instanceof Array
        ? blockList
            .filter(blk => blk.block_parent === 1)
            .map((blockList, index) => (
              <React.Fragment key={index}>
                <option value={blockList.id}>{blockList.block_name}</option>
              </React.Fragment>
            ))
        : null;

    const allVariety =
      varietyList instanceof Array
        ? varietyList.map((varietyList, index) => (
            <React.Fragment key={index}>
              <option value={varietyList.id}>{varietyList.name}</option>
            </React.Fragment>
          ))
        : null;

    return (
      <React.Fragment>
        <div
          className="modal fade"
          id={"editbedselected" + _id}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <form className="modal-content rounded-0">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit Bed(s)
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={this.props.clearModalErrorAfterClose}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {/* BED NUMBER */}
                <div className="d-flex justify-content-between align-items-end mb-4">
                  <label className="col-sm-2 pl-n15">Bed No:</label>
                  <div className="d-flex justify-content-between col-sm-10 px-n15">
                    <input
                      className="form-control col-sm-5"
                      type="number"
                      placeholder="Bed No"
                      name="bed_number"
                      onChange={this.onChange}
                      value={bed_number}
                      autoComplete="off"
                    />
                  </div>
                </div>

                {/* BED NAME */}
                <div className="d-flex justify-content-between align-items-end mb-4">
                  <label className="col-sm-2 pl-n15">Bed Name:</label>
                  <div className="d-flex justify-content-between col-sm-10 px-n15">
                    <input
                      className="form-control col-sm-5"
                      type="text"
                      placeholder="Bed Name"
                      name="bed_name"
                      onChange={this.onChange}
                      value={bed_name}
                      autoComplete="off"
                    />
                  </div>
                </div>
                {/* PLANT DATE */}
                <div className="d-flex justify-content-between align-items-end mb-4">
                  <label className="col-sm-2 pl-n15">Plant Date:</label>
                  <div className="d-flex justify-content-between col-sm-10 px-n15">
                    <input
                      className="form-control col-sm-5"
                      type="date"
                      placeholder="Plant Date"
                      name="plant_date"
                      onChange={this.onChange}
                      value={plant_date}
                      autoComplete="off"
                    />
                  </div>
                </div>
                {/* EXPECTED PICK DATE */}
                <div className="d-flex justify-content-between align-items-end mb-4">
                  <label className="col-sm-2 pl-n15">Pick Date:</label>
                  <div className="d-flex justify-content-between col-sm-10 px-n15">
                    <input
                      className="form-control col-sm-5"
                      type="date"
                      placeholder="Pick Date"
                      name="expected_pick_date"
                      onChange={this.onChange}
                      value={expected_pick_date}
                      autoComplete="off"
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-end">
                  <label className="col-sm-2 pl-n15">Select:</label>
                  <div className="d-flex justify-content-between col-sm-10 px-n15">
                    {/* SELECT BLOCK */}
                    <select
                      className="form-control col-sm-3"
                      name="block"
                      value={block}
                      onChange={this.onChange}
                    >
                      <option>--Block--</option>
                      {allBlocks}
                    </select>
                    {/* SELECT SUB BLOCK */}
                    <select
                      className="form-control col-sm-3"
                      name="sub_block_name"
                      value={sub_block_name}
                      onChange={this.onChange}
                    >
                      <option>--Sub Block--</option>
                      {allSubBlock}
                    </select>
                    {/* SELECT VARIETY */}
                    <select
                      className="form-control col-sm-3"
                      value={variety}
                      onChange={this.onChange}
                      name="variety"
                    >
                      <option>--Variety--</option>
                      {allVariety}
                    </select>
                    {/* SELECT PLANT STATUS */}
                    <select
                      className="form-control col-sm-3"
                      name="status"
                      value={status}
                      onChange={this.onChange}
                    >
                      <option>--Status--</option>
                      <option value="1">Active</option>
                      <option value="0">Inactive</option>
                    </select>
                  </div>
                  {/* {errors && <small className="form-text text-danger">{errors.block}</small>} */}
                </div>
              </div>

              <div className="modal-footer d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-outline-danger rounded-0"
                  data-dismiss="modal"
                  onClick={this.props.clearModalErrorAfterClose}
                >
                  CLOSE
                </button>
                <button
                  type="button"
                  className="btn btn-primary rounded-0"
                  onClick={this.submitNewBed}
                >
                  UPDATE
                </button>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

NewEditBed.propTypes = {
  updateBed: PropTypes.func.isRequired,
  _id: PropTypes.string,
  bed_name: PropTypes.string,
  bed_number: PropTypes.number,
  // errors: PropTypes.object,
  blockList: PropTypes.array
  // varietyList: PropTypes.array
};

export default NewEditBed;
