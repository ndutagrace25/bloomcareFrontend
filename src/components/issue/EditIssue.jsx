import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import { InputFields, Button } from "../common";

class EditIssue extends Component {
    state = {
        _id: 0,
        issue_name: "",
        issue_type: "",
        tolerance_type: "",
        score: "",
        errors: {}
    };

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    componentDidMount() {
        const { _id, issue_name, issue_type, tolerance_type, score } = this.props;
        this.setState({
            _id,
            issue_name,
            issue_type,
            tolerance_type,
            score
        });
    }

    submitNewIssue = e => {
        e.preventDefault();
        const { _id, issue_name, issue_type, tolerance_type, score } = this.state;
        const issue = {
            issue_name,
            issue_type,
            tolerance_type,
            score
        };
        this.props.handlePreloaderStyle("d-block");
        this.props.updateIssue(_id, issue);
    };

    render() {
        const { _id, issue_name, issue_type, tolerance_type, score } = this.state;
        const { errors, issueType, toleranceType, scoreList } = this.props;

        const allIssueType = (issueType instanceof Array) ? issueType.map(issueType => (
            <React.Fragment key={issueType._id}>
                <option value={issueType._id}>{issueType.name}</option>
            </React.Fragment>
        )) : null;

        const alltoleranceType = (toleranceType instanceof Array) ? toleranceType.map(toleranceType => (
            <React.Fragment key={toleranceType._id}>
                <option value={toleranceType._id}>{toleranceType.name}</option>
            </React.Fragment>
        )) : null;

        const allscoreList = (scoreList instanceof Array) ? scoreList.map(scoreList => (
            <React.Fragment key={scoreList._id}>
                <option value={scoreList._id}>{scoreList.name}</option>
            </React.Fragment>
        )) : null;
        return (
            <div data-test="EditIssueComponent">
                <Button
                    type="button"
                    className="btn btn-primary btn-sm"
                    dataTarget={"#editIssue" + _id}
                    dataToggle="modal"
                    otherProps={
                        <i
                            className="fas fa-pen"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Edit Issue"
                        />
                    }
                />
                <div
                    className="modal fade"
                    id={"editIssue" + _id}
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-notify modal-info" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    Edit Issue{" "}
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
                                        {/* ISSUE NAME */}
                                        <InputFields
                                            otherProps={
                                                <span
                                                    className="input-group-addon"
                                                    style={{ marginRight: "3px" }}
                                                >
                                                    <i className="far fa-times-circle" />
                                                </span>
                                            }
                                            type="text"
                                            name="issue_name"
                                            onChange={this.onChange}
                                            label="Issue Name"
                                            placeholder="Issue Name"
                                            value={issue_name}
                                            error={errors && errors.issue_name}
                                        />

                                        {/* ISSUE TYPE */}
                                        <div className="form-group">
                                            <span
                                                className="input-group-addon"
                                                style={{ marginRight: "3px" }}
                                            >
                                                <i className="far fa-times-circle" />
                                            </span>
                                            <label htmlFor="issue_type">Issue Type</label>
                                            <select
                                                name="issue_type"
                                                className={classnames("form-control", {
                                                    "is-invalid": errors && errors.issue_type
                                                })}
                                                value={issue_type}
                                                onChange={this.onChange}
                                            >
                                                <option value="">--Select Issue Type--</option>
                                                {allIssueType}
                                            </select>
                                            {errors && (
                                                <div className="invalid-feedback">
                                                    {errors && errors.issue_type}
                                                </div>
                                            )}
                                        </div>

                                        {/* TOLERANCE TYPE */}
                                        <div className="form-group">
                                            <span
                                                className="input-group-addon"
                                                style={{ marginRight: "3px" }}
                                            >
                                                <i className="far fa-times-circle" />
                                            </span>
                                            <label htmlFor="tolerance_type">Tolerance Type</label>
                                            <select
                                                name="tolerance_type"
                                                className={classnames("form-control", {
                                                    "is-invalid": errors && errors.tolerance_type
                                                })}
                                                value={tolerance_type}
                                                onChange={this.onChange}
                                            >
                                                <option value="">--Select Tolerance Type--</option>
                                                {alltoleranceType}
                                            </select>
                                            {errors && (
                                                <div className="invalid-feedback">
                                                    {errors && errors.tolerance_type}
                                                </div>
                                            )}
                                        </div>

                                        {/* SCORE */}
                                        <div className="form-group">
                                            <span
                                                className="input-group-addon"
                                                style={{ marginRight: "3px" }}
                                            >
                                                <i className="far fa-times-circle" />
                                            </span>
                                            <label htmlFor="score">Score</label>
                                            <select
                                                name="score"
                                                className={classnames("form-control", {
                                                    "is-invalid": errors && errors.score
                                                })}
                                                value={score}
                                                onChange={this.onChange}
                                            >
                                                <option value="">--Select Score--</option>
                                                {allscoreList}
                                            </select>
                                            {errors && (
                                                <div className="invalid-feedback">
                                                    {errors && errors.score}
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
                                        onClick={this.submitNewIssue}
                                        className="btn btn-sm btn-outline-default waves-effect mr-0"
                                        value="Update Issue"
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

EditIssue.propTypes = {
    updateIssue: PropTypes.func.isRequired,
    _id: PropTypes.string.isRequired,
    issue_name: PropTypes.string.isRequired,
    issueType: PropTypes.array.isRequired,
    toleranceType: PropTypes.array.isRequired,
    scoreList: PropTypes.array.isRequired,
    errors: PropTypes.object
};

export default EditIssue;
