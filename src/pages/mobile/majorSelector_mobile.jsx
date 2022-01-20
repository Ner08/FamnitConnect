import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CssBaseline,
  Button,
  Paper,
  Divider
} from "@material-ui/core";
import { getRequest, postRequest } from "../../utils/axiosRequests";
import { useDispatch } from "react-redux";
import {
  setMajorGrade,
  setMajors,
  setSubjetsSet,
  setforceReload,
  setforceReload2,
} from "../../redux/actions";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useSelector } from "react-redux";
import Checkbox from "@material-ui/core/Checkbox";
import { useHistory } from "react-router-dom";
import axios from "axios";
import InputBase from "@material-ui/core/InputBase";
import { Scrollbars } from "react-custom-scrollbars";

//When there's time change it so all subjects are selected at first

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(2),
      width: "55vw",
      maxWidth: 300,
      margin: "auto",
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: "white",
    border: "1px solid #ced4da",
    color: "black",
    width: "100%",
    fontSize: 16,
    padding: "5px 10px 5px 5px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#5050505",
      backgroundColor: "white",
      boxShadow: "0 0 0 0.2rem #125845",
      color: "black",
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "8vh",
    margin: "auto",
  },
  text: {
    marginTop: 40,
    color: "white",
    textAlign: "center",
    fontSize: 14,
  },
  paperRoot: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#303030",
    paddingLeft: 20,
    paddingRight: 20,
    minHeight: 500,
    height: "74vh",
    maxWidth: 400,
    margin:"auto"
  },
  textSelectMajor: {
    marginTop: 20,
    color: "white",
    textAlign: "center",
    fontFamily: "Signika",
    fontSize: 18,
    marginBottom: 0,
  },
  textSelectGrade: {
    marginTop: 10,
    color: "white",
    textAlign: "center",
    fontFamily: "Signika",
    fontSize: 18,
    marginBottom: 0,
  },
  textSelectSubjects: {
    marginTop: 10,
    color: "white",
    textAlign: "center",
    fontFamily: "Signika",
    fontSize: 18,
    marginBottom: 20,
  },
  formControl: {
    margin: theme.spacing(1),
    marginTop: 0,
    maxWidth: "75vw",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  paperSubjects: {
    height: "100%",
    backgroundColor: "#404040",
    overflowX: "hidden",
  },
}));

export default function Home() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const uuid = useSelector((state) => state.setUuid);
  const [major, setMajor] = React.useState("");
  const [subjects, setSubjects] = React.useState([]);
  const [selectedSubjects, setSelectedSubjects] = React.useState([]);
  const [grade, setGrade] = React.useState("");
  const inputLabel = React.useRef(null);
  const labelWidth = 0;
  const [majorsSelect, setMajorsSelect] = React.useState([]);
  const [majorID, setmajorID] = React.useState("");
  const [numOfYears, setNumOfYears] = React.useState(0);
  const [majorsSelectWasFetched, setmajorsSelectWasFetched] =
    React.useState(false);
  const [checkedSubjects, setCheckedSubjects] = React.useState([]);
  const history = useHistory();
  const goHome = () => history.push("/");

  React.useEffect(() => {
    var subjectsData;
    const source = axios.CancelToken.source();
    const getMajorsData = async () => {
      subjectsData = await getRequest(
        "https://famnit-connect.herokuapp.com/programs/programs/list",
        source
      );
      console.log(subjectsData, "check");
      if (subjectsData !== null) {
        setMajorsSelect(subjectsData.data.data);
        setmajorsSelectWasFetched(true);
      } else {
        console.log("not sucess majorSelect");
      }
    };
    console.log(majorsSelect, "majorSelect");
    if (!majorsSelectWasFetched) {
      getMajorsData();
    }
    return () => {
      source.cancel();
    };
  }, [majorsSelect, majorsSelectWasFetched]);

  const handleChange = (event) => {
    setMajor(event.target.value);
    setGrade("");
    setSubjects([]);
    setCheckedSubjects([]);
    setSelectedSubjects([]);
    for (let index = 0; index < majorsSelect.length; index++) {
      if (majorsSelect[index].label === event.target.value) {
        setNumOfYears(majorsSelect[index].years);
        setmajorID(majorsSelect[index].id);
        console.log("id= " + majorID + " years= " + numOfYears);
      }
    }
  };
  const handleChangeGrade = async (event) => {
    const gotSubjects = await getRequest(
      "https://famnit-connect.herokuapp.com/programs/subjects/list?year=" +
        event.target.value +
        "&program_id=" +
        majorID
    );
    console.log(gotSubjects, "gotSubjects");
    setSubjects(gotSubjects.data.data);
    setGrade(event.target.value);
    setChecked();
    setSelectedSubjects([]);
  };

  const setChecked = () => {
    let arrayChecked = [];
    for (let index = 0; index < subjects.length; index++) {
      arrayChecked[index] = false;
      setCheckedSubjects(arrayChecked);
    }
  };

  const handleSubjectCheck = (id) => (event) => {
    let subjects = selectedSubjects;
    let checked = true;
    let deleteElement;
    for (let index = 0; index < selectedSubjects.length; index++) {
      if (selectedSubjects[index] === id) {
        checked = false;
        deleteElement = index;
      }
    }
    if (checked) {
      subjects.push(id);
      setSelectedSubjects(subjects);
    } else {
      subjects.splice(deleteElement, 1);
      setSelectedSubjects(subjects);
    }
    console.log(selectedSubjects, "subjectsSelect");
  };

  const inSelectMajor = () => {
    return majorsSelect.map(function (data, i) {
      return (
        <MenuItem key={data.id} value={data.label}>
          {data.label}
        </MenuItem>
      );
    });
  };

  const inSelectGrade = () => {
    const items = [];
    for (let index = 1; index <= numOfYears; index++) {
      items.push(
        <MenuItem key={index} value={index}>{`${index}. Letnik`}</MenuItem>
      );
    }
    console.log(grade);
    return items;
  };

  const inSelectSubjects = () => {
    return subjects.map(function (data, i) {
      return (
        <div>
        <FormControlLabel
          key={i}
          control={
            <Checkbox
              style={{ color: "white",}}
              value={data.id}
              checked={checkedSubjects[i]}
              onChange={handleSubjectCheck(data.id)}
            />
          }
          label={<Typography variant="body2" >{data.course_name + " (" + data.group_name + ")"}</Typography>}
        />
        <Divider
          style={{
            marginBottom: 2,
            marginTop:2,
          }}
        />
        </div>
      );
    });
  };

  const confirm = () => {
    if (selectedSubjects.length > 0) {
      console.log("sucess");
      const postSubjects = async () => {
        const body = {
          selectedSubjects: selectedSubjects,
          user_uuid: uuid,
        };
        const body2 = {
          user_uuid: uuid,
          program_id: majorID,
          year: grade,
        };

        const resonse = postRequest(
          "https://famnit-connect.herokuapp.com/programs/subjects/add",
          body
        );
        const response2 = postRequest(
          "https://famnit-connect.herokuapp.com/programs/programs/add",
          body2
        );
        if (resonse !== null && response2 !== null) {
          dispatch(setMajors(majorID));
          dispatch(setMajorGrade(grade));
          dispatch(setSubjetsSet(selectedSubjects));
          dispatch(setforceReload());
          dispatch(setforceReload2());
          console.log("Success!!");
          goHome();
        }
      };
      postSubjects();
    } else {
      console.log("Not Selected!");
    }
  };

  return (
    <Container component="main" style={{ width: "80vw" }}>
      <CssBaseline />
      <div className={classes.root}>
        <Paper className={classes.paperRoot}>
          <Typography
            component="h5"
            variant="h5"
            className={classes.textSelectMajor}
          >
            SELECT YOUR MAJOR
          </Typography>

          {/* Form contol for MAJOR select */}

          <FormControl className={classes.formControl}>
            <InputLabel
              style={{ color: "#5050505" }}
              id="select_major"
            ></InputLabel>
            <Select
              labelId="select_major"
              id="select_major"
              value={major}
              onChange={handleChange}
              labelWidth={labelWidth}
              input={<BootstrapInput />}
            >
              {inSelectMajor()}
            </Select>
          </FormControl>

          <Typography
            component="h5"
            variant="h5"
            className={classes.textSelectGrade}
          >
            SELECT YOR GRADE
          </Typography>

          {/* Form contol for GRADE select */}

          <FormControl className={classes.formControl}>
            <InputLabel ref={inputLabel} id="select_grade"></InputLabel>
            <Select
              labelId="select_grade"
              id="select_grade"
              value={grade}
              onChange={handleChangeGrade}
              labelWidth={labelWidth}
              input={<BootstrapInput />}
            >
              {inSelectGrade()}
            </Select>
          </FormControl>
          <Typography
            component="h5"
            variant="h5"
            className={classes.textSelectSubjects}
          >
            SELECT YOR SUBJECTS
          </Typography>
          <Scrollbars>
            <Paper className={classes.paperSubjects}>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup style={{ color: "white", maxWidth: 300}}>
                  {inSelectSubjects()}
                </FormGroup>
              </FormControl>
            </Paper>
          </Scrollbars>
          <Button
            variant="contained"
            style={{ marginTop: 20, marginBottom: 20 }}
            onClick={confirm}
          >
            confirm
          </Button>
        </Paper>
      </div>
    </Container>
  );
}
