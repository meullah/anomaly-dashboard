import React, { Component } from "react";
import { Typography, Card, CardContent } from "@material-ui/core";
import BarStacked from "../Charts/BarStacked";
import BarGrouped from "../Charts/BarGrouped";
import DChart from "../Charts/Doughnut";
import LineCust from "../Charts/LineCust";

export default class ChartChart extends Component {
  // constructor(props) {
  //   super(props);
  // }
  componentDidMount() {
    console.log("props of BrrChart: ", this.props.url);
  }
  render() {
    return (
      <Card>
        <CardContent>
          <Typography align="left" variant="h6">
            {this.props.title}
          </Typography>
          {this.props.chart === "BarGrouped" && (
            <BarGrouped url={this.props.url} />
          )}
          {this.props.chart === "DChart" && <DChart url={this.props.url} />}
          {this.props.chart === "stackedBarData_1" && (
            <BarStacked url={this.props.url} />
          )}
          {this.props.chart === "stackedBarData_2" && (
            <BarStacked url={this.props.url} />
          )}
          {this.props.chart === "patient_line" && (
            <LineCust url={this.props.url} />
          )}
        </CardContent>
      </Card>
    );
  }
}
