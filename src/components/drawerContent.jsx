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
import { setforceReload2, setforceReload4 } from "../redux/actions";
import AccountBalanceTwoToneIcon from "@material-ui/icons/AccountBalanceTwoTone";
import GroupIcon from "@material-ui/icons/Group";
import axios from "axios";

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
  },
  subjects: {
    fontFamily: "Signika",
  },
}));

export default function DrawerContent(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState([]);
  const [force, setForce] = React.useState(0);
  const uuid = useSelector((state) => state.setUuid);
  const [subjects, setSubjects] = React.useState([]);
  const forceReload = useSelector((state) => state.forceReload2);

  const handleClick = (i) => {
    open[i] = open[i] === undefined ? true : !open[i];
    setOpen(open);
    setForce(force + 1);
  };

  const forceReload4Function = () => {
    dispatch(setforceReload4());
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
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.toolbar} />
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
  );
}
