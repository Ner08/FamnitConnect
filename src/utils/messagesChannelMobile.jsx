import React, { useEffect, useState } from "react";
import { Typography, Container } from "@material-ui/core";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Scrollbars from "react-custom-scrollbars";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { replies } from "../redux/actions";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

const Channel = ({ db, name, collection }) => {
  console.log("name:", name);
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  console.log("window dimensions", windowDimensions);
  console.log("messages", messages);

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
    } else {
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
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    if (db) {
      db.collection(collection)
        .orderBy("createdAt")
        .limitToLast(100)
        .get()
        .then((querySnapshot) => {
          const tempDoc = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          console.log(tempDoc);
          console.log("data", tempDoc);
          setMessages(tempDoc);
          console.log("messages: ", messages);
        });
    }
    return () => window.removeEventListener("resize", handleResize);
  }, [db, collection, messages]);
  return (
    <Container
    keyboardShouldPersistTaps={'handled'}
      style={{
        marginTop: "2vh",
        display: "block",
        justifyContent: "center",
        alignContent: "center",
        maxWidth: "90vw",
        padding: 2,
      }}
      component="main"
    >
      <div style={{ maxHeight: "80%" }}>
        <Scrollbars
          width={"100%"}
          autoHeight
          autoHeightMin={(windowDimensions.height>645) ? "71vh" : "60vh"}
          autoHeightMax={(windowDimensions.height>645) ? "71vh" : "60vh"}
          style={{ borderRadius: 6 }}
        >
          <List
            sx={{
              bgcolor: "#323232",
              borderRadius: 2,
              overflow: "auto",
              marginBottom: -15,
            }}
          >
            <div id="forumButtons" style={{ cursor: "pointer", width: "100%" }}>
              <ListItem key={"1"} alignItems="flex-start">
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
                      "TEST"
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
                        "Hello guys how are you doing im doing fine have a good
                        day"
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
                      {"10:23, 8.9.2022"}
                    </Typography>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </div>
            <div id="forumButtons" style={{ cursor: "pointer", width: "100%" }}>
              <ListItem key={"1"} alignItems="flex-start">
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
                      "TEST"
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
                        "Hello guys how are you doing im doing fine have a good
                        day"
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
                      {"10:23, 8.9.2022"}
                    </Typography>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </div>
            <div id="forumButtons" style={{ cursor: "pointer", width: "100%" }}>
              <ListItem key={"1"} alignItems="flex-start">
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
                      "TEST"
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
                        "Hello guys how are you doing im doing fine have a good
                        day"
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
                      {"10:23, 8.9.2022"}
                    </Typography>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </div>
            <div id="forumButtons" style={{ cursor: "pointer", width: "100%" }}>
              <ListItem key={"1"} alignItems="flex-start">
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
                      "TEST"
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
                        "Hello guys how are you doing im doing fine have a good
                        day"
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
                      {"10:23, 8.9.2022"}
                    </Typography>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </div>
            <div id="forumButtons" style={{ cursor: "pointer", width: "100%" }}>
              <ListItem key={"1"} alignItems="flex-start">
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
                      "TEST"
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
                        "Hello guys how are you doing im doing fine have a good
                        day"
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
                      {"10:23, 8.9.2022"}
                    </Typography>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </div>
            <div id="forumButtons" style={{ cursor: "pointer", width: "100%" }}>
              <ListItem key={"1"} alignItems="flex-start">
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
                      "TEST"
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
                        "Hello guys how are you doing im doing fine have a good
                        day"
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
                      {"10:23, 8.9.2022"}
                    </Typography>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </div>
            <div id="forumButtons" style={{ cursor: "pointer", width: "100%" }}>
              <ListItem key={"1"} alignItems="flex-start">
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
                      "TEST"
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
                        "Hello guys how are you doing im doing fine have a good
                        day"
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
                      {"10:23, 8.9.2022"}
                    </Typography>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </div>
            <div id="forumButtons" style={{ cursor: "pointer", width: "100%" }}>
              <ListItem key={"1"} alignItems="flex-start">
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
                      "TEST"
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
                        "Hello guys how are you doing im doing fine have a good
                        day"
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
                      {"10:23, 8.9.2022"}
                    </Typography>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </div>
            <div id="forumButtons" style={{ cursor: "pointer", width: "100%" }}>
              <ListItem key={"1"} alignItems="flex-start">
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
                      "TEST"
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
                        "Hello guys how are you doing im doing fine have a good
                        day"
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
                      {"10:23, 8.9.2022"}
                    </Typography>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </div>
            <div id="forumButtons" style={{ cursor: "pointer", width: "100%" }}>
              <ListItem key={"1"} alignItems="flex-start">
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
                      "TEST"
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
                        "Hello guys how are you doing im doing fine have a good
                        day"
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
                      {"10:23, 8.9.2022"}
                    </Typography>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </div>
            <div id="forumButtons" style={{ cursor: "pointer", width: "100%" }}>
              <ListItem key={"1"} alignItems="flex-start">
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
                      "TEST"
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
                        "Hello guys how are you doing im doing fine have a good
                        day"
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
                      {"10:23, 8.9.2022"}
                    </Typography>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </div>
            {/* {messageList()} */}
          </List>
        </Scrollbars>
      </div>
    </Container>
  );
};

export default Channel;
