import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import "chartjs-plugin-doughnutlabel2";

export default class DChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        labels: ["Accepted", "Pending", "Rejected"],
        datasets: [
          {
            label: "# of Likes",
            data: [12, 19, 3],
            backgroundColor: ["#2E5BFF", "#2CC2A5", "#8C54FF"],
            hoverBorderColor: ["#2E5BFF", "#2CC2A5", "#8C54FF"],
            hoverBorderWidth: 2,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          display: false,
        },
        cutoutPercentage: 60,
        plugins: {
          doughnutlabel: {
            labels: [
              {
                text: "102",
                font: {
                  size: "150",
                  family: "Poppins",
                  weight: "bold",
                },
              },
              {
                text: "Anomalies",
                font: {
                  size: "60",
                },
              },
            ],
          },
        },
      },
    };
  }
  componentDidMount() {
    fetch(this.props.url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.data);
        let perviousStates = this.state.data.datasets[0];
        perviousStates.data = data.data;
        let sum = data.data.reduce((a, b) => a + b, 0);
        let options = this.state.options.plugins.doughnutlabel.labels[0];
        options.text = sum.toString();
        // this.setState({ perviousStates });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return <Doughnut data={this.state.data} options={this.state.options} />;
  }
}
