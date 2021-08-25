import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import moment from "moment";

import { InputFields, Button } from "../common";

class EditBed extends Component {
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
            plant_date: moment(plant_date).format('YYYY-MM-DD'),
            expected_pick_date: moment(expected_pick_date).format('YYYY-MM-DD'),
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
            sub_block_name,
            variety,
            plant_date,
            expected_pick_date,
            status
        } = this.state;
        const bed = {
            bed_name,
            bed_number,
            block,
            sub_block_name,
            variety,
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

        const { errors, blockList, varietyList } = this.props;

        // map block
        const allBlocks = (blockList instanceof Array) ? blockList
        .filter(block => !block.parent)
        .map(blockList => (
            <React.Fragment key={blockList._id}>
                <option value={blockList._id}>{blockList.name}</option>
            </React.Fragment>
        )) : null;

        // map sub_block
        const allSubBlock = (blockList instanceof Array) ? blockList
        .filter(blk => blk.parent === block)
        .map(blockList => (
            <React.Fragment key={blockList._id}>
                <option value={blockList._id}>
                    {blockList.name}
                </option>
            </React.Fragment>
        )) : null;
        
        const allVariety = (varietyList instanceof Array) ? varietyList.map(varietyList => (
            <React.Fragment key={varietyList._id}>
                <option value={varietyList._id}>{varietyList.name}</option>
            </React.Fragment>
        )) : null;
        // console.log(_id);
        return (
            <div data-test="EditBedComponent">
                <Button
                    className="btn btn-primary btn-sm"
                    dataTarget={"#editBed" + _id}
                    dataToggle="modal"
                    otherProps={
                        <i
                            className="fa fa-pen"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Edit Bed"
                        />
                    }
                />
                <div
                    className="modal fade"
                    id={"editBed" + _id}
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-notify modal-info" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    Edit Bed{" "}
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
                                        {/* BED NAME */}
                                        <InputFields
                                            otherProps={
                                                <span
                                                    className="input-group-addon"
                                                    style={{ marginRight: "3px" }}
                                                >
                                                    <i className="fas fa-stop" />
                                                </span>
                                            }
                                            type="text"
                                            name="bed_name"
                                            onChange={this.onChange}
                                            label="Bed Name"
                                            placeholder="Bed Name"
                                            value={bed_name}
                                            error={(errors) && errors.bed_name}
                                        />
                                        {/* BED NUMBER */}
                                        <InputFields
                                            otherProps={
                                                <span
                                                    className="input-group-addon"
                                                    style={{ marginRight: "3px" }}
                                                >
                                                    <i className="fas fa-list-ol" />
                                                </span>
                                            }
                                            type="text"
                                            name="bed_number"
                                            value={bed_number}
                                            onChange={this.onChange}
                                            label="Bed Number"
                                            placeholder="Bed Number"
                                            error={(errors) && errors.bed_number}
                                        />
                                        {/* BLOCK NAME */}
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
                                                className={classnames("form-control", {
                                                    "is-invalid": (errors) && errors.parent_block
                                                })}
                                                value={block}
                                                onChange={this.onChange}
                                                style={{ fontSize: "14px" }}
                                            >
                                                <option value="">--Select Block--</option>
                                                {allBlocks}
                                            </select>

                                            {errors && (
                                                <div className="invalid-feedback">
                                                    {(errors) && errors.parent_block}
                                                </div>
                                            )}
                                        </div>
                                        {/* SUB-BLOCK NAME */}
                                        <div className="form-group">
                                            <span
                                                className="input-group-addon"
                                                style={{ marginRight: "3px" }}
                                            >
                                                <i className="fas fa-th-large" />
                                            </span>
                                            <label htmlFor="block">Sub Block Name</label>
                                            <select
                                                name="sub_block_name"
                                                className={classnames("form-control", {
                                                    "is-invalid": (errors) && errors.sub_block_name
                                                })}
                                                value={sub_block_name}
                                                onChange={this.onChange}
                                                style={{ fontSize: "14px" }}
                                            >
                                                <option value="">--Select Sub Block--</option>
                                                {allSubBlock}
                                            </select>

                                            {errors && (
                                                <div className="invalid-feedback">{(errors) && errors.block}</div>
                                            )}
                                        </div>
                                        {/* VARIETY NAME */}
                                        <div className="form-group">
                                            <span
                                                className="input-group-addon"
                                                style={{ marginRight: "3px" }}
                                            >
                                                <i className="fas fa-th-large" />
                                            </span>
                                            <label htmlFor="block">Variety Name</label>
                                            <select
                                                name="variety"
                                                className={classnames("form-control", {
                                                    "is-invalid": (errors) && errors.variety_name
                                                })}
                                                value={variety}
                                                onChange={this.onChange}
                                                style={{ fontSize: "14px" }}
                                            >
                                                <option value="">--Select Variety--</option>
                                                {allVariety}
                                            </select>

                                            {errors && (
                                                <div className="invalid-feedback">{(errors) && errors.variety_name}</div>
                                            )}
                                        </div>
                                        {/* PICK DATE */}
                                        <InputFields
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
                                            placeholder="Plant Date"
                                            value={plant_date}
                                            error={(errors) && errors.plant_date}
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
                                            error={(errors) && errors.expected_pick_date}
                                        />

                                        {/* {/* SELECT BED STATUS} */}
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
                                                className={classnames(
                                                    "form-control selectPlaceholder",
                                                    {
                                                        "is-invalid": (errors) && errors.status
                                                    }
                                                )}
                                                value={status}
                                                onChange={this.onChange}
                                                style={{ fontSize: "14px" }}
                                            >
                                                <option value="" disabled>--Select Plant Status--</option>
                                                <option value="1" style={{ fontStyle: "normal" }}>Active</option>
                                                <option
                                                    value="0"
                                                    style={{ fontStyle: "normal" }}
                                                >Inactive</option>
                                            </select>
                                            {errors && (
                                                <div className="invalid-feedback">{(errors) && errors.status}</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <Button
                                        type="button"
                                        className="btn btn-sm btn-outline-danger waves-effect ml-0"
                                        dataDismiss="modal"
                                        value="Close"
                                    />

                                    <Button
                                        type="button"
                                        onClick={this.submitNewBed}
                                        className="btn btn-sm btn-outline-default waves-effect mr-0"
                                        // dataDismiss="modal"
                                        value="Update Bed"
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

EditBed.propTypes = {
    updateBed: PropTypes.func.isRequired,
    _id: PropTypes.string,
    bed_name: PropTypes.string,
    bed_number: PropTypes.number,
    errors: PropTypes.object,
    blockList: PropTypes.array,
    varietyList: PropTypes.array
};

export default EditBed;
