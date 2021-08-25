import React, { Component } from "react";
import PropTypes from "prop-types";

import { Preloader } from "../common";
import { InputFields } from "../common";

class Entries extends Component {
  state = {
    preloaderStyle: "d-block",
    showPointDetails: false,
    search_date: "",
    defaultEntryId: "",
    bed_id: ""
  };

  handlePreloaderStyle = newStyle => {
    this.setState({ preloaderStyle: newStyle });
  };

  componentDidMount() {
    // this.handlePreloaderStyle("d-block");
    setTimeout(() => this.handlePreloaderStyle("d-none"), 1000);
  }

  onEntryClick = (entry_id, bed) => {
    console.log('I am clicked');
    this.setState({
      showPointDetails: true
    });
    const { date } = this.props;
    console.log(date);
    this.searchEntry(entry_id, bed, date);
  };

  searchEntry = (entry_id, bed, search_date) => {
    this.props.onEntryClick(entry_id, bed, search_date);
  };

  render() {
    const { preloaderStyle, showPointDetails } = this.state;
    const {
      bedReport,
      entryReport,
      entryName,
      bed_id,
      date,
      search_date,
      defaultEntryId
    } = this.props;

    const state_search_date = this.state.search_date;
    const state_defaultEntryId = this.state.defaultEntryId;
    const state_bed_id = this.state.bed_id;

    if (defaultEntryId !== "" && bed_id !== "" && search_date !== "") {
      if (
        defaultEntryId !== state_defaultEntryId &&
        bed_id !== state_bed_id &&
        search_date !== state_search_date
      ) {
        this.setState({
          search_date,
          defaultEntryId,
          bed_id
        });

        this.searchEntry(defaultEntryId, bed_id, search_date);
      }
    }

    // mapping for stations
    const entryTolerance =
      bedReport instanceof Array
        ? bedReport.map(entry => (
            <div
              key={entry.entry_id}
              onClick={() => {
                this.onEntryClick(entry.entry_id, bed_id);
              }}
              className={
                entry.alert &&
                (entry.alert === "Danger"
                  ? "entry d-flex align-items-center justify-content-center bg-danger glow"
                  : "entry d-flex align-items-center justify-content-center bg-" +
                    entry.alert.toLowerCase())
              }
            >
              {entry.entry_name}
            </div>
          ))
        : null;

    // mapping for points
    const allPoints =
      entryReport instanceof Array
        ? entryReport.map(
            (point, index) =>
              point.alert && (
                <React.Fragment key={index}>
                  <div className="sect card">
                    <div
                      className={
                        "point text-white bg-" + point.alert.toLowerCase()
                      }
                    >
                      {point.point_name}
                    </div>

                    <div className="row2 d-flex flex-row">
                      <div className="card-item">
                        Issue Type:<span>{point.issue_type_name}</span>
                      </div>
                      <div className="card-item">
                        Issue:<span>{point.issue_name}</span>
                      </div>
                      <div className="card-item">
                        Issue Category:<span>{point.issue_category}</span>
                      </div>
                    </div>
                    <div className="row2 d-flex flex-row">
                      <div className="card-item">
                        Scoring Value:<span>{point.value}</span>
                      </div>
                      <div className="card-item">
                        Scoring:<span>{point.scoring}</span>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              )
          )
        : null;

    return (
      <div className="bed-view" data-test="EntriesComponent">
        {/* <Navbar /> */}
        <Preloader preloaderStyle={preloaderStyle} />
        <nav className="d-flex justify-content-around">
          <div className="nav nav-tabs " id="nav-tab" role="tablist">
            <a
              className="nav-item nav-link active"
              id="bedView-tab"
              data-toggle="tab"
              href="#bedView"
              role="tab"
              aria-controls="bedView"
              aria-selected="true"
            >
              Bed View
            </a>
          </div>
        </nav>
        <div className="tab-content" id="nav-tabContent">
          <div
            className="tab-pane fade show active"
            id="bedView"
            role="tabpanel"
            aria-labelledby="bedView-tab"
          >
            <div className="container-fluid">
              <div className="bed-container d-flex flex-wrap justify-content-between">
                <div className="col-md-8">
                  <div className="d-flex flex-column">
                    <form
                      className="card search-container"
                      onSubmit={e => this.props.onBedFilter(e)}
                    >
                      {/* SCOUTING DATE */}
                      <label className="mr-4">Filter Date</label>
                      <InputFields
                        type="date"
                        name="date"
                        onChange={this.props.onChange}
                        placeholder="Select Date"
                        value={date}
                      />
                      {/* BED ID */}
                      <input
                        value={bed_id || ""}
                        name="bed_id"
                        hidden
                        onChange={this.props.onChange}
                      ></input>
                      <button
                        type="submit"
                        className="btn btn-sm btn-outline-default waves-effect mr-0"
                      >
                        Filter
                      </button>
                    </form>

                    <div className="points-container">
                      <div className="card d-flex justify-content-center align-text-center">
                        <div className="entry-sect">
                          <h6 className="d-flex justify-content-center mt-3">
                            {entryName}
                          </h6>
                          {showPointDetails && allPoints}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="card entries-container d-flex flex-column">
                    <h6 className="d-flex justify-content-center mt-3">
                      STATIONS
                    </h6>
                    {entryTolerance}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Entries.propTypes = {
  bedReport: PropTypes.array,
  entryReport: PropTypes.array,
  bedDates: PropTypes.array,
  bed_id: PropTypes.string,
  entryName: PropTypes.string,
  date: PropTypes.string,
  search_date: PropTypes.string.isRequired,
  prevalence: PropTypes.object,
  defaultEntryId: PropTypes.string,
  defaultBedId: PropTypes.string
};

export default Entries;
