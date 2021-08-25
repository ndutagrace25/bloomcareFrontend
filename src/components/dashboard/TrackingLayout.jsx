import React, { Component } from "react";
import { fetchParentBlock } from "../../actions/blockActions";
import { fetchScouts } from "../../actions/personnelActions";
import { fetchTrackingReport } from "../../actions/scoutActions";
import { connect } from "react-redux";
import Tracking from "./Tracking";
import { NewNavBar, Preloader } from "../common";

class TrackingLayout extends Component {
  state = {
    parentBlockList: [],
    allScoutPersonnel: [],
    trackingReport: [],
    date: new Date().toISOString().substring(0, 10),
    created_by: "",
    block: "",
    preloaderStyle: "d-none",
    trialArray: [
      {
        lat: 0.017827,
        lng: 37.074167
      },
      {
        lat: 0.017982,
        lng: 37.074163
      },
      {
        lat: 0.018123,
        lng: 37.074154
      },
      {
        lat: 0.018204,
        lng: 37.074006
      },
      {
        lat: 0.018368,
        lng: 37.074026
      },
      {
        lat: 0.018451,
        lng: 37.073853
      },
      {
        lat: 0.018493,
        lng: 37.073727
      },
      {
        lat: 0.018579,
        lng: 37.073685
      },
      {
        lat: 0.018634,
        lng: 37.073777
      }
    ]
  };

  handlePreloaderStyle = newStyle => {
    this.setState({ preloaderStyle: newStyle });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
    this.props.fetchParentBlock();
    this.props.fetchScouts();
  }

  componentWillReceiveProps(nextProps) {
    this.handlePreloaderStyle("d-none");
    if (nextProps.parentBlockList) {
      this.setState({
        parentBlockList: nextProps.parentBlockList
      });
    }
    if (nextProps.allScoutPersonnel) {
      this.setState({
        allScoutPersonnel: nextProps.allScoutPersonnel
      });
    }
    if (nextProps.trackingReport) {
      this.setState({
        trackingReport: nextProps.trackingReport
      });
    }
  }

  fetchTrackingScoutReport = e => {
    this.handlePreloaderStyle("d-block");
    e.preventDefault();
    const { date, created_by, block } = this.state;
    console.log(date, created_by, block);
    this.props.fetchTrackingReport(date, created_by, block);
  };
  render() {
    const {
      parentBlockList,
      allScoutPersonnel,
      date,
      created_by,
      block,
      preloaderStyle
    } = this.state;

    const allBlocks =
      parentBlockList instanceof Array
        ? parentBlockList.map((block, index) => (
            <option key={index} value={block.id}>
              {block.block_name}
            </option>
          ))
        : null;

    const selectPersonnel =
      allScoutPersonnel instanceof Array
        ? allScoutPersonnel.map((personnel, index) => (
            <React.Fragment key={index}>
              <option value={personnel.id}>
                {personnel.first_name} {personnel.last_name}
              </option>
            </React.Fragment>
          ))
        : null;
    return (
      <React.Fragment>
        <NewNavBar label="TRACKING REPORT" />
        <Preloader
          preloaderStyle={preloaderStyle}
          data-test="PreloaderComponent"
        />
        <form
          action=""
          className="position-absolute form-inline p-2 bg-white rounded"
          style={{ top: "70px", left: "10px", zIndex: 1 }}
          onSubmit={e => this.fetchTrackingScoutReport(e)}
        >
          <select
            className="custom-select ml-3"
            name="block"
            onChange={this.onChange}
            value={block}
          >
            <option selected>Select Block</option>
            {allBlocks}
          </select>
          <input
            type="date"
            className="form-control ml-3"
            name="date"
            value={date}
            onChange={this.onChange}
          />
          <select
            className="custom-select ml-3"
            name="created_by"
            value={created_by}
            onChange={this.onChange}
          >
            <option selected>Select scout</option>
            {selectPersonnel}
          </select>

          <button
            className="btn btn-sm btn-outline-default waves-effect mr-0 ml-3"
            type="submit"
          >
            <i className="fas fa-search mr-1"></i>Search
          </button>
        </form>
        <Tracking trackingReport={this.state.trackingReport} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  parentBlockList: state.block.parentBlockList,
  allScoutPersonnel: state.personnel.allScouts,
  trackingReport: state.scout.trackingReport,
  auth: state.auth
});
export default connect(mapStateToProps, {
  fetchParentBlock,
  fetchScouts,
  fetchTrackingReport
})(TrackingLayout);
