import React, { Component } from "react";
import Chart from "react-apexcharts";
import { Navbar } from "../common";

class TimeReport extends Component {
  state = {
    options: {
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      colors: ["#ff5722", "#009688", "#9c27b0", "#3f51b5"],
      yaxis: {
        min: 1,
        max: 17
      },
      xaxis: {
        type: "time",
        labels: {
          datetimeFormatter: {
            hour: "HH:mm"
          }
        }
      },
      fill: {
        colors: ["#ff5722", "#009688", "#9c27b0", "#3f51b5"]
      }
    },
    series: [
      {
        name: "BLOCK1",
        data: [
          {
            x: "Jane",
            y: [9.5, 12]
          },
          {
            x: "Lucy",
            y: [13, 14]
          },
          {
            x: "Bella",
            y: [15, 17]
          },
          {
            x: "Vicky",
            y: [10, 12]
          }
        ]
      },
      {
        name: "BLOCK2",
        data: [
          {
            x: "Jane",
            y: [8, 9]
          },
          {
            x: "Lucy",
            y: [10, 13]
          },
          {
            x: "Bella",
            y: [12, 14]
          },
          {
            x: "Vicky",
            y: [15, 16]
          }
        ]
      },
      {
        name: "BLOCK3",
        data: [
          {
            x: "Jane",
            y: [1, 4]
          },
          {
            x: "Lucy",
            y: [1, 3]
          },
          {
            x: "Bella",
            y: [2, 4]
          },
          {
            x: "Vicky",
            y: [15, 16]
          }
        ]
      }
    ]
  };
  render() {
    const { series, options } = this.state;

    return (
      <div className="components-view">
        <Navbar />
        <div class="container-fluid d-flex flex-row flex-wrap">
          <div class="col-md-12 mt-3">
            <div class="card p-3">
              <div class="d-flex">
                <h5 class="mr-auto">Time Report</h5>
                <div class="d-picker d-flex align-items-baseline justify-content-end flex-wrap ml-auto">
                  <label>Filter Date</label>
                  <input class="form-control" type="date" value="2011-08-19" />
                </div>
              </div>
              <Chart
                series={series}
                options={options}
                type="rangeBar"
                height="350"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TimeReport;
