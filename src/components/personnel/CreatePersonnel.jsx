import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import { InputFields, Button } from "../common";

class CreatePersonnel extends Component {
    state = {
        first_name: "",
        last_name: "",
        phone: "",
        status: "",
        personnel_type_id: ""
    };

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    submitNewPersonnel = e => {
        e.preventDefault();
        const {
            first_name,
            last_name,
            phone,
            status,
            personnel_type_id
        } = this.state;
        const personnel = {
            first_name,
            last_name,
            phone,
            status,
            personnel_type_id
        };
        this.props.handleCreatePersonnel(personnel);
    };

    componentWillReceiveProps = () => {
        const {
            first_name,
            last_name,
            phone,
            status,
            personnel_type_id
        } = this.props;
        this.setState({
            first_name,
            last_name,
            phone,
            status,
            personnel_type_id
        });
    };

    render() {
        const {
            first_name,
            last_name,
            phone,
            status,
            personnel_type_id
        } = this.state;
        const { errors, personnelType } = this.props;
        console.log(personnelType);
        const allPersonnelType = (personnelType instanceof Array) ? personnelType.map(person => (
            <React.Fragment key={person._id}>
                <option value={person._id} style={{ fontStyle: "normal" }}>
                    {person.name}
                </option>
            </React.Fragment>
        )) : null;
        return (
            <div data-test="CreatePersonnelComponent">
                <Button
                    type="button"
                    className="btn btn-sm btn-outline-default waves-effect ml-0"
                    dataTarget="#addNewPersonnel"
                    dataToggle="modal"
                    value="Personnel"
                    otherProps={<i className="fas fa-plus mr-1" />}
                />
                <div
                    className="modal fade"
                    id="addNewPersonnel"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-notify modal-info" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title w-100" id="exampleModalLabel">
                                    Add Personnel{" "}
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
                                <div className="modal-body mx-3">
                                    <div className="container-fluid">
                                        <InputFields
                                            otherProps={
                                                <span
                                                    className="input-group-addon"
                                                    style={{ marginRight: "3px" }}
                                                >
                                                    <i className="fas fa-user" />
                                                </span>
                                            }
                                            type="text"
                                            name="first_name"
                                            onChange={this.onChange}
                                            placeholder="Personnel First Name"
                                            label="Personnel First Name"
                                            value={first_name}
                                            error={errors && errors.first_name}
                                        />
                                        <InputFields
                                            otherProps={
                                                <span
                                                    className="input-group-addon"
                                                    style={{ marginRight: "3px" }}
                                                >
                                                    <i className="fas fa-user" />
                                                </span>
                                            }
                                            type="text"
                                            name="last_name"
                                            value={last_name}
                                            onChange={this.onChange}
                                            label="Personnel Last Name"
                                            placeholder="Personnel Last Name"
                                            error={errors && errors.last_name}
                                        />

                                        <InputFields
                                            otherProps={
                                                <span
                                                    className="input-group-addon"
                                                    style={{ marginRight: "3px" }}
                                                >
                                                    <i className="fas fa-phone" />
                                                </span>
                                            }
                                            type="number"
                                            name="phone"
                                            value={phone}
                                            onChange={this.onChange}
                                            label="Personnel Phone Number"
                                            placeholder="Personnel Phone Number"
                                            error={errors && errors.phone}
                                        />
                                        <div className="form-group">
                                            <span
                                                className="input-group-addon"
                                                style={{ marginRight: "3px" }}
                                            >
                                                <i className="fab fa-accessible-icon" />
                                            </span>
                                            <label htmlFor="status">Personnel Status</label>
                                            <select
                                                name="status"
                                                className={classnames(
                                                    "form-control selectPlaceholder",
                                                    {
                                                        "is-invalid": errors && errors.status
                                                    }
                                                )}
                                                value={status}
                                                onChange={this.onChange}
                                                style={{ fontSize: "14px" }}
                                            >
                                                <option value="" disabled>
                                                    --Select Personnel Status--
                                                </option>
                                                <option value="1" style={{ fontStyle: "normal" }}>
                                                    Active
                                                </option>
                                                <option value="0" style={{ fontStyle: "normal" }}>
                                                    Inactive
                                                </option>
                                            </select>
                                            {errors && (
                                                <div className="invalid-feedback">{errors && errors.status}</div>
                                            )}
                                        </div>
                                        <div className="form-group">
                                            <span
                                                className="input-group-addon"
                                                style={{ marginRight: "3px" }}
                                            >
                                                <i className="fas fa-user-cog" />
                                            </span>
                                            <label htmlFor="personnel_type_id">Personnel Type</label>
                                            <select
                                                name="personnel_type_id"
                                                className={classnames(
                                                    "form-control selectPlaceholder",
                                                    {
                                                        "is-invalid": errors && errors.status
                                                    }
                                                )}
                                                value={personnel_type_id}
                                                onChange={this.onChange}
                                                style={{ fontSize: "14px" }}
                                            >
                                                <option value="" disabled className="selectPlaceholder">
                                                    --Select Personnel Type--
                                                </option>
                                                {allPersonnelType}
                                            </select>

                                            {errors && (
                                                <div className="invalid-feedback">
                                                    {errors && errors.personnel_type_id}
                                                </div>
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
                                        onClick={this.submitNewPersonnel}
                                        className="btn btn-sm btn-outline-default waves-effect mr-0"
                                        // dataDismiss="modal"
                                        value="Add Personnel"
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

CreatePersonnel.propTypes = {
    handleCreatePersonnel: PropTypes.func.isRequired,
    errors: PropTypes.object,
    personnelType: PropTypes.array.isRequired
};

export default CreatePersonnel;
