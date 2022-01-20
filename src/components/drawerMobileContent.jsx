import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  ListSubheader,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import ForumIcon from "@material-ui/icons/Forum";
import "../fonts.css";
import NotesIcon from "@material-ui/icons/Notes";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import SchoolIcon from "@material-ui/icons/School";
import { Scrollbars } from "react-custom-scrollbars";
import { useSelector } from "react-redux";
import { getRequest } from "../utils/axiosRequests";
import { useDispatch } from "react-redux";
import {
  setforceReload2,
  setforceReload4,
  setDrawerStatus,
  setDrawerStatusSettings,
  setLoading,
  setSnackbarOpen,
  setId,
  email,
  setMajors,
  setMajorGrade,
  setSubjetsSet,
} from "../redux/actions";
import AccountBalanceTwoToneIcon from "@material-ui/icons/AccountBalanceTwoTone";
import GroupIcon from "@material-ui/icons/Group";
import axios from "axios";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import SettingsIcon from "@material-ui/icons/Settings";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { useHistory } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

const drawerWidth = 350;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    background: "#303030",
    color: "white",
  },
  subjectSubheader: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
    fontFamily: "Krona One",
  },
  toolbar: {
    marginBottom: 62,
    display: "inline-block",
  },
  subjects: {
    fontFamily: "Signika",
  },
}));

export default function DrawerContent(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = React.useState([]);
  const [force, setForce] = React.useState(0);
  const uuid = useSelector((state) => state.setUuid);
  const [subjects, setSubjects] = React.useState([]);
  const forceReload = useSelector((state) => state.forceReload2);
  const drawer_status = useSelector((state) => state.drawerStatus);
  const drawer_status_setting = useSelector(
    (state) => state.drawerSettingsStatus
  );

  const handleClick = (i) => {
    open[i] = open[i] === undefined ? true : !open[i];
    setOpen(open);
    setForce(force + 1);
  };

  const drawerClose = () => {
    dispatch(setDrawerStatus());
  };
  const drawerSettingsClose = () => {
    dispatch(setDrawerStatusSettings());
  };

  const drawerSettingsExit = () => {
    dispatch(setDrawerStatusSettings());
    dispatch(setDrawerStatus());
  };

  const forceReload4Function = () => {
    dispatch(setforceReload4());
    dispatch(setDrawerStatus());
  };

  const goDrawerSelect = () => {
    dispatch(setDrawerStatusSettings());
    dispatch(setDrawerStatus());
    history.push("/grade_select");
  };

  const goAllSubjectsSelect = () => {
    console.log("url: " + window.location.pathname);
    dispatch(setDrawerStatusSettings());
    dispatch(setDrawerStatus());
    if (window.location.pathname !== "/all_subjects_seleect") {
      dispatch(setLoading(true));
      history.push("/all_subjects_seleect");
    }
  };

  const goAbout = () => {
    dispatch(setDrawerStatusSettings());
    dispatch(setDrawerStatus());
    history.push("/about");
  };

  const signOut = () => {
    dispatch(email(null));
    dispatch(setId(null));
    dispatch(setSnackbarOpen(false));
    dispatch(setSubjetsSet([]));
    dispatch(setMajorGrade(null));
    dispatch(setMajors(null));
    dispatch(setDrawerStatusSettings());
    dispatch(setDrawerStatus());
  };

  React.useEffect(() => {
    console.log(forceReload);
    const source = axios.CancelToken.source();
    const source2 = axios.CancelToken.source();
    if (forceReload) {
      var subjectsDataReload;
      const getSubjectDataReload = async () => {
        subjectsDataReload = await getRequest(
          "https://famnit-connect.herokuapp.com/programs/user/selected/subjects/" +
            uuid,
          source
        );
        if (subjectsDataReload !== null) {
          console.log("here");
          setSubjects(subjectsDataReload.data.data);
          dispatch(setforceReload2());
        }
      };
      getSubjectDataReload();
    }

    var subjectsData;
    const getSubjectData = async () => {
      subjectsData = await getRequest(
        "https://famnit-connect.herokuapp.com/programs/user/selected/subjects/" +
          uuid,
        source2
      );
      if (subjectsData !== null) {
        setSubjects(subjectsData.data.data);
        console.log(subjectsData);
      }
    };
    getSubjectData();

    return () => {
      source.cancel();
      source2.cancel();
    };
  }, [uuid, dispatch, forceReload]);

  const inDrawer = () => {
    return subjects.map(function (data, i) {
      if (data.course_name === "1. Semester") {
        return (
          <ListSubheader
            className={classes.subjectSubheader}
            component="div"
            id="nested-list-subheader"
            key={data.id.toString() + "semester1"}
          >
            1. SEMESTER:
          </ListSubheader>
        );
      }
      if (data.course_name === "2. Semester") {
        return (
          <ListSubheader
            className={classes.subjectSubheader}
            component="div"
            id="nested-list-subheader"
            key={data.id.toString() + "semester2"}
          >
            2. SEMESTER:
          </ListSubheader>
        );
      } else if (data.lecturers === "everyone") {
        return (
          <div key={data.id}>
            <ListItem button onClick={() => handleClick(i)}>
              <ListItemIcon>
                <AccountBalanceTwoToneIcon
                  style={{ marginLeft: 5, color: "white" }}
                />
              </ListItemIcon>
              <ListItemText
                className={classes.subjects}
                primary={data.course_name}
              />
              {open[i] === true ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open[i] === true} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem
                  button
                  component={Link}
                  to={`/messages/${data.course_name}`}
                  onClick={forceReload4Function}
                  className={classes.nested}
                >
                  <ListItemIcon>
                    <ForumIcon style={{ color: "#D8FFB2", marginLeft: 20 }} />
                  </ListItemIcon>
                  <ListItemText
                    className={classes.subjects}
                    style={{ color: "white", marginLeft: 20 }}
                    primary={`Chatroom`}
                  />
                </ListItem>
                <ListItem
                  button
                  component={Link}
                  onClick={drawerClose}
                  to={`/notes/${data.subject_id}/${data.course_name}`}
                  className={classes.nested}
                >
                  <ListItemIcon>
                    <NotesIcon style={{ color: "#9dd6e9", marginLeft: 20 }} />
                  </ListItemIcon>
                  <ListItemText
                    style={{ color: "white", marginLeft: 20 }}
                    primary={`Notes`}
                  />
                </ListItem>
              </List>
            </Collapse>
          </div>
        );
      } else if (
        data.lecturers === "1. letnik" ||
        data.lecturers === "2. letnik" ||
        data.lecturers === "3. letnik"
      ) {
        return (
          <div key={data.id}>
            <ListItem button onClick={() => handleClick(i)}>
              <ListItemIcon>
                <GroupIcon style={{ marginLeft: 5, color: "white" }} />
              </ListItemIcon>
              <ListItemText
                className={classes.subjects}
                primary={data.course_name}
              />
              {open[i] === true ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open[i] === true} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem
                  button
                  component={Link}
                  to={`/messages/${data.course_name}`}
                  className={classes.nested}
                  onClick={forceReload4Function}
                >
                  <ListItemIcon>
                    <ForumIcon style={{ color: "#D8FFB2", marginLeft: 20 }} />
                  </ListItemIcon>
                  <ListItemText
                    className={classes.subjects}
                    style={{ color: "white", marginLeft: 20 }}
                    primary={`Chatroom`}
                  />
                </ListItem>
                <ListItem
                  button
                  component={Link}
                  to={`/notes/${data.subject_id}/${data.course_name}`}
                  className={classes.nested}
                  onClick={drawerClose}
                >
                  <ListItemIcon>
                    <NotesIcon style={{ color: "#9dd6e9", marginLeft: 20 }} />
                  </ListItemIcon>
                  <ListItemText
                    style={{ color: "white", marginLeft: 20 }}
                    primary={`Notes`}
                  />
                </ListItem>
              </List>
            </Collapse>
          </div>
        );
      } else {
        return (
          <div key={data.id}>
            <ListItem button onClick={() => handleClick(i)}>
              <ListItemIcon>
                <SchoolIcon style={{ marginLeft: 5, color: "white" }} />
              </ListItemIcon>
              <ListItemText
                className={classes.subjects}
                primary={data.course_name}
              />
              {open[i] === true ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open[i] === true} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem
                  button
                  component={Link}
                  to={`/messages/${data.course_name}`}
                  onClick={forceReload4Function}
                  className={classes.nested}
                >
                  <ListItemIcon>
                    <ForumIcon style={{ color: "#D8FFB2", marginLeft: 20 }} />
                  </ListItemIcon>
                  <ListItemText
                    className={classes.subjects}
                    style={{ color: "white", marginLeft: 20 }}
                    primary={`Chatroom`}
                  />
                </ListItem>
                <ListItem
                  button
                  component={Link}
                  to={`/notes/${data.subject_id}/${data.course_name}`}
                  className={classes.nested}
                  onClick={drawerClose}
                >
                  <ListItemIcon>
                    <NotesIcon style={{ color: "#9dd6e9", marginLeft: 20 }} />
                  </ListItemIcon>
                  <ListItemText
                    style={{ color: "white", marginLeft: 20 }}
                    primary={`Notes`}
                  />
                </ListItem>
              </List>
            </Collapse>
          </div>
        );
      }
    });
  };

  return (
    <div>
      <Drawer
        className={classes.drawer}
        anchor={"left"}
        open={drawer_status_setting}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Stack
          direction="row"
          spacing={7}
          justifyContent="flex-end"
          alignContent="center"
          fontSize="large"
          style={{ paddingTop: 3 }}
        >
          <IconButton
            style={{ color: "white", marginRight: 10 }}
            aria-label="add an alarm"
            onClick={drawerSettingsExit}
          >
            <CloseIcon fontSize="large" />
          </IconButton>
        </Stack>
        <List>
          <ListItem>
            <Button
              variant="outlined"
              onClick={signOut}
              fullWidth
              style={{
                fontFamily: "Signika",
                color: "white",
                fontSize: 16,
                borderColor: "#D3D3D3",
              }}
            >
              Sign out
            </Button>
          </ListItem>
          <ListItem>
            <Button
              variant="outlined"
              onClick={goDrawerSelect}
              fullWidth
              style={{
                fontFamily: "Signika",
                color: "white",
                fontSize: 16,
                borderColor: "#D3D3D3",
              }}
            >
              Select your grade
            </Button>
          </ListItem>
          <ListItem>
            <Button
              variant="outlined"
              onClick={goAllSubjectsSelect}
              fullWidth
              style={{
                fontFamily: "Signika",
                color: "white",
                fontSize: 16,
                borderColor: "#D3D3D3",
              }}
            >
              Select all subjects
            </Button>
          </ListItem>
          <ListItem>
            <Button
              variant="outlined"
              onClick={goAbout}
              fullWidth
              style={{
                fontFamily: "Signika",
                color: "white",
                fontSize: 16,
                borderColor: "#D3D3D3",
              }}
            >
              About
            </Button>
          </ListItem>
        </List>
      </Drawer>
      <Drawer
        className={classes.drawer}
        anchor={"left"}
        open={drawer_status}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Stack
          direction="row"
          spacing={7}
          justifyContent="center"
          alignContent="center"
          fontSize="large"
          style={{ paddingTop: 5, paddingBottom: 5 }}
        >
          <IconButton
            onClick={drawerSettingsClose}
            style={{ color: "white" }}
            aria-label="add an alarm"
          >
            <SettingsIcon />
          </IconButton>
          <Link
            style={{
              textDecoration: "none",
            }}
            to="/timetable"
            onClick={drawerClose}
          >
            <Button
              variant="contained"
              style={{
                color: "black",
                fontFamily: "Krona One",
                fontSize: 10,
                height: 30,
                marginTop: 5,
              }}
              aria-label="calander"
            >
              Timetable
            </Button>
          </Link>
          <IconButton
            style={{ color: "white" }}
            aria-label="back"
            onClick={drawerClose}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
        </Stack>
        <Divider
          light
          style={{
            backgroundColor: "#404040",
            color: "white",
            marginBottom: 2,
          }}
        />
        <Scrollbars autoHide>
          <List
            key={"list"}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader
                className={classes.subjectSubheader}
                component="div"
                id="nested-list-subheader"
                disableSticky
                key={"sub"}
              >
                YOUR SUBJECTS:
              </ListSubheader>
            }
          >
            <Divider
              light
              style={{
                backgroundColor: "#404040",
                color: "white",
                marginBottom: 2,
              }}
            />
            {inDrawer()}
          </List>
        </Scrollbars>
      </Drawer>
    </div>
  );
}
