import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import moment from "moment";

import {
    fetchIssueCategory,
    createIssueCategory,
    updateIssueCategory,
    deleteIssueCategory,
    fetchIssue
} from "../../actions/issueCategoryActions";

import {
    Navbar,
    //   Error,
    Preloader,
    ContentContainer,
    TableWrap,
    ExportButton,
    Pagination
} from "../common";

import { IssueCategoryList, SearchIssueCategory, CreateIssueCategory } from ".";

class IssueCategoryLayout extends Component {
    state = {
        page: 0,
        limit: 10,
        count: 0,
        name: "",
        issueCategory: [],
        issueList: [],
        issue: "",
        errors: {},
        preloaderStyle: "d-none",
        issueCategoryCount: 0,
        successMessage: "",
        create_name: "",
        create_issue: "",
        search_name: "",
        search_issue: ""
    };

    handlePreloaderStyle = newStyle => {
        this.setState({ preloaderStyle: newStyle });
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

    handleSearch = e => {
        e.preventDefault();

        const { page, limit, search_name, search_issue } = this.state;

        this.fetchIssueCategory(page, limit, search_name, search_issue);
    };

    handleCloseSearch = () => {
        this.setState({
            search_name: "",
            search_issue: ""
        });

        const { page, limit } = this.state;

        this.fetchIssueCategory(page, limit, "", "");
    };

    handleIncrementPage = e => {
        e.preventDefault();
        const { page, limit, count, name, issue } = this.state;
        const totalPages = Math.ceil(count / limit);
        const newPage = page + 1;

        if (newPage < totalPages) {
            this.setState({ page: newPage, issueCategoryCount: newPage * limit });
            this.fetchIssueCategory(newPage, limit, name, issue);
        }
    };

    handleDecrementPage = e => {
        e.preventDefault();
        const { page, limit, name, issue } = this.state;
        const newPage = page - 1;
        if (newPage >= 0) {
            this.setState({ page: newPage, issueCategoryCount: newPage * limit });
            this.fetchIssueCategory(newPage, limit, name, issue);
        }
    };

    handleOnChangePage = e => {
        const { limit, name, issue } = this.state;
        const newPage = parseInt(e.target.value);
        this.setState({
            [e.target.name]: newPage,
            issueCategoryCount: newPage * limit
        });
        this.fetchIssueCategory(newPage, limit, name, issue);
    };

    handleCreateIssueCategory = issueCategory => {
        this.handlePreloaderStyle("d-block");
        this.setState({
            create_name: issueCategory.name,
            create_issue: issueCategory.issue
        });
        this.props.createIssueCategory(issueCategory);
    };

    fetchIssueCategory = (page, limit, name, issue) => {
        this.handlePreloaderStyle("d-block");
        this.props.fetchIssueCategory(page, limit, name, issue);
    };

    componentDidMount() {
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push("/");
        }
        const { page, limit, name, issue } = this.state;
        this.fetchIssueCategory(page, limit, name, issue);
        this.props.fetchIssue();
    }

    componentWillReceiveProps(nextProps) {
        this.handlePreloaderStyle("d-none");
        if (nextProps.issueCategory.items) {
            const newissueCategory = nextProps.issueCategory.items;
            this.setState({
                issueCategory: newissueCategory,
                count: nextProps.issueCategory.rows
            });
        }

        if (nextProps.issueList) {
            this.setState({
                issueList: nextProps.issueList
            });
        }

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }

        if (nextProps.issueCategoryCreated) {
            const issueCategoryCreated = nextProps.issueCategoryCreated;
            if (issueCategoryCreated.message === "Success") {
                this.setState({
                    successMessage: issueCategoryCreated.message,
                    create_name: "",
                    create_issue: ""
                });

                JSON.stringify(
                    Swal.fire("Issue Category Created Successful", "", "success")
                );
                const { page, limit, name, issue } = this.state;
                this.fetchIssueCategory(page, limit, name, issue);
                nextProps.issueCategoryCreated.message = "";
            }
        }

        if (nextProps.issueCategoryDeleted) {
            const issueCategoryDeleted = nextProps.issueCategoryDeleted;
            if (issueCategoryDeleted.message === "Success") {
                this.setState({
                    successMessage: issueCategoryDeleted.message
                });
                nextProps.issueCategoryDeleted.message = "";
                const { page, limit, name, issue } = this.state;
                this.fetchIssueCategory(page, limit, name, issue);
            }
        }

        if (nextProps.issueCategoryUpdated) {
            const issueCategoryUpdated = nextProps.issueCategoryUpdated;
            if (issueCategoryUpdated.message === "Success") {
                this.setState({
                    successMessage: issueCategoryUpdated.message
                });

                JSON.stringify(
                    Swal.fire("Issue Category Updated Successful", "", "success")
                );
                nextProps.issueCategoryUpdated.message = "";
                const { page, limit, name, issue } = this.state;
                this.fetchIssueCategory(page, limit, name, issue);
            }
        }
    }

    render() {
        const {
            issueCategory,
            issueList,
            preloaderStyle,
            errors,
            page,
            limit,
            count,
            issueCategoryCount,
            successMessage,
            create_name,
            create_issue,
            search_name,
            search_issue
        } = this.state;

        const exportIssueCategory = issueCategory.map(issueCategory => {
            const data = {
                Issue_Category_Name: issueCategory.name,
                Issue_Name: issueCategory.issue.issue_name
            };
            return data;
        });

        return (
            <div className="components-view" data-test="IssueCategoryLayoutComponent">
                <Preloader preloaderStyle={preloaderStyle} data-test="PreloaderComponent" />
                <Navbar data-test="NavbarComponent" />
                {/* <Error message={errors} /> */}
                <ContentContainer
                    data-test="ContainerComponent"
                    content={
                        <React.Fragment>
                            <TableWrap
                                tableTitle="Issue Category"
                                createButton={
                                    <CreateIssueCategory
                                        handlePreloaderStyle={this.handlePreloaderStyle}
                                        handleCreateIssueCategory={this.handleCreateIssueCategory}
                                        errors={errors}
                                        name={create_name}
                                        issue={create_issue}
                                        successMessage={successMessage}
                                        issueList={issueList}
                                    />
                                }
                                exportButton={
                                    <ExportButton
                                        data={exportIssueCategory}
                                        filename={
                                            moment().format("DD/MM/YYYY H:mm:ss") +
                                            " IssueCategory.csv"
                                        }
                                    />
                                }
                                tableContent={
                                    <React.Fragment>
                                        {" "}
                                        <IssueCategoryList
                                            issueCategory={issueCategory}
                                            errors={errors}
                                            issueCategoryCount={issueCategoryCount + 1}
                                            issueList={issueList}
                                            updateIssueCategory={this.props.updateIssueCategory}
                                            deleteIssueCategory={this.props.deleteIssueCategory}
                                            handlePreloaderStyle={this.handlePreloaderStyle}
                                            successMessage={successMessage}
                                        />
                                        {count > 10 ? (
                                            <Pagination
                                                page={page}
                                                limit={limit}
                                                count={count}
                                                handleDecrementPage={this.handleDecrementPage}
                                                handleIncrementPage={this.handleIncrementPage}
                                                handleOnChangePage={this.handleOnChangePage}
                                            />
                                        ) : (
                                                ""
                                            )}
                                    </React.Fragment>
                                }
                            />
                            <SearchIssueCategory
                                onChange={this.onChange}
                                onChangeNumber={this.onChangeNumber}
                                handleSearch={this.handleSearch}
                                handleCloseSearch={this.handleCloseSearch}
                                search_name={search_name}
                                search_issue={search_issue}
                                issueList={issueList}
                            />
                        </React.Fragment>
                    }
                />
            </div>
        );
    }
}

IssueCategoryLayout.propTypes = {
    fetchIssueCategory: PropTypes.func.isRequired,
    issueCategory: PropTypes.object,
    issueList: PropTypes.array.isRequired,
    createIssueCategory: PropTypes.func.isRequired,
    updateIssueCategory: PropTypes.func.isRequired,
    deleteIssueCategory: PropTypes.func.isRequired,
    fetchIssue: PropTypes.func.isRequired,
    errors: PropTypes.object
};

const mapStateToProps = state => ({
    issueCategory: state.issueCategory.issueCategory,
    issueList: state.issueCategory.issueList,
    errors: state.errors,
    auth: state.auth,
    issueCategoryCreated: state.issueCategory.issueCategoryCreated,
    issueCategoryDeleted: state.issueCategory.issueCategoryDeleted,
    issueCategoryUpdated: state.issueCategory.issueCategoryUpdated
});

export default connect(
    mapStateToProps,
    {
        fetchIssueCategory,
        createIssueCategory,
        updateIssueCategory,
        deleteIssueCategory,
        fetchIssue
    }
)(IssueCategoryLayout);
