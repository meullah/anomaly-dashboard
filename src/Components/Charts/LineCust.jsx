import React, { Component } from "react";
import { Line } from "react-chartjs-2";

export default class LineCust extends Component {
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
            label: "My First dataset",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40, 80, 81, 56, 55, 100],
          },
        ],
      },
    };
  }

  options = {
    maintainAspectRatio: false,
    responsive: true,
    legend: {
      display: false,
    },
  };

  componentDidMount() {
    fetch(this.props.url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // let perviousStates = this.state.data.datasets[0];
        // perviousStates.data = ;
        // this.setState({ perviousStates });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <Line data={this.state.data} options={this.options} height="215%" />
      </div>
    );
  }
}
