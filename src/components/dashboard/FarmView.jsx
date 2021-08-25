import React, { Component } from "react";
import PropTypes from "prop-types";
import BedOverviewChart from "./BedOverviewChart";
import FilterPrevalence from "./FilterPrevalence";

class FarmView extends Component {
  state = {};
  render() {
    const {
      farmReportAlert,
      issueCategory,
      issue,
      sdate,
      edate,
      prevalence,
      IssueList,
      IssueCategoryList,
      parentBlockList,
      varietyReport,
      // filterVarietyBlock,
      // varietyCreated,
      selectVaraities,
      block,
      variety
    } = this.props;
    // console.log(varietyReport);
    const allCharts =
      prevalence instanceof Array
        ? prevalence.map((prev, index) => (
            <div style={{ marginTop: "50px" }}>
              <BedOverviewChart prevalence={prev} key={index} /> 
            </div>
          ))
        : null;

    const allBlocks =
      farmReportAlert instanceof Array
        ? farmReportAlert.map((block, index) => (
            <React.Fragment key={index}>
              <div className="d-flex flex-column block-container">
                <div
                  className={
                    block.alert === "Warning"
                      ? "block d-flex align-items-center justify-content-center bg-warning"
                      : block.alert === "Danger"
                      ? "block d-flex align-items-center justify-content-center bg-danger glow"
                      : block.alert === "Default"
                      ? "block d-flex align-items-center justify-content-center bg-default"
                      : "block d-flex align-items-center justify-content-center bg-success"
                  }
                  onClick={() => {
                    this.props.onBlockClick(block.block_id, "", "", "", "", "");
                  }}
                >
                  {block.block_name}
                </div>
                {block.block_issue_types instanceof Array
                  ? block.block_issue_types.map((issueType, index) => (
                      <React.Fragment key={index}>
                        <div
                          className={
                            issueType.alert === "Danger"
                              ? "m-1 text-danger b-danger"
                              : issueType.alert === "Warning"
                              ? "m-1 text-warning b-warning"
                              : issueType.alert === "Success"
                              ? "m-1 text-success b-success"
                              : "m-1 text-muted b-noScout"
                          }
                        >
                          {issueType.issue_type_name}
                        </div>
                      </React.Fragment>
                    ))
                  : null}
                <div
                  className={
                    block.scout_alert === "Danger"
                      ? "m-1 text-danger b-danger"
                      : block.scout_alert === "Warning"
                      ? "m-1 text-warning b-warning"
                      : block.scout_alert === "Success"
                      ? "m-1 text-success b-success"
                      : "m-1 text-muted b-noScout"
                  }
                >
                  {" "}
                  {block.scout_alert && "Scout"}
                </div>
              </div>
            </React.Fragment>
          ))
        : null;

    const selectParentBlock =
      parentBlockList instanceof Array
        ? parentBlockList.map((block, index) => (
            <option key={index} value={block._id}>
              {block.name}
            </option>
          ))
        : null;

    const allVariety =
      varietyReport instanceof Array
        ? varietyReport.map((variety, index) => (
            <div className="d-flex flex-column block-container" key={index}>
              <div
                className={
                  variety.scout_alert === "Success"
                    ? "block d-flex align-items-center justify-content-center bg-success"
                    : variety.scout_alert === "Danger"
                    ? "block d-flex align-items-center justify-content-center bg-danger glow"
                    : variety.scout_alert === "Warning"
                    ? "block d-flex align-items-center justify-content-center bg-warning"
                    : "block d-flex align-items-center justify-content-center bg-default"
                }
              >
                {variety.variety_name}
              </div>
              {variety.variety_issue_types.map((issue, index) => (
                <React.Fragment key={index}>
                  <div
                    className={
                      issue.alert === "Success"
                        ? "m-1 text-success b-success"
                        : issue.alert === "Danger"
                        ? "m-1 text-danger b-danger"
                        : issue.alert === "Warning"
                        ? "m-1 text-warning b-warning"
                        : "m-1 text-muted b-noScout"
                    }
                  >
                    {issue.issue_type_name}
                  </div>
                </React.Fragment>
              ))}
              <div
                className={
                  issue.scout_alert === "Success"
                    ? "m-1 text-success b-success"
                    : issue.scout_alert === "Danger"
                    ? "m-1 text-danger b-danger"
                    : issue.scout_alert === "Warning"
                    ? "m-1 text-warning b-warning"
                    : "m-1 text-muted b-noScout"
                }
              >
                {variety.scout_alert && "Scout"}
              </div>
            </div>
          ))
        : null;
    return (
      <div data-test="FarmViewComponent">
        <nav className="d-flex justify-content-around">
          <div className="nav nav-tabs " id="nav-tab" role="tablist">
            <a
              className="nav-item nav-link active"
              id="farm-view-tab"
              data-toggle="tab"
              href="#farm-view"
              role="tab"
              aria-controls="farm-view"
              aria-selected="true"
            >
              Farm
            </a>
            <a
              className="nav-item nav-link"
              id="farm-variety-tab"
              data-toggle="tab"
              href="#farm-variety"
              role="tab"
              aria-controls="farm-variety"
              aria-selected="false"
            >
              Variety
            </a>
            <a
              className="nav-item nav-link"
              id="block-privalence-tab"
              data-toggle="tab"
              href="#block-privalence"
              role="tab"
              aria-controls="block-privalence"
              aria-selected="false"
            >
              Prevalence
            </a>
          </div>
        </nav>

        <div className="tab-content" id="nav-tabContent">
          <div
            className="tab-pane fade show active"
            id="farm-view"
            role="tabpanel"
            aria-labelledby="farm-view-tab"
          >
            <div className="container-fluid">
              <div className="blocks-container d-flex flex-wrap justify-content-between">
                {allBlocks}
              </div>
            </div>
          </div>

          {/* start of variety tab */}
          <div
            className="tab-pane fade"
            id="farm-variety"
            role="tabpanel"
            aria-labelledby="farm-variety-tab"
          >
            <div className="container-fluid d-flex flex-column p-0">
              {/* SELECT VARIETY */}
              {/* form start */}
              <div className="col-md-12">
                <form
                  className="card p-2 mt-10 mb-3 d-flex flex-row align-items-center justify-content-between form-inline font-size-8"
                  onSubmit={e => this.props.searchVarietyReport(e)}
                >
                  <span>Filter By:</span>
                  <div className="form-group">
                    <label htmlFor="input1">Variety</label>
                    <input
                      type="text"
                      className="form-control ml-2 rounded-0"
                      id="input1"
                      placeholder="Search for variety..."
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="input3">Date</label>
                    <input
                      type="date"
                      className="form-control ml-2 rounded-0"
                      id="input3"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="selectInput3">Select Block</label>
                    <select
                      className="form-control ml-2 rounded-0"
                      id="selectInput3"
                    >
                      <option>-Select Block-</option>
                      {selectParentBlock}
                    </select>
                  </div>
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-sm btn-outline-default waves-effect ml-0"
                      type="submit"
                    >
                      <i className="fas fa-search mr-1"></i>Search
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger waves-effect mr-0"
                      onClick={this.props.closeSearchVarietyReport}
                    >
                      <i className="fas fa-times mr-1"></i>Close
                    </button>
                  </div>
                </form>
              </div>
              {/* form end */}
              <div className="col-md-12">
                <div className="blocks-container d-flex flex-wrap justify-content-between">
                  {allVariety}
                </div>
              </div>
            </div>
          </div>
          {/* end of variety tab */}
          {/* start of prevalence tab */}
          <div
            id="block-privalence"
            className="tab-pane fade"
            role="tabpanel"
            aria-labelledby="block-privalence"
          >
            {" "}
            <div className="container-fluid">
              <div className="bedOverview-container d-flex flex-wrap justify-content-between">
                <div className="col-md-8">
                  <div className="card p-3">
                    {allCharts}
                    {/* <BedOverviewChart /> */}
                  </div>
                </div>
                <FilterPrevalence
                  issueCategory={issueCategory}
                  issue={issue}
                  sdate={sdate}
                  edate={edate}
                  block={block}
                  variety={variety}
                  onChange={this.props.onChange}
                  IssueList={IssueList}
                  IssueCategoryList={IssueCategoryList}
                  handleSearchPrevalence={this.props.handleSearchPrevalence}
                  handleCloseSearchPrevalence={
                    this.props.handleCloseSearchPrevalence
                  }
                  selectVaraities={selectVaraities}
                  selectParentBlock={selectParentBlock}
                />
              </div>
            </div>
          </div>
          {/* end of prevalence tab */}
        </div>
      </div>
    );
  }
}
FarmView.propTypes = {
  farmReportAlert: PropTypes.array.isRequired,
  parentBlockList: PropTypes.array,
  onChange: PropTypes.func,
  issueCategory: PropTypes.string,
  issue: PropTypes.string,
  sdate: PropTypes.string,
  edate: PropTypes.string,
  parentBlock: PropTypes.string,
  searchVarietyReport: PropTypes.func,
  closeSearchVarietyReport: PropTypes.func,
  varietyReport: PropTypes.array
};

export default FarmView;
