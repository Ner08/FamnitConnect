import React from "react";
import {
  Avatar,
  CssBaseline,
  TextField,
  Typography,
  Container,
  Button,
  Paper
} from "@material-ui/core";
import { makeStyles, createTheme,ThemeProvider } from "@material-ui/core/styles";
import LockIcon from "@material-ui/icons/Lock";
import { useHistory } from "react-router-dom";
import CustomizedSnackbars from "../components/snackbar";
import { useSelector } from "react-redux";
import axios from 'axios'


const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  paper: {
    marginTop: theme.spacing(0),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#303030",
    paddingLeft: 30,
    paddingRight: 30,
    height: 325,
    width: '100%'
  },
  avatar: {
    margin: theme.spacing(1),
    marginTop:30,
    backgroundColor: "#125845"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    color: "white"
  },
  textField: {
    backgroundColor: "white",
    color: "black",
  },
  text: {
    marginTop: 40,
    marginBottom:40,
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
    marginBottom:20
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [famnitMail, setFamnitMail] = React.useState('')
  const [snackbarSuccessText, setSnackbarSuccessText] = React.useState("");
  const [snackbarErrorText, setSnackbarErrorText] = React.useState("");
  const email = useSelector(state => state.newEmail);
  const history = useHistory();
  const goWaitForVarification = () => history.push('/check_your_outlook');

  const theme = createTheme({
    palette: {
      primary: {
        main: "#125845",
      },
      secondary: {
        main: "#125845"
      },
    },
  });

  const onSubmit = async () => {
    try {
      const response = await axios.post("https://famnit-connect.herokuapp.com/register/famnit-email", {
        famnit_email: famnitMail,
        google_email: email
      })
      console.log("Success!")
      console.log(response)
      goWaitForVarification()
    } catch (e) {
      setSnackbarErrorText('Something went wrong. Check your entry and try again.')
    }
  }

  const onSnackbarClose = () => {
    setSnackbarSuccessText('');
    setSnackbarErrorText('');
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.root}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockIcon />
        </Avatar>
        <Typography component="h5" variant="h5" className={classes.textVarify}>
          MEMBER CHECK
        </Typography>
        <form className={classes.form} noValidate>
        <ThemeProvider theme={theme}>
          <TextField
            InputProps={{
              className: classes.textField
            }}
            variant="outlined"
            margin="normal"
            required
            value={famnitMail}
            fullWidth
            id="email"
            label="Famnit email address"
            name="email"
            autoComplete="student.upr.si"
            onChange={(e) => setFamnitMail(e.target.value)}
          />
          </ThemeProvider>
          <div className="button-confirm-famnit-mail-link">
          <Button variant="contained" style={{ marginTop: 30, marginBottom: 30 }} onClick={onSubmit}>SUBMIT</Button>
            <CustomizedSnackbars onCloseEvent={onSnackbarClose} open={snackbarSuccessText.length > 0} text={snackbarSuccessText} />
            <CustomizedSnackbars onCloseEvent={onSnackbarClose} open={snackbarErrorText.length > 0} error text={snackbarErrorText} />
          </div>
        </form>
        </Paper>
      </div>
      <Typography component="h5" variant="h5" className={classes.text}>
          We need to confirm you are a member of this university. Please enter
          your famnit email address. You only have to do this once.
        </Typography>
        <Typography component="h5" variant="h5" className={classes.text}>
          Example: 89171122@student.upr.si
        </Typography>
    </Container>
  );
}
