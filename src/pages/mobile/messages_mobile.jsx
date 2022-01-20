import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Avatar, CssBaseline, Paper } from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  text: {
    marginTop: 40,
    color: "white",
    textAlign: "center",
    fontSize: 14,
    fontFamily: "Signika",
  },
  textSignIn: {
    marginTop: 10,
    color: "white",
    textAlign: "center",
    fontSize: 24,
    fontFamily: "Signika",
    marginBottom:30
  },
  avatar: {
    margin: theme.spacing(1),
    marginTop:30,
    backgroundColor: "#125845"
  },
  paper: {
    marginTop: theme.spacing(0),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#303030",
    paddingLeft: 50,
    paddingRight: 50,
    height: 235,
    width: '80%'
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.root}>
        <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockIcon />
        </Avatar>
        <Typography component="h5" variant="h5" className={classes.textSignIn}>
          SIGN IN
        </Typography>
        </Paper>
        <Typography component="h5" variant="h5" className={classes.text}>
          The purpose of this login is to check if you are a member of this university and to provide you with a more personalized experience.
        </Typography>
      </div>
    </Container>
  );
}
