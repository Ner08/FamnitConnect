import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Typography,
  Avatar,
  CssBaseline,
  Paper,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { setId } from "../../redux/actions";
import HourglassFullIcon from "@material-ui/icons/HourglassFull";
import { postRequest } from "../../utils/axiosRequests";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  paper: {
    marginTop: theme.spacing(0),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#303030",
    paddingLeft: 30,
    paddingRight: 30,
    height: 300,
    width: "95%",
  },
  text: {
    marginTop: 40,
    color: "white",
    textAlign: "center",
    fontSize: 14,
  },
  textWaiting: {
    marginTop: 10,
    color: "white",
    textAlign: "center",
    fontFamily: "Signika",
    fontSize: 35,
  },
  textInstructions: {
    marginTop: 10,
    color: "white",
    textAlign: "center",
    fontFamily: "Signika",
    fontSize: 25,
  },
  textInCase: {
    marginTop: 40,
    marginBottom: 40,
    color: "white",
    textAlign: "center",
    fontSize: 14,
    fontFamily: "Signika",
  },
  avatar: {
    margin: theme.spacing(1),
    marginTop: 20,
    backgroundColor: "#125845",
  },
  googleLogin: {
    marginTop: 40,
  },
}));

export default function Home() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const email = useSelector((state) => state.newEmail);


  React.useEffect(() => {
    const source = axios.CancelToken.source();
    const interval = setInterval(() => {
      const checkIfConfirmed = async () => {
        const confirmed = await postRequest(
          "https://famnit-connect.herokuapp.com/user-info/" + email
        );
        if (confirmed !== null) {
          console.log(confirmed);
          console.log("Success!");
          dispatch(setId(confirmed.data.user_uuid));
          clearInterval(interval);
          history.push("/")
        } else {
          console.log("Not Success!");
        }
      };
      checkIfConfirmed();
    }, 3000);
    return () => {
      clearInterval(interval);
      source.cancel();
    };
  }, [email, dispatch,history]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <HourglassFullIcon />
          </Avatar>
          <Typography
            component="h1"
            variant="h1"
            className={classes.textWaiting}
          >
            Waiting for conformation,
          </Typography>
          <Typography
            component="h3"
            variant="h3"
            className={classes.textInstructions}
          >
            Please check your email (Outlook) and click on the conformation
            link.
          </Typography>
        </Paper>
        <Typography component="h5" variant="h5" className={classes.textInCase}>
          If you can not find it please check the spam folder. If you think you
          misstyped your Famnit email adress go back and submit your Famnit
          email again.
        </Typography>
      </div>
    </Container>
  );
}
