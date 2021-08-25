import React, { Component } from "react";

class NewCreateBed extends Component {
  state = {
    from: "",
    to: "",
    block: 0,
    sub_block_name: "",
    variety: "",
    plant_date: "",
    expected_pick_date: "",
    status: ""
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onChangeNumber = e => {
    this.setState({
      [e.target.name]: parseInt(e.target.value)
    });
  };

  submitNewBed = e => {
    e.preventDefault();
    const {
      from,
      to,
      //   block,
      sub_block_name,
      variety,
      plant_date,
      expected_pick_date,
      status
    } = this.state;
    let block = sub_block_name;
    const bed = {
      from,
      to,
      variety_id: variety,
      block_id: block,
      plant_date,
      status,
      expected_pick_date
    };
    this.props.handlePreloaderStyle("d-block");
    this.props.handleCreateBed(bed);
  };

  componentWillReceiveProps = () => {
    const {
      from,
      to,
      block,
      sub_block_name,
      variety,
      plant_date,
      expected_pick_date,
      status
    } = this.props;
    this.setState({
      from,
      to,
      block,
      sub_block_name,
      variety,
      plant_date,
      expected_pick_date,
      status
    });
  };

  renderParentBlocks = () => {
    const { allBlocks } = this.props;

    const parentBlocks =
      allBlocks instanceof Array
        ? allBlocks
            .filter(block => !block.block_parent)
            .map(allBlocks => (
              <React.Fragment key={allBlocks.id}>
                <option value={allBlocks.id} style={{ fontStyle: "normal" }}>
                  {allBlocks.block_name}
                </option>
              </React.Fragment>
            ))
        : null;

    return parentBlocks;
  };

  renderChildBlocks = block => {
    const { allBlocks } = this.props;
    // const { block } = this.state;
    let blockId = parseInt(block);

    const childBlocks =
      allBlocks instanceof Array
        ? allBlocks
            .filter(block => block.block_parent === blockId)
            .map(allBlocks => (
              <React.Fragment key={allBlocks.id}>
                <option value={allBlocks.id} style={{ fontStyle: "normal" }}>
                  {allBlocks.block_name}
                </option>
              </React.Fragment>
            ))
        : null;

    return childBlocks;
  };

  render() {
    const {
      from,
      to,
      block,
      sub_block_name,
      variety,
      plant_date,
      expected_pick_date,
      status
    } = this.state;
    const { errors, varietyList } = this.props;
    // const { allBlocks } = this.props;

    const allVariety =
      varietyList instanceof Array
        ? varietyList.map(varietyList => (
            <React.Fragment key={varietyList.id}>
              <option value={varietyList.id}>{varietyList.name}</option>
            </React.Fragment>
          ))
        : null;
    return (
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <form className="modal-content rounded-0">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add Bed(s)
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
              <div className="d-flex flex-nowrap align-items-baseline">
                <label className="text-nowrap col-sm-3 pl-n15">Bed no:</label>
                <div className="d-flex flex-nowrap justify-content-between col-sm-6 px-n15">
                  {/* FROM */}
                  <div className="form-group col-sm-6 pl-n15">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="From"
                      name="from"
                      onChange={this.onChangeNumber}
                      value={from}
                      required
                      autoComplete="off"
                    />
                    {errors && (
                      <small className="form-text text-danger">
                        {errors.from}
                      </small>
                    )}
                  </div>

                  {/* TO */}
                  <div className="form-group col-sm-6 px-n15">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="To"
                      name="to"
                      value={to}
                      onChange={this.onChangeNumber}
                      required
                      autoComplete="off"
                    />
                    {errors && (
                      <small className="form-text text-danger">
                        {errors.to}
                      </small>
                    )}
                  </div>
                </div>
              </div>
              {/* SELECT ODD OR EVEN */}
              <div className="d-flex flex-nowrap justify-content-between align-items-end mb-4 offset-3 col-sm-6 pl-n15">
                <div>
                  <input
                    type="radio"
                    id="all"
                    name="radio-group"
                    checked
                    onChange={this.onChange}
                    autoComplete="off"
                  />
                  <label htmlFor="all">All</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="even"
                    name="radio-group"
                    onChange={this.onChange}
                    autoComplete="off"
                  />
                  <label htmlFor="even">Even</label>
                </div>
                <div>
                  <input type="radio" id="odd" name="radio-group" />
                  <label htmlFor="odd">Odd</label>
                </div>
              </div>
              {/* PLANT DATE */}
              <div className="d-flex flex-nowrap align-items-baseline">
                <label className="text-nowrap col-sm-3 pl-n15">
                  Plant Date:
                </label>
                <div className="form-group col-sm-5 pl-n15">
                  <input
                    className="form-control"
                    type="date"
                    placeholder="Plant Date"
                    name="plant_date"
                    onChange={this.onChange}
                    value={plant_date}
                  />
                  {errors && (
                    <small className="form-text text-danger">
                      {errors.plant_date}
                    </small>
                  )}
                </div>
              </div>
              {/* EXPECTED PICK DATE */}
              <div className="d-flex flex-nowrap align-items-baseline">
                <label className="text-nowrap col-sm-3 pl-n15">
                  Pick Date:
                </label>
                <div className="form-group col-sm-5 pl-n15">
                  <input
                    className="form-control"
                    type="date"
                    placeholder="Pick Date"
                    name="expected_pick_date"
                    value={expected_pick_date}
                    onChange={this.onChange}
                  />
                  {errors && (
                    <small className="form-text text-danger">
                      {errors.expected_pick_date}
                    </small>
                  )}
                </div>
              </div>
              <div className="d-flex flex-nowrap align-items-baseline">
                <label className="text-nowrap col-sm-3 pl-n15">Select:</label>
                <div className="d-flex flex-nowrap justify-content-between col-sm-9 px-n15">
                  <div className="form-group col-sm-6 pl-n15">
                    {/* SELECT BLOCK */}
                    <select
                      className="form-control"
                      name="block"
                      value={block}
                      onChange={this.onChange}
                    >
                      <option>--Block--</option>
                      {this.renderParentBlocks()}
                    </select>
                  </div>
                  <div className="form-group col-sm-6 px-n15">
                    {/* SELECT SUB BLOCK */}
                    <select
                      className="form-control"
                      name="sub_block_name"
                      value={sub_block_name}
                      onChange={this.onChange}
                    >
                      <option>--Sub Block--</option>
                      {this.renderChildBlocks(block)}
                    </select>
                  </div>
                </div>
                {/* {errors && <small className="form-text text-danger">{errors.block}</small>} */}
              </div>
              <div className="d-flex flex-nowrap align-items-baseline">
                <label className="text-nowrap col-sm-3 pl-n15">Select:</label>
                <div className="d-flex flex-nowrap justify-content-between col-sm-9 px-n15">
                  {/* SELECT VARIETY */}
                  <div className="form-group col-sm-6 pl-n15">
                    <select
                      className="form-control"
                      value={variety}
                      onChange={this.onChange}
                      name="variety"
                    >
                      <option>--Variety--</option>
                      {allVariety}
                    </select>
                  </div>
                  {/* SELECT PLANT STATUS */}
                  <div className="form-group col-sm-6 px-n15">
                    <select
                      className="form-control"
                      name="status"
                      value={status}
                      onChange={this.onChange}
                    >
                      <option>--Status--</option>
                      <option value="1">Active</option>
                      <option value="0">Inactive</option>
                    </select>
                  </div>
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
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default NewCreateBed;
