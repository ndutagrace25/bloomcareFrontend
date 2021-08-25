import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import { InputFields, Button } from "../common";

class CreateBed extends Component {
    state = {
        from: "",
        to: "",
        block: "",
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
            block,
            variety,
            plant_date,
            expected_pick_date,
            status
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
            status,
            
        });
    };

    renderParentBlocks = () => {
        const { allBlocks } = this.props;

        const parentBlocks = (allBlocks instanceof Array) ? allBlocks
            .filter(block => !block.parent)
            .map(allBlocks => (
                <React.Fragment key={allBlocks._id}>
                    <option value={allBlocks._id} style={{ fontStyle: "normal" }}>
                        {allBlocks.name}
                    </option>
                </React.Fragment>
            )) : null;

        return parentBlocks;
    };

    renderChildBlocks = () => {
        const { allBlocks } = this.props;
        const { block } = this.state;

        const childBlocks = (allBlocks instanceof Array) ? allBlocks
            .filter(blk => blk.parent === block)
            .map(allBlocks => (
                <React.Fragment key={allBlocks._id}>
                    <option value={allBlocks._id} style={{ fontStyle: "normal" }}>
                        {allBlocks.name}
                    </option>
                </React.Fragment>
            )) : null;

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
        
        const allVariety = (varietyList instanceof Array) ? varietyList.map(varietyList => (
            <React.Fragment key={varietyList._id}>
                <option value={varietyList._id}>{varietyList.name}</option>
            </React.Fragment>
        )) : null;
        return (
            <div data-test="CreateBedComponent">
                <Button
                    type="button"
                    className="btn btn-sm btn-outline-default waves-effect ml-0"
                    dataTarget="#addNewBed"
                    dataToggle="modal"
                    value="Bed"
                    otherProps={<i className="fas fa-plus mr-1" />}
                />
                <div
                    className="modal fade"
                    id="addNewBed"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-notify modal-info" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    Add Bed
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
                                            type="number"
                                            name="from"
                                            onChange={this.onChangeNumber}
                                            label="From"
                                            placeholder="From"
                                            value={from}
                                            error={errors && errors.from}
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
                                            type="number"
                                            name="to"
                                            value={to}
                                            onChange={this.onChangeNumber}
                                            label="To"
                                            placeholder="To"
                                            error={(errors) && errors.to}
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
                                                className={classnames(
                                                    "form-control selectPlaceholder",
                                                    {
                                                        "is-invalid": (errors) && errors.block
                                                    }
                                                )}
                                                value={block}
                                                onChange={this.onChange}
                                                style={{ fontSize: "14px" }}
                                            >
                                                <option value="">--Select Block--</option>
                                                {this.renderParentBlocks()}
                                            </select>

                                            {errors && (
                                                <div className="invalid-feedback">{(errors) && errors.block}</div>
                                            )}
                                        </div>
                                        {/* SUB BLOCK NAME */}
                                        <div className="form-group">
                                            <span
                                                className="input-group-addon"
                                                style={{ marginRight: "3px" }}
                                            >
                                                <i className="fas fa-th-large" />
                                            </span>
                                            <label htmlFor="sub_block_name">Sub-Block Name</label>
                                            <select
                                                name="sub_block_name"
                                                className={classnames(
                                                    "form-control selectPlaceholder",
                                                    {
                                                        "is-invalid": (errors) && errors.sub_block_name
                                                    }
                                                )}
                                                value={sub_block_name}
                                                onChange={this.onChange}
                                                style={{ fontSize: "14px" }}
                                            >
                                                <option value="">--Select Sub-Block--</option>
                                                {this.renderChildBlocks()}
                                            </select>

                                            {errors && (
                                                <div className="invalid-feedback">
                                                    {(errors) && errors.sub_block_name}
                                                </div>
                                            )}
                                        </div>
                                        {/* VARIETY */}
                                        <div className="form-group">
                                            <span
                                                className="input-group-addon"
                                                style={{ marginRight: "3px" }}
                                            >
                                                <i className="fas fa-th-large" />
                                            </span>
                                            <label htmlFor="variety">Variety Name</label>
                                            <select
                                                name="variety"
                                                className={classnames(
                                                    "form-control selectPlaceholder",
                                                    {
                                                        "is-invalid": (errors) && errors.variety
                                                    }
                                                )}
                                                value={variety}
                                                onChange={this.onChange}
                                                style={{ fontSize: "14px" }}
                                            >
                                                <option value="">--Select Variety--</option>
                                                {allVariety}
                                            </select>

                                            {errors && (
                                                <div className="invalid-feedback">{(errors) && errors.variety}</div>
                                            )}
                                        </div>
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
                                                <option value="0" style={{ fontStyle: "normal" }}>Inactive</option>
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
                                        value="Add Bed"
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

CreateBed.propTypes = {
    handleCreateBed: PropTypes.func.isRequired,
    allBlocks: PropTypes.array.isRequired,
    errors: PropTypes.object,
    varietyList: PropTypes.array.isRequired
};

export default CreateBed;
