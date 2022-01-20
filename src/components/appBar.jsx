import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  CssBaseline,
  Toolbar,
  Typography,
  CircularProgress
} from "@material-ui/core";
import "../fonts.css";
import { useSelector } from "react-redux";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: "#125845"
  },
  titleText: {
    color: "white",
    fontSize: 23,
    marginLeft: 10,
    fontFamily: "Krona One"
  },
  titleText2: {
    color: "black",
    fontSize: 16,
    marginLeft: 5,
    marginTop: 7,
    fontFamily: "Signika"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    height:'97vh',
    position: 'relative'
  },
  toolbar:{
  },
  progressBar: {
    position: "absolute",
    right: 20,
    top: 16,
    color: 'white'
  },
}));

export default function ClippedDrawer(props) {
  const classes = useStyles();
  const loading = useSelector(state => state.setLoading);

  const progressBar = () => {

    if (loading) {
      return <CircularProgress size={30} thickness={4} className={classes.progressBar} />
    }
    else return null
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography className={classes.titleText} variant="h6" noWrap>
            FamnitConnect
          </Typography>
          <Typography className={classes.titleText2} variant="h6" noWrap>
            WEB
          </Typography>
          {progressBar()}
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}
