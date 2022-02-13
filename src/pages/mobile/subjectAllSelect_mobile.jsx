import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, FormControl, CssBaseline, Button, Paper } from "@material-ui/core";
import { getRequest, postRequest } from "../../utils/axiosRequests";
import { useDispatch } from "react-redux";
import {setforceReload,setforceReload2,setLoading } from "../../redux/actions";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useSelector } from "react-redux";
import { Scrollbars } from "react-custom-scrollbars";
import Checkbox from '@material-ui/core/Checkbox';
import { useHistory } from "react-router-dom";
import axios from 'axios'

//When there's time change it so all subjects are selected at first

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
  },
  text: {
    marginTop: 40,
    color: "white",
    textAlign: "center",
    fontSize: 14
  },
  paperRoot: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#303030",
    paddingLeft: 20,
    paddingRight: 20,
    minHeight:500,
    height: '83vh',
    width: '100%'
  },
  textSelectMajor: {
    marginTop: 20,
    marginBottom: 10,
    color: "white",
    textAlign: "center",
    fontFamily: "Signika",
    fontSize: 17,
  },
  textSelectGrade: {
    marginTop: 20,
    color: "white",
    textAlign: "center",
    fontFamily: "Signika",
    fontSize: 21,
    marginBottom: 10,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#125845"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Home() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const uuid = useSelector(state => state.setUuid);
  const [subjects, setSubjects] = React.useState([]);
  const [grade, setGrade] = React.useState(0);
  const [subjectsSelectWasFetched, setSubjectsSelectWasFetched] = React.useState(false);
  const history = useHistory();
  const goHome = () => history.push('/');

  React.useEffect(() => {
    const source = axios.CancelToken.source();
    const getSubjectsData = async () => {
      const gotSubjects = await getRequest("https://famnit-connect.herokuapp.com/programs/user/subjects/" + uuid,source)

      if (gotSubjects !== null) {
        console.log(gotSubjects, "gotSubjects")
        setSubjects(gotSubjects.data.data)
        setSubjectsSelectWasFetched(true)
        dispatch(setLoading(false))
      }
      else {
        console.log("not sucess majorSelect")
      }
    }
    if (!subjectsSelectWasFetched) {
      getSubjectsData();
    }

    return () => {
      source.cancel();
    };

  }, [subjectsSelectWasFetched, uuid, setSubjects, subjects,dispatch]);

  const handleSubjectCheck = (i) => event => {
    let subjectsTmp = subjects;
    // console.log("index: "+i)
    // console.log("before: "+subjectsTmp[i].selected)
    subjectsTmp[i].selected = !subjectsTmp[i].selected
    // console.log("event : "+event.target.value)
    // console.log("after: "+subjectsTmp[i].selected)
    setSubjects(subjectsTmp)
    setGrade(grade + 1)
  };

  function SortArray(x, y){
    if (x.course_name < y.course_name) {return -1;}
    if (x.course_name > y.course_name) {return 1;}
    return 0;
}

  const inSelectSubjects = () => {
    console.log(grade)
    return subjects.sort(SortArray).map(function (data, i) {
      return (
        <FormControlLabel
          key={i}
          control={<Checkbox disableFocusRipple style={{ color: "white" }} value={data.id} checked={data.selected} onChange={handleSubjectCheck(i)} />}
          label={data.course_name + " (" + data.group_name + ")"}
        />
      );
    });
  };

  const confirm = () => {
    let checked = []
    for (let index = 0; index < subjects.length; index++) {
      if (subjects[index].selected) {
        checked.push(subjects[index].id);
      }
    }
    console.log(checked, "checked")
    
      const postSubjects = async () => {
        const body = {
          selectedSubjects: checked,
          user_uuid: uuid
        }
        const resonse = postRequest("https://famnit-connect.herokuapp.com/programs/subjects/add", body)
        if (resonse !== null) {
          dispatch(setforceReload())
          dispatch(setforceReload2())
          console.log("Success!!")
          goHome()
        }
      }
      postSubjects()
  
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.root}>
        <Paper className={classes.paperRoot}>
          <Typography component="h5" variant="h5" className={classes.textSelectMajor}>
            SELECT ALL YOUR SUBJECTS
        </Typography>

          <Scrollbars>
            {/* Form contol for Subjects select */}
            <Paper style={{ backgroundColor: "#404040", minHeight: 640, overflowX: 'hidden' }}>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup style={{ color: "white", maxWidth: 300 }}>
                  {inSelectSubjects()}
                </FormGroup>
              </FormControl>
            </Paper>
          </Scrollbars>
          <Button variant="contained" style={{ marginTop: 20, marginBottom: 30 }} onClick={confirm}>confirm</Button>
        </Paper>
      </div>
    </Container>
  );
}
