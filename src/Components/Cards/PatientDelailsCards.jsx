import React, { Component } from "react";
import { Grid, Typography, Card, Box } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";

class CustomCard extends Component {
  render() {
    return (
      <div>
        <Card style={{ margin: "5px" }}>
          <CardContent>
            <Grid container>
              <Grid item xs={12}>
                <Typography
                  component="div"
                  variant="h6"
                  style={{ marginLeft: "8px", textDecoration: "underline" }}
                >
                  <Box textAlign="center" fontWeight="fontWeightBold" m={1}>
                    Visit ID : {this.props.visit_id}
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  component="div"
                  variant="subtitle1"
                  style={{ marginLeft: "8px" }}
                >
                  <Box display="inline" fontWeight="fontWeightBold">
                    Date:{" "}
                  </Box>
                  {this.props.start_date} - {this.props.end_date}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography
                  component="div"
                  variant="subtitle1"
                  style={{ marginRight: "8px" }}
                >
                  <Box display="inline" fontWeight="fontWeightBold">
                    Amount:
                  </Box>{" "}
                  <Box
                    display="inline"
                    fontStyle="italic"
                    fontWeight="fontWeightBold"
                    style={{ textDecoration: "underline" }}
                  >
                    RS {this.props.amount} /-
                  </Box>{" "}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography
                  component="div"
                  variant="subtitle1"
                  style={{ marginLeft: "8px" }}
                >
                  <Box display="inline" fontWeight="fontWeightBold">
                    Diagnosis:
                  </Box>{" "}
                  {this.props.diagnosis}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography
                  component="div"
                  variant="subtitle1"
                  style={{ marginRight: "8px" }}
                >
                  <Box display="inline" fontWeight="fontWeightBold">
                    Providers:
                  </Box>{" "}
                  {this.props.providers}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography
                  component="div"
                  variant="subtitle1"
                  style={{ marginLeft: "8px" }}
                >
                  <Box display="inline" fontWeight="fontWeightBold">
                    Services:
                  </Box>{" "}
                  {this.props.services}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography
                  component="div"
                  variant="subtitle1"
                  style={{ marginLeft: "8px", marginRight: "8px" }}
                >
                  <Box display="inline" fontWeight="fontWeightBold">
                    Symptoms:
                  </Box>{" "}
                  {this.props.notes}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default CustomCard;
