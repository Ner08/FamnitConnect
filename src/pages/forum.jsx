import React from "react";
import {
  makeStyles,
  ThemeProvider,
  createTheme,
} from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Button, TextField } from "@material-ui/core";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import Channel from "../utils/messagesChannel.jsx";
import SendIcon from "@mui/icons-material/Send";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "98%",
    marginTop: 50,
    marginLeft: "auto",
    marginRight: "auto",
  },
  paper: {
    border: 20,
    height: 155,
    textAlign: "center",
    color: "white",
    borderColor: "white",
    backgroundColor: "#383838",
    position: "relative",
    borderRadius: 5,
  },
  paperEnterNote: {
    position: "fixed",
    right: "2vh",
    bottom: 65,
    backgroundColor: "#DCDCDC",
    width: 340,
    height: 280,
    textAlign: "center",
    fontFamily: "Krona One",
  },
  button: {
    height: "100%",
    width: "100%",
    textAlign: "center",
    color: "white",
    backgroundColor: "#383838",
    position: "relative",
  },
  title: {
    display: "inline-block",
    color: "white",
    textAlign: "center",
    fontFamily: "Signika",
    fontSize: 27,
    marginBottom: 35,
    backgroundColor: "#125845",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 5,
  },
  notesText: {
    color: "black",
    fontSize: 16,
    marginLeft: 5,
    marginTop: 7,
    fontFamily: "Signika",
  },
  fab: {
    position: "fixed",
    right: "1vh",
    bottom: 10,
  },
  notesButton: {
    marginTop: 20,
    backgroundColor: "#686868",
    color: "white",
  },
  addNoteDiv: {
    display: "block",
  },
  textfieldOutline: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "white",
    width: 320,
    borderRadius: 4,
  },
  facultyClass: {
    fontSize: 14,
    fontFamily: "Signika",
    color: "white",
  },
  textField: {
    backgroundColor: "white",
    color: "black",
  },
}));

const firebaseConfig = {
  apiKey: "AIzaSyDdLf6tD5Q3edWFtSocqNFwV7qKrc1czI8",
  authDomain: "famnitconnect-web.firebaseapp.com",
  projectId: "famnitconnect-web",
  storageBucket: "famnitconnect-web.appspot.com",
  messagingSenderId: "662440450613",
  appId: "1:662440450613:web:e7f29cf6f0cdea0f87af7c",
  measurementId: "G-JMQHJDB7GX",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default function Home({ match }) {
  const classes = useStyles();
  const [input, setInput] = React.useState("");
  const name = useSelector((state) => state.setNickname);
  const [forceReload,setForceReload] = React.useState(false)
  const { subjectName } = useParams();

  // const source = axios.CancelToken.source();

  // firebase.firestore().collection("new-coll").add({"Hello":"World"})

  const handleOnSubmit = (e) => {
    e.preventDefault();

    // INSERT COLLECTIONS TO FIREBASE

    // const getSubjectsData = async () => {
    //   const gotSubjects = await getRequest("https://famnit-connect.herokuapp.com/programs/user/subjects/" + uuid,source)
    //   if (gotSubjects !== null) {
    //     gotSubjects.data.data.map((obj) =>
    //     firebase.firestore().collection(obj.course_name).add({"":""}))
    //     console.log("gotSubjects", gotSubjects)
    //   }
    //   else {
    //     console.log("firebase insert failed")
    //   }

    // }
    // getSubjectsData();

    if (input !== "") {
      async function add() {
        if (db) {
          await db.collection(subjectName).add({
            text: input,
            createdAt: Date.now(),
            name: name,
            reply: {},
          });
          setInput("");
        }
      }
      add();
      setForceReload(!forceReload);
    }
  };
  const theme = createTheme({
    palette: {
      primary: {
        main: "#125845",
      },
      secondary: {
        main: "#125845",
      },
    },
  });

  return (
    <div
      style={{
        width: "98%",
        marginTop: 50,
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <CssBaseline />
      <Paper
        style={{
          display: "inline-block",
          color: "white",
          textAlign: "center",
          fontFamily: "Signika",
          fontSize: 27,
          marginBottom: 35,
          backgroundColor: "#125845",
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 5,
          paddingBottom: 5,
        }}
      >
        {subjectName}
        <span
          style={{
            color: "black",
            fontSize: 16,
            marginLeft: 5,
            marginTop: 7,
            fontFamily: "Signika",
          }}
        >
          {" "}
          CHATROOM
        </span>
      </Paper>
      <form noValidate>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "55vw",
              padding: 2,
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <div style={{ width: "100%" }}>
              <ThemeProvider theme={theme}>
                <TextField
                  InputProps={{
                    className: classes.textField,
                  }}
                  variant="outlined"
                  required
                  fullWidth
                  value={input}
                  id="mInput"
                  label="Question"
                  name="input"
                  size="small"
                  onKeyPress={(ev) => {
                    console.log(`Pressed keyCode ${ev.key}`);
                    if (ev.key === "Enter") {
                      ev.preventDefault();
                      handleOnSubmit(ev);
                    }
                  }}
                  onChange={(e) => setInput(e.target.value)}
                />
              </ThemeProvider>
            </div>
            <div>
              <Button
                variant="contained"
                style={{ height: 40, paddingLeft: 30 }}
                startIcon={<SendIcon />}
                onClick={handleOnSubmit}
              ></Button>
            </div>
          </div>
          {/* <CustomizedSnackbars onCloseEvent={onSnackbarClose} open={snackbarSuccessText.length > 0} text="Sent" />
                    <CustomizedSnackbars onCloseEvent={onSnackbarClose} open={snackbarErrorText.length > 0} error text={snackbarErrorText} /> */}
        </div>
      </form>
      <Channel db={db} name={name} key={subjectName+""+JSON.stringify(forceReload)} collection={subjectName} />
      {/* <CustomizedSnackbars onCloseEvent={onSnackbarClose} open={snackbarSuccessText.length > 0} text={snackbarSuccessText} />
    <CustomizedSnackbars onCloseEvent={onSnackbarClose} open={snackbarErrorText.length > 0} error text={snackbarErrorText} /> */}
    </div>
  );
}
