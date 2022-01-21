import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  IconButton,
  CssBaseline,
  Toolbar,
  Typography,
  Collapse,
  Grid,
  Button,
  CircularProgress
} from "@material-ui/core";
import "../fonts.css";
import SettingsIcon from "@material-ui/icons/Settings";
import { Link } from "react-router-dom";
import DrawerContent from "./drawerContent";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setSnackbarOpen, setSettingsOpen, setId, email, setLoading,setMajors,setMajorGrade, setSubjetsSet } from "../redux/actions";

const drawerWidth = 350;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: "#125845"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    background: "#303030",
    color: "white"
  },
  subjectText: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
    fontFamily: "Krona One"
  },
  titleText: {
    color: "white",
    fontSize: 23,
    marginLeft: 10,
    fontFamily: "Krona One",
    cursor: "pointer"
  },
  titleText2: {
    color: "black",
    fontSize: 16,
    marginLeft: 5,
    marginTop: 7,
    fontFamily: "Signika"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  toolbar: {
    marginBottom: 27
  },
  nested: {
    display: "flex",
    flexDirection: "row",
    paddingLeft: theme.spacing(4)
  },
  buttonSettings: {
    width: '25%',
    marginLeft: 200,
    color: 'white'
  },
  gridBackgroundSettings: {
    backgroundColor: '#303030'
  },
  progressBar: {
    position: "absolute",
    right: 180,
    top: 16,
    color: 'white'
  },
}));

export default function 
ClippedDrawer(props) {
  const classes = useStyles();
  const dispatcher = useDispatch();
  const settingsOpened = useSelector(state => state.settingsOpened);
  const loading = useSelector(state => state.setLoading);

  const history = useHistory();

  const goDrawerSelect = () => {
    dispatcher(setSettingsOpen(false));
    history.push('/grade_select');
  }

  const goAllSubjectsSelect = () => {
    console.log("url: " + window.location.pathname)
    dispatcher(setSettingsOpen(false));
    if (window.location.pathname !== "/all_subjects_seleect") {
      dispatcher(setLoading(true))
      history.push('/all_subjects_seleect');
    }
  }
  const goAbout = () => {
    dispatcher(setSettingsOpen(false));
    history.push('/about');
  }

  const handleClick = () => {
    dispatcher(setSettingsOpen());

  };

  const signOut = () => {
    dispatcher(email(null));
    dispatcher(setId(null));
    dispatcher(setSettingsOpen(false));
    dispatcher(setSnackbarOpen(false));
    dispatcher(setSubjetsSet([]))
    dispatcher(setMajorGrade(null))
    dispatcher(setMajors(null))
    localStorage.removeItem("email")
  }
  const progressBar = () => {
    if (loading) {
      return <CircularProgress size={30} thickness={4} className={classes.progressBar} />
    }
    else return null
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Collapse in={settingsOpened} timeout="auto" unmountOnExit>
          <Grid container style={{ backgroundColor: '#202020' }} spacing={0}>
            <Grid item xs={3} sm={3}>
              <Button onClick={goAbout} fullWidth style={{ fontFamily: "Signika", color: "white" }}>About</Button>
            </Grid>
            <Grid item xs={3} sm={3}>
              <Button onClick={goDrawerSelect} fullWidth style={{ fontFamily: "Signika", color: "white" }}>Select your grade</Button>
            </Grid>
            <Grid item xs={3} sm={3}>
              <Button onClick={goAllSubjectsSelect} fullWidth style={{ fontFamily: "Signika", color: "white" }}>Select all your subjects</Button>
            </Grid>
            <Grid item xs={3} sm={3}>
              <Button onClick={signOut} fullWidth style={{ fontFamily: "Signika", color: "white" }}>Sign out</Button>
            </Grid>
          </Grid>
        </Collapse>
        <Toolbar>
          <Typography className={classes.titleText} variant="h6" noWrap>
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              FamnitConnect
            </Link>
          </Typography>
          <Typography className={classes.titleText2} variant="h6" noWrap>
            WEB
          </Typography>

          {progressBar()}

          <Link
            style={{ color: "white", position: "absolute", right: "75px", textDecoration: "none"  }}
            to="/timetable">
            <Button
              style={{ color: "white", textDecoration: "none" }}>
              Timetable
          </Button>
          </Link>
          <IconButton
            onClick={handleClick}
            style={{
              position: "absolute",
              right: "15px",
              color: "white"
            }}
            aria-label="settings">
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DrawerContent />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}
