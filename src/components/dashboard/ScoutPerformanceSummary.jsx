import React, { Component } from "react";

class ScoutPerformanceSummary extends Component {
  state = {};
  render() {
    return (
      <section className="d-flex flex-column col-md-12 pb-2 mb-2 db-section">
        <h5 className="text-center text-theme">Personnel Perfomance</h5>
        <div className="d-flex">
          <div className="bg-white p-4 d-flex flex-column mr-4">
            <div className="d-flex justify-content-between">
              <h3>Michael Wakeru</h3>
              <img
                src={require("../../assets/img/increase.svg")}
                height="30"
                alt="increase"
              />
            </div>
            <p>3000 stations - 13/02/2020 - 2.5 Min @ bed</p>
            <p>3400 stations - 12/02/2020 - 3 Min @ bed</p>
            <p>3480 stations - 11/02/2020 - 2.9 Min @ bed</p>
          </div>
          <div className="bg-white p-4 d-flex flex-column mr-4">
            <div className="d-flex justify-content-between">
              <h3>Grace Nduta</h3>
              <img
                src={require("../../assets/img/decrease.svg")}
                height="30"
                alt="decrease"
              />
            </div>
            <p>3000 stations - 13/02/2020 - 2.8 Min @ bed</p>
            <p>2400 stations - 12/02/2020 - 3 Min @ bed</p>
            <p>2380 stations - 11/02/2020 - 2.9 Min @ bed</p>
          </div>
          <div className="bg-white p-4 d-flex flex-column mr-4">
            <div className="d-flex justify-content-between">
              <h3>Patricia Kanana</h3>
              <img
                src={require("../../assets/img/neutral.svg")}
                height="30"
                alt="neutral"
              />
            </div>
            <p>3000 stations - 13/02/2020 - 2.7 Min @ bed</p>
            <p>3000 stations - 12/02/2020 - 3.2 Min @ bed</p>
            <p>3000 stations - 11/02/2020 - 1.9 Min @ bed</p>
          </div>
          <div className="bg-white p-4 d-flex flex-column mr-4">
            <div className="d-flex justify-content-between">
              <h3>William Onsare</h3>
              <img
                src={require("../../assets/img/decrease.svg")}
                height="30"
                alt="decrease"
              />
            </div>
            <p>2000 stations - 13/02/2020 - 2.5 Min @ bed</p>
            <p>1400 stations - 12/02/2020 - 3.1 Min @ bed</p>
            <p>680 stations - 11/02/2020 - 3.9 Min @ bed</p>
          </div>
        </div>
      </section>
    );
  }
}

export default ScoutPerformanceSummary;
