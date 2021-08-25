import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { fetchParentBlock } from "../../actions/blockActions";
import { fetchIssue } from "../../actions/issueCategoryActions";
import { fetchAllVariety } from "../../actions/flowerActions";

class NewFilterPrevalence extends Component {
  state = { parentBlockList: [], issueList: [], allVariety: [] };
  componentDidMount() {
    this.fetchAllFilters();
  }

  fetchAllFilters = () => {
    this.props.fetchParentBlock();
    this.props.fetchIssue();
    this.props.fetchAllVariety();
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.parentBlockList) {
      const newparentBlockList = nextProps.parentBlockList;
      console.log(newparentBlockList);
      this.setState({
        parentBlockList: newparentBlockList
      });
    }
    if (nextProps.issueList) {
      const newissueList = nextProps.issueList;
      console.log(newissueList);
      this.setState({
        issueList: newissueList
      });
    }
    if (nextProps.allVariety) {
      const newallVariety = nextProps.allVariety;
      this.setState({
        allVariety: newallVariety
      });
    }
  }

  render() {
    const { sdate, edate, block, variety, issue } = this.props;

    const { parentBlockList, issueList, allVariety } = this.state;

    // fetch all blocks
    const AllBlocks =
      parentBlockList instanceof Array
        ? parentBlockList.map((block, index) => (
            <React.Fragment key={index}>
              <option value={block.id}>{block.block_name}</option>
            </React.Fragment>
          ))
        : null;

    // fetch all issue
    const AllIssues =
      issueList instanceof Array
        ? issueList.map((issue, index) => (
            <React.Fragment key={index}>
              <option value={issue.id}>{issue.issue_name}</option>
            </React.Fragment>
          ))
        : null;

    // fetch all varieties
    const AllVarieties =
      allVariety instanceof Array
        ? allVariety.map((variety, index) => (
            <React.Fragment key={index}>
              <option value={variety.id}>{variety.name}</option>
            </React.Fragment>
          ))
        : null;
    return (
      <div className="col-md-4 pr-n15">
        <form
          className="bg-white p-4"
          onSubmit={e => this.props.filterPrevalence(e)}
        >
          <h6>Filter by</h6>
          <div className="form-group form-inline">
            <label className="col-sm-2 pl-n15">From:</label>
            <input
              type="date"
              className="form-control form-control-sm col-sm-10"
              name="sdate"
              value={sdate}
              onChange={this.props.onChange}
            />
          </div>
          <div className="form-group form-inline">
            <label className="col-sm-2 pl-n15">To:</label>
            <input
              type="date"
              className="form-control form-control-sm col-sm-10"
              name="edate"
              value={edate}
              onChange={this.props.onChange}
            />
          </div>
          <div className="form-group form-inline">
            <label className="col-sm-2 pl-n15">Block:</label>
            <select
              className="col-sm-10 form-control form-control-sm"
              name="block"
              value={block}
              onChange={this.props.onChange}
            >
              <option value="">--Select Block--</option>
              {AllBlocks}
            </select>
          </div>
          <div className="form-group form-inline">
            <label className="col-sm-2 pl-n15">Variety:</label>
            <select
              className="col-sm-10 form-control form-control-sm"
              name="variety"
              value={variety}
              onChange={this.props.onChange}
            >
              <option>--Select Variety--</option>
              {AllVarieties}
            </select>
          </div>
          <div className="form-group form-inline">
            <label className="col-sm-2 pl-n15">Issue:</label>
            <select
              className="col-sm-10 form-control form-control-sm"
              name="issue"
              value={issue}
              onChange={this.props.onChange}
            >
              <option value="">--Select Issue--</option>
              {AllIssues}
            </select>
          </div>
          <div className="d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-outline-danger rounded-0"
              data-dismiss="modal"
              onClick={this.props.clearSearch}
            >
              RESET
            </button>

            <button type="submit" className="btn btn-primary rounded-0">
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    );
  }
}

NewFilterPrevalence.propTypes = {
  parentBlockList: PropTypes.array,
  issueList: PropTypes.array,
  fetchIssue: PropTypes.func,
  fetchAllVariety: PropTypes.func,
  allVariety: PropTypes.array,
  fetchParentBlock: PropTypes.func
};

const mapStateToProps = state => ({
  parentBlockList: state.block.parentBlockList,
  issueList: state.issueCategory.issueList,
  allVariety: state.scout.allVariety
});

export default connect(mapStateToProps, {
  fetchParentBlock,
  fetchIssue,
  fetchAllVariety
})(NewFilterPrevalence);
