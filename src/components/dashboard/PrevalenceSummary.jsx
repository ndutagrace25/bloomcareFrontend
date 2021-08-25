import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { PrevalencePreloader } from "../common";
import BedOverviewChart from "./BedOverviewChart";
import NewFilterPrevalence from "./NewFilterPrevalence";

import { fetchPrevalence } from "../../actions/scoutActions";

var d = new Date();
d.setDate(d.getDate() - 15);

class PrevalenceSummary extends Component {
  state = {
    prevalence: [],
    sdate: d.toISOString().substring(0, 10),
    edate: new Date().toISOString().substring(0, 10),
    block: "",
    variety: "",
    issue: "",
    preloaderStyle: "d-none"
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handlePreloaderStyle = newStyle => {
    this.setState({ preloaderStyle: newStyle });
  };

  fetchPrevalence = (sdate, edate, block, variety, issue) => {
    this.handlePreloaderStyle("d-block");
    this.props.fetchPrevalence(sdate, edate, block, variety, issue);
  };

  componentDidMount() {
    const { sdate, edate, block, variety, issue } = this.state;
    this.fetchPrevalence(sdate, edate, block, variety, issue);
  }

  componentWillReceiveProps(nextProps) {
    this.handlePreloaderStyle("d-none");
    if (nextProps.prevalence) {
      console.log(nextProps.prevalence);
      this.setState({
        prevalence: nextProps.prevalence
      });
    }
  }

  filterPrevalence = e => {
    e.preventDefault();
    const { sdate, edate, block, variety, issue } = this.state;
    this.handlePreloaderStyle("d-block");
    this.fetchPrevalence(sdate, edate, block, variety, issue);
  };

  clearSearch = () => {
    const { sdate, edate } = this.state;
    // console.log(sdate)
    this.fetchPrevalence(sdate, edate, "", "", "");
  };

  render() {
    const {
      prevalence,
      sdate,
      edate,
      block,
      variety,
      issue,
      preloaderStyle,
      parentBlockList,
      issueList,
      allVariety
    } = this.state;

    const allCharts =
      prevalence instanceof Array
        ? prevalence.map((chart, index) => (
            <React.Fragment key={index}>
              <div className="bg-white p-4 mr-4">
                <BedOverviewChart prevalence={chart} />
              </div>
            </React.Fragment>
          ))
        : null;

    return (
      <section className="d-flex flex-column col-md-12 pb-2 mb-2 db-section h500">
        <PrevalencePreloader preloaderStyle={preloaderStyle} />
        <h5 className="text-center text-theme">Prevalence</h5>
        <div className="d-flex flex-wrap">
          <div className="col-md-8 overflow-x-auto d-flex flex-row flex-nowrap pl-0">
            {allCharts}
          </div>
          <NewFilterPrevalence
            sdate={sdate}
            edate={edate}
            block={block}
            variety={variety}
            issue={issue}
            filterPrevalence={this.filterPrevalence}
            onChange={this.onChange}
            parentBlockList={parentBlockList}
            issueList={issueList}
            allVariety={allVariety}
            clearSearch={this.clearSearch}
          />
        </div>
      </section>
    );
  }
}

PrevalenceSummary.propTypes = {
  prevalence: PropTypes.array,
  fetchPrevalence: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  prevalence: state.scout.prevalence
});

export default connect(mapStateToProps, {
  fetchPrevalence
})(PrevalenceSummary);
