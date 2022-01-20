import React, { useEffect, useState, useRef } from "react";
import { Typography, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CustomizedSnackbars from "../components/snackbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Scrollbars from "react-custom-scrollbars";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { replies } from "../redux/actions";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    marginTop: 50,
  },
  form: {
    position: "static",
    bottom: 0,
    marginLeft: 20,
    justifyContent: "center",
    width: "100%",
    color: "white",
    marginBottom: 2,
    marginTop: 2,
  },
  textField: {
    backgroundColor: "white",
    color: "black",
  },
  text: {
    marginTop: 40,
    marginBottom: 40,
    color: "white",
    textAlign: "center",
    fontSize: 14,
    fontFamily: "Signika",
  },
  textVarify: {
    marginTop: 10,
    color: "white",
    textAlign: "center",
    fontSize: 24,
    fontFamily: "Signika",
    marginBottom: 20,
  },
}));

const Channel = ({ db, name, collection }) => {
  console.log("name:", name);
  const classes = useStyles();
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();

  console.log("messages",messages)

  const messageList = () => {
    if (JSON.stringify(messages) === "[]") {
      return (
        <ListItem
          key={"noQuestions"}
          alignItems="flex-start"
          style={{
            display: "flex",
            justifySelf: "center",
            alignSelf: "center",
          }}
        >
          <ListItemText
            disableTypography
            primary={
              <Typography
                type="body1"
                style={{
                  fontFamily: "Signika",
                  color: "gray",
                  fontWeight: "bold",
                  marginLeft: -1,
                  textAlign: "center",
                }}
              >
                No questions yet. Be the first to ask a question!
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
                ></Typography>
              </React.Fragment>
            }
          />
        </ListItem>
      );
    }
    else{
    return messages
      .slice(0)
      .reverse()
      .map((message) => (
        <div id="forumButtons" style={{ cursor: "pointer", width: "100%" }}>
          <ListItem
            key={message.id}
            alignItems="flex-start"
            onClick={() => dispatch(replies(message.reply))}
            component={Link}
            to={`/reply/${collection}/${message.id}/${message.name}/${message.text}/${message.createdAt}`}
          >
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
                  {message.name}
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
                    {message.text}
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
                  {console.log(message)}
                  {new Date(message.createdAt).toLocaleTimeString([], {
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
          <Divider variant="inset" component="li" />
        </div>
      ));
    }
  };

  useEffect(() => {
    if (db) {
      const unsubscribe = db
        .collection(collection)
        .orderBy("createdAt")
        .limitToLast(100)
        .onSnapshot((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          console.log("data", data);
          console.log("messages: ", messages);
          setMessages(data);
        });
      return unsubscribe;
    }
  }, [db]);
  return (
    <Container
      style={{
        marginTop: 20,
        display: "block",
        justifyContent: "center",
        alignContent: "center",
        maxWidth: "55vw",
        padding:2
      }}
      component="main"
    >
      <div style={{ maxHeight: "80%" }}>
        <Scrollbars
          width={"100%"}
          autoHeight
          autoHeightMin={"70vh"}
          autoHeightMax={"70vh"}
          style={{borderRadius:6}}
        >
          <List
            sx={{
              bgcolor: "#323232",
              borderRadius: 2,
              overflow: "auto",
              marginBottom: -15,
            }}
          >
            {messageList()}
          </List>
        </Scrollbars>
      </div>
    </Container>
  );
};

export default Channel;
