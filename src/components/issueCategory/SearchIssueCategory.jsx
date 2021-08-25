import React from "react";
import PropTypes from "prop-types";

import { InputFields, Button, SearchContainer } from "../common";

const SearchIssueCategory = ({ search_name, search_issue, issueList, handleCloseSearch, handleSearch, onChange }) => {
    const allIssueList = issueList ? issueList.map(issueList => (
        <React.Fragment key={issueList._id}>
            <option value={issueList._id} style={{ fontStyle: "normal" }}>
                {issueList.issue_name}
            </option>
        </React.Fragment>
    )) : null;
    return (
        <SearchContainer
            data-test="SearchIssueCategoryComponent"
            searchForm={
                <form noValidate onSubmit={e => handleSearch(e)}>
                    <InputFields
                        type="text"
                        name="search_name"
                        onChange={onChange}
                        value={search_name}
                        label="Issue Category"
                    />
                    {/* ISSUE NAME */}
                    <div className="form-group">
                        <label htmlFor="issue">Issue Name</label>
                        <select
                            name="search_issue"
                            className="form-control selectPlaceholder"
                            value={search_issue}
                            onChange={onChange}
                            style={{ fontSize: "14px" }}
                        >
                            <option value="" disabled>
                                --Select Issue--
                            </option>
                            {allIssueList}
                        </select>
                    </div>
                    <div className="d-flex justify-content-between">
                        <Button
                            onClick={handleCloseSearch}
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

SearchIssueCategory.propTypes = {
    handleSearch: PropTypes.func.isRequired,
    handleCloseSearch: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    issueList: PropTypes.array.isRequired,
    search_name: PropTypes.string,
    search_issue: PropTypes.string
};

export default SearchIssueCategory;
