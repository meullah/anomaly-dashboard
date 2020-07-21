import React from "react";
import Draggable from "react-draggable";
import { Paper, Box, Popover, Typography } from "@material-ui/core";
import MenuItemWrapper from "./MenuItemWrapper";
import Descriptionbody from "./Descriptionbody";
import Reasonbody from "./Reasonbody";
import Okbody from "./OKbody";
import Dialog from "./Dialog";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import IconButton from "@material-ui/core/IconButton";
// import Loader from "../Loader/Loader";

// const POST_API_3 = "https://jsonplaceholder.typicode.com/posts";
const POST_API_1 = "http://localhost:5000/performedAction";
const GET_NOTIFICATIONS = "http://localhost:5000/getnotifications";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

class NotificationMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      openMRS_no: null,
      anomaly_id: null,
      anomalies: [],
      arrayLength: null,
      open: false,
      openreason: false,
      openok: false,
      isLoaded: false,
      description: null,
      reason: null,
      explanation: {
        accept: null,
        pend: null,
        reject: null,
      },
      time: "",
      date: "",
    };
  }

  async componentDidMount() {
    await fetch(GET_NOTIFICATIONS)
      .then((res) => res.json())
      .then((data) => this.setState({ anomalies: data, isLoaded: true }))
      .catch((error) => console.log(error));
  }
  // getDataFromApi = () => {
  //   fetch("https://jsonplaceholder.typicode.com/posts")
  //     .then(res => res.json())
  //     .then(data => this.setState({ anomalies: data }))
  //     .catch(error => console.log(error));
  // };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = (event, value) => {
    this.setState({ anchorEl: null });
  };

  handleDialogClose = () => {
    this.setState({
      open: false,
      openreason: false,
      openok: false,
      isLoaded: false,
    });
  };

  // getDetailsData = async () => {
  //   await fetch(POST_API_2)
  //     .then((res) => res.json())
  //     .then((json) =>
  //       this.setState({
  //         description: json[0].body,
  //         isLoaded: true,
  //       })
  //     )
  //     .catch((error) => console.log(error));
  // };

  onItemClick = (num, id, description, anomalyOn, type) => {
    // this.getDetailsData();
    type = type === "SD" ? "Symptom to Diagnosis" : "Diagnosis to Procedure";
    let data = `Anomaly on => ${anomalyOn}  
Type => ${type} 
Description => ${description} `;
    console.log("Description ", this.state.anomalies);
    this.setState((st) => ({
      open: true,
      anchorEl: null,
      openMRS_no: num,
      anomaly_id: id,
      description: data,
      explanation: {
        accept: "",
        pend: "",
        reject: "",
      },
      time: new Date().toLocaleTimeString("en-US", {
        hour12: true,
        hour: "numeric",
        minute: "numeric",
      }),
      date: new Date().toLocaleDateString(),
    }));
    console.log(num);
    console.log(id);
  };

  handleAccept = () => {
    this.handleAcceptPendReject("accept");
  };

  handlePend = () => {
    this.handleAcceptPendReject("pend");
  };

  handleReject = () => {
    this.handleAcceptPendReject("reject");
  };

  handleAcceptPendReject = (name) => {
    this.setState((st) => ({
      open: false,
      isLoaded: false,
      openreason: true,
      explanation: {
        ...st.explanation,
        [name]: "true",
      },
    }));
  };

  handleSubmitChange = (event) => {
    this.setState({
      reason: event.target.value,
    });
  };

  handleSubmit = (event) => {
    this.setState(
      (st) => ({
        openreason: false,
        openok: true,
      }),
      this.postData
    );
    // this.postData();
  };

  postData = async () => {
    await fetch(POST_API_1, {
      method: "POST",
      mode: "no-cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        openMRS_no: this.state.openMRS_no,
        anomaly_id: this.state.anomaly_id,
        time: this.state.time,
        date: this.state.date,
        explanation: this.state.explanation,
        reason: this.state.reason,
      }),
    }).then((res) => {
      // if (res.status !== 200) {
      console.log(res);
      window.location.reload(false);
      // } else {
      //   res.json().then((data) => {
      //     console.log("else statement", res);
      //   });
      // }
    });
  };
  render() {
    const { anchorEl } = this.state;
    const arrayLength = this.state.anomalies.length;
    const anomalylist = this.state.anomalies.map((anomaly) => (
      <MenuItemWrapper
        onItemClick={this.onItemClick}
        id={anomaly.Patient_ID}
        number={anomaly.ID}
        description={anomaly.Description}
        anomalyOn={anomaly.Anomaly_On}
        type={anomaly.Type}
      >
        <div>
          <Box
            textAlign="justify"
            m={0}
            fontWeight="fontWeightBold"
            fontSize="caption.fontSize"
          >
            Patient MR Number :{anomaly.Patient_ID}
          </Box>
          <Box textAlign="left" m={0} lineHeight={1} fontSize={11}>
            1 Anomaly Detected
          </Box>
        </div>
      </MenuItemWrapper>
    ));
    // const { classes } = this.props;
    return (
      <div>
        <div style={{ marginLeft: "200px" }}>
          <IconButton
            onClick={this.handleClick}
            style={{ marginRight: "5px" }}
            aria-label="show 17 new notifications"
          >
            <Badge badgeContent={arrayLength} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </div>
        <Popover
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          PaperProps={{
            style: {
              width: "fit-content",
            },
          }}
        >
          <Typography component="div">
            <Box
              textAlign="left"
              m={2}
              lineHeight={1}
              fontWeight="fontWeightBold"
              fontSize="h6.fontSize"
            >
              Anomaly Notifications
            </Box>
          </Typography>
          {anomalylist}
        </Popover>

        {this.state.open && (
          <Dialog
            open={this.state.open}
            handleClose={this.handleDialogClose}
            PaperComponent={PaperComponent}
          >
            <Descriptionbody
              isLoaded={this.state.isLoaded}
              num={this.state.openMRS_no} // actulally patient ID
              time={this.state.time}
              details={this.state.description}
              date={this.state.date}
              handleChange={this.handleChange}
              handleAccept={this.handleAccept}
              handlePend={this.handlePend}
              handleReject={this.handleReject}
            />
          </Dialog>
        )}
        {this.state.openreason && (
          <Dialog
            open={this.state.openreason}
            handleClose={this.handleDialogClose}
            PaperComponent={PaperComponent}
          >
            <Reasonbody
              handleSubmitChange={this.handleSubmitChange}
              handleSubmit={this.handleSubmit}
            />
          </Dialog>
        )}
        {this.state.openok && (
          <Dialog
            open={this.state.openok}
            handleClose={this.handleDialogClose}
            PaperComponent={PaperComponent}
          >
            <Okbody handleClose={this.handleDialogClose} />
          </Dialog>
        )}
      </div>
    );
  }
}
export default NotificationMenu;
