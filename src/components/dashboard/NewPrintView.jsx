import React, { Component } from "react";
import FilterPrint from "./FilterPrint";
import { Preloader } from "../common";

class NewPrintView extends Component {
  state = {
    showcomponent: false
  };

  showComponent = () => {
    const { showcomponent } = this.state;
    this.setState({
      showcomponent: !showcomponent
    });
  };

  getStationIcon = (alert) => {
    const icon =
      alert === "Success" ? (
        <img
          src={require("../../assets/img/okay.svg")}
          alt="nothing"
          onMouseOver={() => this.showComponent()}
          // onMouseOut={() => this.showComponent}
        />
      ) : alert === "Danger" ? (
        <img src={require("../../assets/svg/danger.svg")} alt="danger" />
      ) : alert === "Warning" ? (
        <img src={require("../../assets/svg/warning.svg")} alt="warning" />
      ) : (
        ""
      );

    return icon;
  };

  render() {
    const {
      printReport,
      blockName,
      _id,
      search_variety,
      search_issue,
      search_scout,
      search_date,
      allVariety,
      allIssues,
      allScouts,
      preloaderStyle
    } = this.props;

    const { showcomponent } = this.state;

    // LEFT PRINT SIDE
    let LeftSide =
      printReport instanceof Array
        ? printReport
            .filter(bed => {
              const BLK = bed.bed_block_name.split(" ");
              return BLK[1].toLowerCase() === "left";
            })
            .map((bed, index) => (
              <div className="bed-row d-flex align-items-center" key={index}>
                <div className="bed-no ">{bed.bed_number}</div>
                <div className="stations ">
                  {bed.stations
                    ? bed.stations.map((station, index) => (
                        <div className="station" key={index}>
                          I{this.getStationIcon(station.alert, station.id)}
                        </div>
                      ))
                    : null}
                </div>
                <div className="variety ">{bed.variety}</div>
              </div>
            ))
        : null;

    // RIGHTSIDE
    let RightSide =
      printReport instanceof Array
        ? printReport

            .filter(bed => {
              const BLK = bed.bed_block_name.split(" ");
              return BLK[1].toLowerCase() === "right";
            })
            .map((bed, index) => (
              <div className="bed-row d-flex align-items-center" key={index}>
                <div className="bed-no ">{bed.bed_number}</div>
                <div className="stations ">
                  {bed.stations
                    ? bed.stations.map((station, index) => (
                        <div className="station" key={index}>
                          I{this.getStationIcon(station.alert)}
                        </div>
                      ))
                    : null}
                </div>
                <div className="variety ">{bed.variety}</div>
              </div>
            ))
        : null;

    return (
      <div
        className="modal fade"
        id={"printView" + _id}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLongTitle"
        aria-hidden="true"
      >
        {/* {showcomponent && <p>hehehehehehehe</p>} */}
        <Preloader preloaderStyle={preloaderStyle} />
        <div className="modal-dialog min-w-100" role="document">
          <div className="modal-content min-h-100">
            <div className="modal-header d-flex align-items-center">
              <h5 className="modal-title" id="exampleModalLongTitle">
                {blockName}
              </h5>
              {/* FILTER */}
              <FilterPrint
                search_variety={search_variety}
                search_issue={search_issue}
                search_scout={search_scout}
                search_date={search_date}
                onChange={this.props.onChange}
                allVariety={allVariety}
                allIssues={allIssues}
                allScouts={allScouts}
                _id={_id}
                handlePreloaderStyle={this.props.handlePreloaderStyle}
              />
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="beds-print-container">
                <div className="col-md-12 d-flex justify-content-center ">
                  <div className="symbols-menu d-flex justify-content-around ">
                    <div>
                      <img
                        src={require("../../assets/img/okay.svg")}
                        alt="okay"
                      />
                      Okay
                    </div>
                    <div>
                      <img
                        src={require("../../assets/img/warning.svg")}
                        alt="warning"
                      />
                      Warning
                    </div>
                    <div>
                      <img
                        src={require("../../assets/img/danger.svg")}
                        alt="danger"
                      />
                      Danger
                    </div>
                  </div>
                </div>

                <div className="col-md-12 print-block">
                  <div className="w-50 position-absolute flex-column">
                    {LeftSide}
                  </div>
                  <div className="w-50 position-absolute r-0 d-flex flex-column">
                    {RightSide}
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger rounded-0"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewPrintView;
