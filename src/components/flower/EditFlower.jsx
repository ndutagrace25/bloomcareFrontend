import React, { Component } from "react";
import PropTypes from "prop-types";

import { InputFields, Button } from "../common";

class EditFlower extends Component {
    state = {
        _id: 0,
        name: "",
        errors: {}
    };

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    componentDidMount() {
        const { _id, name } = this.props;
        this.setState({
            _id,
            name
        });
    }

    submitNewFlower = e => {
        e.preventDefault();
        const { _id, name } = this.state;
        const flower = {
            name
        };
        this.props.handlePreloaderStyle("d-block");
        this.props.updateFlower(_id, flower);
    };

    render() {
        const { _id, name } = this.state;
        const { errors } = this.props;
        return (
            <div data-test="EditFlowerComponent">
                <Button
                    type="button"
                    className="btn btn-primary btn-sm"
                    dataTarget={"#editFlower" + _id}
                    dataToggle="modal"
                    otherProps={
                        <i
                            className="fas fa-pen"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Edit Flower"
                        />
                    }
                />
                <div
                    className="modal fade"
                    id={"editFlower" + _id}
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-notify modal-info" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    Edit Variety{" "}
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
                                        <InputFields
                                            otherProps={
                                                <span
                                                    className="input-group-addon"
                                                    style={{ marginRight: "3px" }}
                                                >
                                                    <i className="fas fa-fan" />
                                                </span>
                                            }
                                            type="text"
                                            name="name"
                                            onChange={this.onChange}
                                            label="Variety Name"
                                            placeholder="Variety Name"
                                            value={name}
                                            error={(errors) && errors.name}
                                        />
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
                                        onClick={this.submitNewFlower}
                                        className="btn btn-sm btn-outline-default waves-effect mr-0"
                                        value="Update Variety"
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

EditFlower.propTypes = {
    updateFlower: PropTypes.func.isRequired,
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};

export default EditFlower;
