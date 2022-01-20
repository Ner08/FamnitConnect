import React from "react";
import { makeStyles} from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import "../../fonts.css";
import Typography from "@material-ui/core/Typography";
import ForumIcon from "@material-ui/icons/Forum";
import NotesIcon from "@material-ui/icons/Notes";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setSnackbarOpen,setforceReload } from "../../redux/actions";
import { getRequest } from "../../utils/axiosRequests";
import axios from 'axios'

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    width: "95%",
    marginTop: "4vh",
    margin: "auto",
  },
  paper: {
    height: "23vh",
    textAlign: "center",
    color: "white",
    backgroundColor: "#303030",
    position: "relative",
    maxWidth:"80vw",
    margin: "auto",
  },
  subject: {
    fontSize: 15,
    paddingTop: 6,
    paddingLeft: 10,
    paddingRight: 10,
    fontFamily: "Signika",
    height: 35,
    backgroundColor: "#125845"
  },
  facultyClass: {
    fontSize: 15,
    paddingTop: 6,
    paddingLeft: 10,
    paddingRight: 10,
    fontFamily: "Signika",
    height: 35,
    color:'white',
    backgroundColor: "#575757"
  },
  lecturers: {
    fontSize: 14,
    paddingTop: 10,
    paddingLeft: "1vh",
    paddingRight: "1vh",
    height: 30,
    fontFamily: "Signika"
  },
  image: {
    width: 128,
    height: 128
  },
  forum_button: {
    cursor: "pointer",
    height: "4vh",
    width: "4vh",
    color: "#D8FFB2"
  },
  forum_button_div: {
    position: "absolute",
    bottom: 0,
    paddingLeft: "3vh",
    paddingBottom: "1.3vh"
  },
  notes_button: {
    cursor: "pointer",
    height: "5vh",
    width: "5vh",
    color: "#9dd6e9"
  },
  notes_button_div: {
    position: "absolute",
    bottom: 0,
    right: 0,
    paddingRight: "3vh",
    paddingBottom: "1vh"
  }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function Home() {
  const classes = useStyles();
  const [subjects, setSubjects] = React.useState([]);
  const uuid = useSelector(state => state.setUuid);
  const dispatch = useDispatch();
  const forceReload = useSelector(state => state.forceReload);
  const snackbarOpened = useSelector(state => state.snackBarOpened);

  React.useEffect(() => {
    console.log(forceReload)
    const source = axios.CancelToken.source();
    const source2 = axios.CancelToken.source();
    if(forceReload){
      var subjectsDataReload;
      const getSubjectDataReload = async () => {
        subjectsDataReload =await getRequest("https://famnit-connect.herokuapp.com/programs/user/selected/subjects/" + uuid, source);
        if (subjectsDataReload !== null) {
          setSubjects(subjectsDataReload.data.data);
          dispatch(setforceReload())
        }
      }
      getSubjectDataReload();
    }

    var subjectsData;
    const getSubjectData = async () => {
      subjectsData =await getRequest("https://famnit-connect.herokuapp.com/programs/user/selected/subjects/" + uuid, source2);
      if (subjectsData !== null) {
        setSubjects(subjectsData.data.data);
      }
    }
    getSubjectData();

    return () => {
      source.cancel();
      source2.cancel();
    };
   
  }, [uuid,dispatch,forceReload]);

  const inGrid = () => {
    console.log(subjects);
    
    return subjects.map(function (data) {
      if (data.course_name !== "1. Semester" &&data.course_name !== "2. Semester") {
        if(data.lecturers === "everyone"){
          return (
            <Grid key={data.id} item xs={12} sm={6} md={6} lg={3} xl={2}>
              <Paper className={classes.paper}>
                <Typography noWrap className={classes.facultyClass}>
                  {data.course_name}
                </Typography>
                <Typography noWrap className={classes.lecturers}>
                  FACULTY
                </Typography>
                <Link
                 to={`/messages/${data.course_name}`}>
                <div className={classes.forum_button_div}>
                  <ForumIcon className={classes.forum_button} />
                </div>
                </Link>
                <Link
                 to={`/notes/${data.subject_id}/${data.course_name}`}>
                <div className={classes.notes_button_div}>
                  <NotesIcon className={classes.notes_button} />
                </div>
                </Link>
              </Paper>
            </Grid>
          );
        }
        else if(data.lecturers === "1. letnik"||data.lecturers === "2. letnik"||data.lecturers === "3. letnik"){
          return (
            <Grid key={data.id} item xs={12} sm={6} md={6} lg={3} xl={2}>
              <Paper className={classes.paper}>
                <Typography noWrap className={classes.facultyClass}>
                  {data.course_name}
                </Typography>
                <Typography noWrap className={classes.lecturers}>
                  CLASS
                </Typography>
                <Link
                 to={`/messages/${data.course_name}`}>
                <div className={classes.forum_button_div}>
                  <ForumIcon className={classes.forum_button} />
                </div>
                </Link>
                <Link
                 to={`/notes/${data.subject_id}/${data.course_name}`}>
                <div className={classes.notes_button_div}>
                  <NotesIcon className={classes.notes_button} />
                </div>
                </Link>
              </Paper>
            </Grid>
          );
        }
        else{
          return (
            <Grid key={data.id} item xs={12} sm={6} md={6} lg={3} xl={2}>
              <Paper className={classes.paper}>
                <Typography noWrap className={classes.subject}>
                  {data.course_name}
                </Typography>
                <Typography noWrap className={classes.lecturers}>
                  Lecturers:
                </Typography>
                <Typography noWrap className={classes.lecturers}>
                  {data.lecturers}
                </Typography>
                <Link
                 to={`/messages/${data.course_name}`}>
                <div className={classes.forum_button_div}>
                  <ForumIcon className={classes.forum_button} />
                </div>
                </Link>
                <Link
                 to={`/notes/${data.subject_id}/${data.course_name}`}>
                <div className={classes.notes_button_div}>
                  <NotesIcon className={classes.notes_button} />
                </div>
                </Link>
              </Paper>
            </Grid>
          );
        }
      } else {
        return null;
      }
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(setSnackbarOpen());
  };

  function FormFragment() {
    return <React.Fragment>{inGrid()}</React.Fragment>;
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid container item spacing={5}>
          <FormFragment />
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        key={`bottomright`}
        open={snackbarOpened}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          style={{ backgroundColor: "#125845" }}
          onClose={handleClose}
          severity="success"
        >
          Login successfull!
        </Alert>
      </Snackbar>
    </div>
  );
}
