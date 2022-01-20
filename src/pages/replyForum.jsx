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
import ReplyChannel from "../utils/replyChannel";
import SendIcon from "@mui/icons-material/Send";
import Paper from "@mui/material/Paper";
import { useDispatch } from "react-redux";
import { setforceReload3 } from "../redux/actions";
import { Typography, Container } from "@material-ui/core";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

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
  const dispatch = useDispatch();

  let params = match.params;
  const collection = params.collection;
  const document_id = params.document_id;
  const qName = params.qName;
  const qText = params.qText;
  const qCreatedAt = params.qCreatedAt;

  // firebase.firestore().collection("new-coll").add({"Hello":"World"})

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (input !== "") {
      
      dispatch(setforceReload3());

      async function add() {
        const arrayToUpdate = firebase.firestore.FieldValue.arrayUnion({
          text: input,
          createdAt: Date.now(),
          name: name,
        });
        if (db) {
          await db.collection(collection).doc(document_id).set(
            {
              reply: arrayToUpdate,
            },
            { merge: true }
          );

          setInput("");
        }
      }
      add();
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
          marginBottom: 25,
          backgroundColor: "#125845",
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 5,
          paddingBottom: 5,
        }}
      >
        {collection}
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

      <Container
        style={{
          marginBottom: 25,
          display: "block",
          justifyContent: "center",
          alignContent: "center",
          maxWidth: "55vw",
          padding: 2,
          backgroundColor: "#303030",
          borderRadius: 6,
        }}
        component="main"
      >
        <ListItem key={"replyItem"} alignItems="flex-start">
          <ListItemText
            disableTypography
            primary={
              <Typography
                type="body1"
                style={{
                  fontFamily: "Signika",
                  color: "#125845",
                  fontWeight: "bold",
                  marginLeft: -1,
                }}
              >
                {qName}
              </Typography>
            }
            secondary={
              <React.Fragment>
                <Typography
                  style={{
                    color: "white",
                    fontFamily: "Signika",
                    wordBreak: "break-all",
                    hyphens: "manual",
                    fontWeight: "normal",
                  }}
                  component="span"
                  variant="body2"
                >
                  {qText}
                </Typography>
              </React.Fragment>
            }
          />
          <ListItemText
            disableTypography
            primary={
              <Typography
                type="body1"
                style={{
                  fontFamily: "Signika",
                  color: "gray",
                  position: "absolute",
                  fontSize: 10,
                  right: 15,
                }}
              >
                {console.log("createdAt: ", qCreatedAt)}
                {new Date(parseInt(qCreatedAt)).toLocaleTimeString([], {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Typography>
            }
          />
        </ListItem>
      </Container>
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
              width: "55.2vw",
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
                  label="Reply"
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
      <ReplyChannel
        db={db}
        name={name}
        document_id={document_id}
        collection={collection}
      />
      {/* <CustomizedSnackbars onCloseEvent={onSnackbarClose} open={snackbarSuccessText.length > 0} text={snackbarSuccessText} />
    <CustomizedSnackbars onCloseEvent={onSnackbarClose} open={snackbarErrorText.length > 0} error text={snackbarErrorText} /> */}
    </div>
  );
}
