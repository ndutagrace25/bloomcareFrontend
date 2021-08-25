import React, { Component } from "react";
import PropTypes from "prop-types";

import { InputFields, Button, SearchContainer } from "../common";

class SearchIssue extends Component {
    render() {
        const {
            search_issue_name,
            search_issue_type,
            search_tolerance_type,
            search_score
        } = this.props;
        const { issueType, toleranceType, scoreList } = this.props;

        const allIssueType = issueType ? issueType.map(issueType => (
            <React.Fragment key={issueType._id}>
                <option value={issueType._id} style={{ fontStyle: "normal" }}>
                    {issueType.name}
                </option>
            </React.Fragment>
        )) : null;

        const alltoleranceType = toleranceType ? toleranceType.map(toleranceType => (
            <React.Fragment key={toleranceType._id}>
                <option value={toleranceType._id} style={{ fontStyle: "normal" }}>
                    {toleranceType.name}
                </option>
            </React.Fragment>
        )) : null;

        const allscoreList = scoreList ? scoreList.map(scoreList => (
            <React.Fragment key={scoreList._id}>
                <option value={scoreList._id} style={{ fontStyle: "normal" }}>
                    {scoreList.name}
                </option>
            </React.Fragment>
        )) : null;

        return (
            <SearchContainer
                data-test="SearchIssueComponent"
                searchForm={
                    <form noValidate onSubmit={e => this.props.handleSearch(e)}>
                        {/* ISSUE NAME */}
                        <InputFields
                            type="text"
                            name="search_issue_name"
                            onChange={this.props.onChange}
                            value={search_issue_name}
                            label="Issue Name"
                        />

                        {/* ISSUE TYPE */}
                        <div className="form-group">
                            <label htmlFor="issue_type">Issue Type Name</label>
                            <select
                                name="search_issue_type"
                                className="form-control selectPlaceholder"
                                value={search_issue_type}
                                onChange={this.props.onChange}
                                style={{ fontSize: "14px" }}
                            >
                                <option value="">--Select Issue Type--</option>
                                {allIssueType}
                            </select>
                        </div>

                        {/* TOLERANCE TYPE */}
                        <div className="form-group">
                            <label htmlFor="tolerance_type">Tolerance Type</label>
                            <select
                                name="search_tolerance_type"
                                className="form-control selectPlaceholder"
                                value={search_tolerance_type}
                                onChange={this.props.onChange}
                                style={{ fontSize: "14px" }}
                            >
                                <option value="">--Select Tolerance Type--</option>
                                {alltoleranceType}
                            </select>
                        </div>

                        {/* SCORE */}
                        <div className="form-group">
                            <label htmlFor="score">Score</label>
                            <select
                                name="search_score"
                                className="form-control selectPlaceholder"
                                value={search_score}
                                onChange={this.props.onChange}
                                style={{ fontSize: "14px" }}
                            >
                                <option value="">--Select Score--</option>
                                {allscoreList}
                            </select>
                        </div>
                        <div className="d-flex justify-content-between">
                            <Button
                                onClick={this.props.handleCloseSearch}
                                className="btn btn-sm btn-outline-danger waves-effect ml-0"
                                otherProps={<i className="fas fa-window-close mr-1" />}
                                value=" Close"
                            />

                            <Button
                                type="submit"
                                className="btn btn-sm btn-outline-default waves-effect mr-0"
                                otherProps={<i className="fas fa-search mr-1" />}
                                value=" Search"
                            />
                        </div>
                    </form>
                }
            />
        );
    }
}

SearchIssue.propTypes = {
    handleSearch: PropTypes.func.isRequired,
    handleCloseSearch: PropTypes.func.isRequired,
    search_issue_name: PropTypes.string,
    search_issue_type: PropTypes.string,
    search_tolerance_type: PropTypes.string,
    search_score: PropTypes.string,
    issueType: PropTypes.array.isRequired,
    toleranceType: PropTypes.array.isRequired,
    scoreList: PropTypes.array.isRequired
};

export default SearchIssue;
