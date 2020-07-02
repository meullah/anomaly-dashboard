import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import ChartCard from "../Cards/ChartCard";

export default class doctorsChart extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ padding: "15px", marginTop: "40px" }}>
        <CssBaseline />
        <div style={{ marginLeft: "20px", marginRight: "20px" }}>
          <Grid container spacing={1}>
            <Grid item xs={8}>
              <ChartCard
                title="Percentage Anomalies"
                chart="BarGrouped"
                url="http://localhost:5000/HMA"
              />
            </Grid>

            <Grid item xs={4}>
              <ChartCard
                title="Total Anomalies"
                url="http://localhost:5000/HTA"
                chart="DChart"
              />
            </Grid>
          </Grid>
        </div>
        <div
          style={{
            marginTop: "5px",
            marginLeft: "20px",
            marginRight: "20px",
          }}
        >
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <ChartCard
                title="Symptom to Diagnosis Anomalies"
                url="http://localhost:5000/HSDA"
                chart="stackedBarData_1"
              />
            </Grid>

            <Grid item xs={6}>
              <ChartCard
                title="Disgnosis to Procedure Anomalies"
                url="http://localhost:5000/HDPA"
                chart="stackedBarData_2"
              />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}
