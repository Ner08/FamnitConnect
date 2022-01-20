import React, { useEffect, useState} from "react";
import { Typography, Container } from "@material-ui/core";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Scrollbars from "react-custom-scrollbars";
import { useSelector } from "react-redux";

const ReplyChannel = ({ db, name, document_id, collection }) => {
  const [replies, setReplies] = useState([]);
  const forceReload = useSelector((state) => state.forceReload3);

  const messageList = () => {
    if (JSON.stringify(replies) === "{}") {
      return (
        <ListItem
          key={"noReplies"}
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
                No replies yet. Be the first to reply!
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
      console.log(replies);
      return replies
        .slice(0)
        .reverse()
        .map((message) => (
          <div id="forumButtons" style={{ cursor: "pointer", width: "100%" }}>
            <ListItem key={message.id} alignItems="flex-start">
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
                    {console.log(message.createdAt)}
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
    if (forceReload) {
      const docRef = db.collection(collection).doc(document_id);

      docRef
        .get("reply")
        .then((doc) => {
          if (doc.exists) {
            let data = doc.data();
            setReplies(data.reply);
            console.log("Document data:", data.reply);
          } else {
            // doc.data() will be undefined in this case
            setReplies({ data: null });
            console.log("No such document!");
          }
        })
        .catch(function (error) {
          setReplies({ data: null });
          console.log("Error getting document:", error);
        });
    } else {
      const docRef = db.collection(collection).doc(document_id);

      docRef
        .get("reply")
        .then((doc) => {
          if (doc.exists) {
            let data = doc.data();
            setReplies(data.reply);
            console.log("Document data:", data.reply);
          } else {
            // doc.data() will be undefined in this case
            setReplies({ data: null });
            console.log("No such document!");
          }
        })
        .catch(function (error) {
          setReplies({ data: null });
          console.log("Error getting document:", error);
        });
    }
  }, [db, document_id, forceReload,collection]);
  return (
    <Container
      style={{
        marginTop: 20,
        display: "block",
        justifyContent: "center",
        alignContent: "center",
        maxWidth: "55.2vw",
        padding: 2,
      }}
      component="main"
    >
      <div style={{ maxHeight: "80%" }}>
        <Scrollbars
          autoHeight
          autoHeightMin={"58vh"}
          autoHeightMax={"58vh"}
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
            {messageList()}
          </List>
        </Scrollbars>
      </div>
    </Container>
  );
};

export default ReplyChannel;
