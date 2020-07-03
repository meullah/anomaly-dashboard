import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import PatientsCards from "../Cards/PatientDelailsCards";
// import Select from "react-select";
// import LineCust from "../Charts/LineCust";
// import BarStacked from "../Charts/BarStacked";
import ChartCard from "../Cards/ChartCard";

export default class doctorsChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: [
        {
          visit_id: "",
          start_date: "",
          end_date: "",
          diagnosis: [],
          providers: [],
          services: [],
          symptoms: [],
        },
      ],
    };
    console.log("props of patient screen", props);
  }
  componentDidMount() {
    fetch(`http://localhost:5000/PER/patient_id/${this.props.patient_id}`)
      .then((res) => res.json())
      .then((data) => {
        // if (data !== "none" && data !== "null") {
        console.log("data of patient", data);
        // }
        if (data === "none" || data === null) {
          let temp = [
            {
              visit_id: "",
              start_date: "",
              end_date: "",
              diagnosis: [],
              providers: [],
              services: [],
              symptoms: [],
            },
          ];
          this.setState({ post: temp });
          console.log("if statement", data);
        } else {
          console.log("else statement", data);
          this.setState({ post: data });
        }
      })
      .catch((error) => console.log(error));
  }

  render() {
    const cards = this.state.post.map((p) => {
      return (
        <PatientsCards
          visit_id={p.visit_id}
          start_date={p.start_date}
          end_date={p.end_date}
          // amount="27000"
          diagnosis={p.diagnosis.toString()}
          providers={p.providers.toString()}
          services={p.services.toString()}
          notes={p.symptoms.toString()}
        />
      );
    });
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
        {cards}
      </div>
    );
  }
}
