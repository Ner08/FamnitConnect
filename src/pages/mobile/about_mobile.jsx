import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, CssBaseline, Paper } from "@material-ui/core";

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
    height: 240,
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
  textDeveloped: {
    marginTop: 30,
    color: "white",
    textAlign: "center",
    fontFamily: "Signika",
    fontSize: 25,
  },
  textEnd: {
    marginTop: 40,
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Signika",
  },
  textName: {
    marginTop: 40,
    color: "white",
    textAlign: "center",
    fontSize: 18,
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
  textGit: {
    marginTop: 10,
    color: "blue",
    textAlign: "center",
    fontSize: 14,
    fontFamily: "Signika",
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Typography
            component="h3"
            variant="h3"
            className={classes.textDeveloped}
          >
            DEVELOPED BY:
          </Typography>
          <Typography component="h5" variant="h5" className={classes.textName}>
            Nejc Robič
          </Typography>
          <a
            style={{ marginTop: 5, color: "yellow" }}
            href="https://gitlab.com/Robic"
            rel="noopener noreferrer"
            target="_blank"
          >
            GitLab
          </a>
        </Paper>
      </div>
    </Container>
  );
}
