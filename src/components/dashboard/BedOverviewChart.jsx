import React, { Component } from "react";
import PropTypes from "prop-types";
import Chart from "chart.js";

class BedOverviewChart extends Component {
  chartRef = React.createRef();
  constructor(props) {
    super(props);

    this.state = {
      myChartRef: ""
    };
  }

  componentDidMount() {
    this.setState({
      myChartRef: this.chartRef.current.getContext("2d")
    });
  }

  renderChart(prevalence) {
    // console.log(prevalence);

    const { myChartRef } = this.state;

    let labels;
    let datasets;
    if (
      typeof prevalence.issue_data !== "undefined" &&
      typeof prevalence.issue_name !== "undefined"
    ) {
      labels = prevalence.issue_data.labels;
      datasets = prevalence.issue_data.datasets;
    }

    new Chart(myChartRef, {
      // The type of chart we want to create
      type: "line",

      // The data for our dataset
      data: {
        labels: labels,
        datasets: datasets
      },

      // Configuration options go here
      options: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Score",
                fontColor: "#2196F3"
              }
            }
          ],
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Days",
                fontColor: "#2196F3"
              }
            }
          ]
        }
      }
    });
  }

  render() {
    // const { chartRef } = this.state;
    const { prevalence } = this.props;

    let prevalenceChart;

    if (prevalence.issue_name) {
      this.renderChart(prevalence);

      prevalenceChart = (
        <div data-test="BedOverviewChartComponent">
          <h4>{prevalence.issue_name}</h4>
          <div style={{ width: "700px"}}>
            <canvas id={prevalence.issue_name} ref={this.chartRef} />
          </div>
        </div>
      );
    } else {
      prevalenceChart = <div>No chart data provided</div>;
    }

    return prevalenceChart;
  }
}

BedOverviewChart.propTypes = {
  prevalence: PropTypes.object.isRequired
};

export default BedOverviewChart;
