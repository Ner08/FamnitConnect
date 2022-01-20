import React from "react";
import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton,
  DayView,
  AppointmentForm,
  AppointmentTooltip,
  ViewSwitcher,
} from "@devexpress/dx-react-scheduler-material-ui";
import {
  MuiThemeProvider,
  createTheme,
  withStyles,
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import PersonIcon from "@material-ui/icons/Person";
import Room from "@material-ui/icons/Room";
import { getCalanderData } from "../../utils/getCalendarData";
import { postRequest } from "../../utils/axiosRequests";
import Alert from "@mui/material/Alert";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

const style = ({ palette }) => ({
  icon: {
    color: palette.action.active,
  },
  textCenter: {
    textAlign: "center",
  },
  firstRoom: {
    background:
      "url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/Lobby-4.jpg)",
  },
  secondRoom: {
    background:
      "url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/MeetingRoom-4.jpg)",
  },
  thirdRoom: {
    background:
      "url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/MeetingRoom-0.jpg)",
  },
  header: {
    height: "260px",
    backgroundSize: "cover",
  },
  commandButton: {
    backgroundColor: "rgba(255,255,255,0.65)",
  },
});

const theme2 = createTheme({
  palette: {
    primary: {
      main: "#FFFFFF",
    },
    contrastThreshold: 3,
    type: "dark",
    background: {
      default: "#202020",
      paper: "#202020",
    },
    tonalOffset: 0.2,
  },
});

const messages = {
  moreInformationLabel: "",
};

const TextEditor = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  if (props.type === "multilineTextEditor") {
    return null;
  }
  return <AppointmentForm.TextEditor {...props} />;
};

const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }) => {
  const onCustomFieldChange = (nextValue) => {
    onFieldChange({ lecturers: nextValue });
  };
  const onCustomFieldChange2 = (nextValue2) => {
    onFieldChange({ location: nextValue2 });
  };
  return (
    <AppointmentForm.BasicLayout
      appointmentData={appointmentData}
      onFieldChange={onFieldChange}
      {...restProps}
    >
      <AppointmentForm.Label text="Lecturer" type="title" />
      <AppointmentForm.TextEditor
        value={appointmentData.lecturers}
        onValueChange={onCustomFieldChange}
        placeholder="Name"
      />

      <AppointmentForm.Label text="Classroom" type="title" />
      <AppointmentForm.TextEditor
        value={appointmentData.location}
        onValueChange={onCustomFieldChange2}
        placeholder="Classroom"
      />
    </AppointmentForm.BasicLayout>
  );
};

// In case of only one color of apointments (also some code a bit lover "appointmentComponent")

const Appointment = ({ children, style, ...restProps }) => (
  <Appointments.Appointment
    {...restProps}
    style={{
      ...style,
      backgroundColor: "#888888",
      borderRadius: "8px",
    }}
  >
    {children}
  </Appointments.Appointment>
);

const Content = withStyles(style, { name: "Content" })(
  ({ children, appointmentData, classes, ...restProps }) => (
    <AppointmentTooltip.Content
      {...restProps}
      appointmentData={appointmentData}
    >
      <Grid container alignItems="center">
        <Grid item xs={2} className={classes.textCenter}>
          <Room className={classes.icon} />
        </Grid>
        <Grid item xs={10}>
          <span>{appointmentData.location}</span>
        </Grid>
        <Grid item xs={2} className={classes.textCenter}>
          <PersonIcon className={classes.icon} />
        </Grid>
        <Grid item xs={10}>
          <span>{appointmentData.lecturers}</span>
        </Grid>
      </Grid>
    </AppointmentTooltip.Content>
  )
);

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    var today = new Date();

    this.state = {
      data: [{}],
      currentDate: today,
      varVisibility: "hidden",
    };

    this.currentDateChange = (currentDate) => {
      this.componentDidMount(currentDate);
      this.setState({ currentDate });
    };

    this.commitChanges = this.commitChanges.bind(this);
    this.changeVar = this.changeVar.bind(this);
  }

  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;

      if (changed) {
        console.log("Change event isn't implemented");
        this.setState({ varVisibility: "visible" });
        return { data };
      }
      if (deleted !== undefined) {
        console.log("Deleting an event isn't implemented");
        this.setState({ varVisibility: "visible" });
        return { data };
      }
      if (added) {
        if (added.allDay === true) {
          console.log("full day events aren't implemented");
          this.setState({ varVisibility: "visible" });
        } else {
          if (added.rRule !== undefined) {
            console.log("repeate events aren't implemented");
            this.setState({ varVisibility: "visible" });
          } else {
            const postCustomScheduleEvent = async () => {
              const body = {
                user_uuid: this.props.uuid,
                date_to: added.endDate.toLocaleTimeString(),
                date_from: added.startDate.toLocaleTimeString(),
                name: added.title,
                classroom: added.location,
                lecturer: added.lecturers,
                date: added.endDate.toLocaleDateString(),
              };

              const resonse = postRequest(
                "https://famnit-connect.herokuapp.com/schedule/user/custom",
                body
              );

              if (resonse !== null) {
                console.log("New custom schedule event added");
              }
            };
            postCustomScheduleEvent();
            const startingAddedId =
              data.length > 0 ? data[data.length - 1].id + 1 : 0;
            data = [...data, { id: startingAddedId, ...added }];
          }
        }
      }
      return { data };
    });
  }

  changeVar () {
    this.setState({ varVisibility: "hidden" });
  }

  async componentDidMount(currentDate) {
    if (currentDate === undefined) {
      currentDate = new Date();
    }
    const timetableData = await getCalanderData(currentDate, this.props.uuid);
    console.log(timetableData);
    this.setState({
      data: timetableData,
    });
  }

  render() {
    const { data, currentDate, varVisibility } = this.state;

    return (
      <div style={{marginLeft:-24, marginRight:-24}}>
        <IconButton aria-label="delete" size="small" style={{
            position: "fixed",
            bottom: 17,
            right: 24,
            zIndex: 3,
            visibility: varVisibility,
            color:"white"
          }} onClick={this.changeVar}>
          <CloseIcon/>
        </IconButton>
        <Alert
          severity="error"
          variant="filled"
          style={{
            position: "fixed",
            bottom: 10,
            right: 20,
            zIndex: 2,
            fontFamily: "Signika",
            paddingRight:35,
            visibility: varVisibility,
          }}
        >
          This function is not implemented (AllDay/Repeat/Delete/Change)
        </Alert>
        <MuiThemeProvider theme={theme2}>
          <Scheduler firstDayOfWeek={1} data={data}>
            <ViewState
              currentDate={currentDate}
              onCurrentDateChange={this.currentDateChange}
              defaultCurrentViewName="Day"
            />
            <EditingState onCommitChanges={this.commitChanges} />
            <IntegratedEditing />
            <WeekView startDayHour={8} endDayHour={19} excludedDays={[0, 6]} />
            <DayView startDayHour={8} endDayHour={19} />
            <Toolbar />
            <ViewSwitcher />
            <DateNavigator />

            <TodayButton />
            <Appointments appointmentComponent={Appointment} />
            <AppointmentTooltip
              contentComponent={Content}
              showCloseButton
              showOpenButton
            />
            <AppointmentForm
              basicLayoutComponent={BasicLayout}
              textEditorComponent={TextEditor}
              messages={messages}
            />
          </Scheduler>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
