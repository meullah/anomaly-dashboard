import React, { Component } from "react";
// import "chartjs-top-round-bar";
// import "./Chart.roundedBarCharts";
import { Bar } from "react-chartjs-2";

export default class BarGrouped extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        labels: [
          "JAN",
          "FEB",
          "MAR",
          "APR",
          "MAY",
          "JUN",
          "JUL",
          "AUG",
          "SEP",
          "OCT",
          "NOV",
          "DEC",
        ],
        datasets: [
          {
            label: "Accepted",
            backgroundColor: "#2E5BFF",
            borderColor: "#2E5BFF",
            borderWidth: 0.3,
            barThickness: "flex",
            hoverBackgroundColor: "#2E5BFF",
            hoverBorderColor: "#2E5BFF",
            data: [],
          },

          {
            label: "Pending",
            backgroundColor: "#2CC2A5",
            borderColor: "#2CC2A5",
            borderWidth: 0.3,
            barThickness: "flex",
            hoverBackgroundColor: "#2CC2A5",
            hoverBorderColor: "#2CC2A5",
            data: [],
          },

          {
            label: "Rejected",
            backgroundColor: "#8C54FF",
            borderColor: "#8C54FF",
            borderWidth: 0.3,
            barThickness: "flex",
            hoverBackgroundColor: "#8C54FF",
            hoverBorderColor: "#8C54FF",
            data: [],
          },
        ],
      },
    };
  }

  options = {
    responsive: true,
    maintainAspectRatio: false,
    cornerRadius: 80,
    barValueSpacing: 10,
    legend: {
      display: false,
    },
    type: "bar",
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  componentDidMount() {
    fetch(this.props.url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let perviousStates = this.state.data;
        let s1 = perviousStates.datasets[0];
        let s2 = perviousStates.datasets[1];
        let s3 = perviousStates.datasets[2];
        s1.data = data.data.accepted_anomalies;
        s2.data = data.data.pended_anomalies;
        s3.data = data.data.rejected_anomalies;
        this.setState({ perviousStates });
      })
      .catch((error) => {
        console.log(error);
      });

    fetch("http://localhost:5000/generateanomalies")
      .then((response) => {
        return response.json();
      })
      .then((data) => {})
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <Bar data={this.state.data} options={this.options} height="215%" />
      </div>
    );
  }
}
