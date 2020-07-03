import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import PatientAnomalyDashboard from "./Components/Screens/PatientAnomalyDashboard";
import ProvidersAnomalyDashboard from "./Components/Screens/ProvidersAnomalyDashboard";
import NavBar from "./Components/NavBar/NavBar";
import axios from "axios";
import "./styles.css";

export default function App() {
  const [patient_id, set_patient_id] = useState(null);

  const patient_id_changed = (handle) => {
    set_patient_id(handle.target.value);
    // return <PatientAnomalyDashboard patient_id={handle.target.value} />;
  };

  useEffect(() => {
    async function getData() {
      const res_patient_ids = await axios.get(
        "http://localhost:5000/generateanomalies"
      );
      console.log("anomalies generated", res_patient_ids);
    }
    getData();
  }, []);

  return (
    <div className="App" style={{ height: "100%" }}>
      <NavBar callback_func={patient_id_changed} />
      <Switch>
        <Route exact path="/" component={ProvidersAnomalyDashboard} />
        <Route exact path="/home" component={ProvidersAnomalyDashboard} />
        <Route
          exact
          path="/patientanomalydashboard"
          component={() => <PatientAnomalyDashboard patient_id={patient_id} />}
        />
      </Switch>
    </div>
  );
}
