import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";

// import Select from "react-select";
// import LineCust from "../Charts/LineCust";
// import BarStacked from "../Charts/BarStacked";
import ChartCard from "../Cards/ChartCard";

export default class doctorsChart extends Component {
  constructor(props) {
    super(props);
    console.log("props of patient screen", props);
  }
  componentDidUpdate(pp) {
    console.log(this.props.patient_id);
  }

  render() {
    return (
      <div style={{ padding: "15px", marginTop: "40px" }}>
        <CssBaseline />
        <div style={{ marginLeft: "20px", marginRight: "20px" }}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <ChartCard
                title="Patient"
                url={`http://localhost:5000/PDSA/uuid/${this.props.patient_id}`}
                chart="patient_line"
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
                title="Diagnosis To Procedure Anomaly"
                url={`http://localhost:5000/PDSA/uuid/${this.props.patient_id}`}
                chart="stackedBarData_1"
              />
            </Grid>

            <Grid item xs={6}>
              <ChartCard
                title="Symptom To Diagnosis Anomaly"
                url={`http://localhost:5000/PSDA/uuid/${this.props.patient_id}`}
                chart="stackedBarData_2"
              />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}
