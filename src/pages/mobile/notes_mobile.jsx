import React from "react";
import { makeStyles, withStyles, createTheme, ThemeProvider } from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';
import { Button, Typography, CssBaseline, Paper, Fab, TextField, IconButton } from "@material-ui/core";
import { useSelector } from "react-redux";
import axios from 'axios'
import Grid from "@material-ui/core/Grid";
import { getRequest } from "../../utils/axiosRequests";
import CloseIcon from '@material-ui/icons/Close';
import CustomizedSnackbars from "../../components/snackbar/notesInsertSnackbar";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ReportIcon from '@material-ui/icons/Report';

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: 0,
    margin: "auto",
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
    maxWidth:"100%",
    margin:"auto"
  },
  paperEnterNote: {
    position: "fixed",
    right: "2vh",
    bottom: 65,
    backgroundColor: "#DCDCDC",
    width: 340,
    height: 280,
    textAlign: "center",
    fontFamily: "Krona One"
  },
  button: {
    height: "100%",
    width: "100%",
    textAlign: "center",
    color: "white",
    backgroundColor: "#383838",
    position: "relative"
  },
  title: {
    display: "inline-block",
    color: "white",
    textAlign: "center",
    fontFamily: "Signika",
    backgroundColor: "#125845",
    fontSize:18,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 5,
    marginTop:0,
    marginBottom:"3vh",
    width:"100%",
  },
  notesText: {
    color: "black",
    fontSize: 13,
    marginLeft: 5,
    marginTop: 7,
    fontFamily: "Signika"
  },
  fab: {
    position: "fixed",
    right: "1vh",
    bottom: 10
  },
  notesButton: {
    marginTop: 20,
    backgroundColor: "#686868",
    color: "white"
  },
  addNoteDiv: {
    display: "block"
  },
  textfieldOutline: {
    marginTop: 10, marginLeft: 10, marginRight: 10, backgroundColor: "white", width: 320, borderRadius: 4
  },
  facultyClass: {
    fontSize: 14,
    fontFamily: "Signika",
    color:'white',
  },
}));

export default function Home({ match }) {
  const classes = useStyles();
  const [notes, setNotes] = React.useState([]);
  const [insertNote, setInsertNote] = React.useState(false);
  const uuid = useSelector(state => state.setUuid);
  const [url, setUrl] = React.useState('')
  const [name, setName] = React.useState('')
  const [snackbarSuccessText, setSnackbarSuccessText] = React.useState("");
  const [snackbarErrorText, setSnackbarErrorText] = React.useState("");

  let params = match.params;
  const subject_id = params.subject_id
  const subject_name = params.subjectName

  React.useEffect(() => {
    const source = axios.CancelToken.source();
    var notesData;
    const getNotesData = async () => {
      notesData = await getRequest("https://famnit-connect.herokuapp.com/notes/list/" + uuid + "?subject_id=" + subject_id, source);
      if (notesData !== null) {
        setNotes(notesData.data.data);
      }
    }
    getNotesData();

    return () => {
      source.cancel();
    };

  }, [uuid, subject_id]);


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

  function getNotesWhenAdded() {
    const source = axios.CancelToken.source();
    var notesData;
    const getNotesData = async () => {
      notesData = await getRequest("https://famnit-connect.herokuapp.com/notes/list/" + uuid + "?subject_id=" + subject_id, source);
      if (notesData !== null) {
        setNotes(notesData.data.data);
      }
    }
    getNotesData();

    return () => {
      source.cancel();
    };
  }

  function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
  }

  const onSubmit = async () => {
    if (name === "" || url === "") {
      setSnackbarErrorText('Some of the information was missing')
    }
    else {
      if (validURL(url)) {
        console.log("valid")
        try {
          const response = await axios.post("https://famnit-connect.herokuapp.com/notes/insert", {
            url: url,
            name: name,
            user_uuid: uuid,
            subject_id: subject_id
          })
          console.log("Success!")
          console.log(response)
          setUrl("")
          setName("")
          console.log("Success!!")
          setInsertNote(false)
          getNotesWhenAdded()
        } catch (e) {
          setSnackbarErrorText('Something went wrong. Check your entry and try again.')
        }
      }
      else {
        setSnackbarErrorText('The url you have entered is not an url (hint: starts with https:// or http://)')
      }
    }
  }

  const onLike = async (notes_id) => {
    try {
      const response = await axios.post("https://famnit-connect.herokuapp.com/notes/like", {
        user_uuid: uuid,
        notes_id: notes_id
      })
      console.log(response)
      console.log("Success!!")
      getNotesWhenAdded()
    } catch (e) {
      setSnackbarErrorText('Something went wrong. Refresh the page and try again.')
    }



  }

  const onDislike = async (notes_id) => {
    try {
      const response = await axios.post("https://famnit-connect.herokuapp.com/notes/dislike", {
        user_uuid: uuid,
        notes_id: notes_id
      })
      console.log(response)
      console.log("Success!!")
      getNotesWhenAdded()
    } catch (e) {
      setSnackbarErrorText('Something went wrong. Refresh the page and try again.')
    }

  }

  const onSnackbarClose = () => {
    setSnackbarSuccessText('');
    setSnackbarErrorText('');
  }

function likeDislikeDiv(id, isLiked, isDisliked) {
  if (isLiked) {
    return (
      <div style={{ display: "inline-block" }}>
        <IconButton disabled={true} size="small" onClick={() => onLike(id)} style={{ marginTop: 6, marginLeft: 3, color: "green" }}><ThumbUpAltIcon /></IconButton>
        <IconButton size="small" onClick={() => onDislike(id)} style={{ marginTop: 6, marginRight: 10, marginLeft: 10, color: "#660000" }}><ThumbDownIcon /></IconButton>
        <IconButton size="small" style={{ marginTop: 6, color: "gray" }}><ReportIcon /></IconButton>
      </div>
    );
  }
  else if (isDisliked) {
    return (
      <div style={{ display: "inline-block" }}>
        <IconButton size="small" onClick={() => onLike(id)} style={{ marginTop: 6, marginLeft: 3, color: "#004c00" }}><ThumbUpAltIcon /></IconButton>
        <IconButton disabled={true} size="small" onClick={() => onDislike(id)} style={{ marginTop: 6, marginRight: 10, marginLeft: 10, color: "red" }}><ThumbDownIcon /></IconButton>
        <IconButton size="small" style={{ marginTop: 6, color: "gray" }}><ReportIcon /></IconButton>
      </div>
    );
  }
  else{
    return (
      <div style={{ display: "inline-block" }}>
        <IconButton size="small" onClick={() => onLike(id)} style={{ marginTop: 6, marginLeft: 3, color: "green" }}><ThumbUpAltIcon /></IconButton>
        <IconButton size="small" onClick={() => onDislike(id)} style={{ marginTop: 6, marginRight: 10, marginLeft: 10, color: "red" }}><ThumbDownIcon /></IconButton>
        <IconButton size="small" style={{ marginTop: 6, color: "gray" }}><ReportIcon /></IconButton>
      </div>
    );
  }
}

console.log(notes)
const inGrid = () => {
  return notes.map(function (data) {
    if (data.likes > 0) {
      return (
        <Grid  key={data.id} item xs={6} sm={6} md={6} lg={3} xl={2}>
          <div className={classes.paper}>
            <Button onClick={() => window.open(data.url, "_blank")} className={classes.button}>
              <Typography noWrap="true" style={{position: "absolute", right: -7, top: -7, backgroundColor: "green", borderRadius: 50, paddingLeft: 9, paddingRight: 9, paddingtop: 2, paddingBottom: 2, textAlign: "center" }}>
                {data.likes}
              </Typography>
              <Typography style={{ maxWidth:"80vw",wordWrap: "break-word",overflow:"hidden",hyphens:"auto"}} className={classes.facultyClass}>
                {data.name}
              </Typography>
            </Button>
          </div>
          {likeDislikeDiv(data.id,data.liked,data.disliked)}
        </Grid>
      );
    }
    else if (data.likes < 0) {
      return (
        <Grid key={data.id} item xs={6} sm={6} md={6} lg={3} xl={2}>
          <div className={classes.paper}>
            <Button onClick={() => window.open(data.url, "_blank")} className={classes.button}>
              <Typography style={{ position: "absolute", right: -7, top: -7, backgroundColor: "red", borderRadius: 50, paddingLeft: 9, paddingRight: 9, paddingtop: 2, paddingBottom: 2, textAlign: "center" }}>
                {data.likes}
              </Typography>
              <Typography style={{ maxWidth:"80vw",wordWrap: "break-word",overflow:"hidden",hyphens:"auto"}} className={classes.facultyClass}>
                {data.name}
              </Typography>
            </Button>
          </div>
          {likeDislikeDiv(data.id,data.liked,data.disliked)}
        </Grid>
      );
    }
    else {
      return (
        <Grid key={data.id} item xs={6} sm={6} md={6} lg={3} xl={2}>
          <div className={classes.paper}>
            <Button onClick={() => window.open(data.url, "_blank")} className={classes.button}>
              <Typography style={{ position: "absolute", right: -7, top: -7, backgroundColor: "gray", borderRadius: 50, paddingLeft: 9, paddingRight: 9, paddingtop: 2, paddingBottom: 2, textAlign: "center" }}>
                {data.likes}
              </Typography>
              <Typography style={{ maxWidth:"80vw",wordWrap: "break-word",overflow:"hidden",hyphens:"auto"}} className={classes.facultyClass}>
                {data.name}
              </Typography>
            </Button>
          </div>
          {likeDislikeDiv(data.id,data.liked,data.disliked)}
        </Grid>
      );
    }
  });
}

function fab() {
  if (insertNote) {
    return (
      <Fab
        onClick={() => setInsertNote(!insertNote)}
        variant="extended"
        size="medium"
        className={classes.fab}
        aria-label="add">
        <CloseIcon />
         Close
      </Fab>
    );
  }
  else {
    return (
      <Fab
        onClick={() => setInsertNote(!insertNote)}
        variant="extended"
        size="medium"
        className={classes.fab}
        aria-label="add">
        <AddIcon />
         Add a note
      </Fab>
    )
  }
}
function insertNotesDiv() {
  if (insertNote) {
    return (
      <div className={classes.addNoteDiv}>
        <Paper elevation={5} className={classes.paperEnterNote}>
          <Typography
            style={{ marginTop: 20, color: "black" }}>
            Enter the name of the note:
            </Typography>
          <TextField color="primary" value={name} required size="small" variant="outlined" label="Name" onChange={(e) => setName(e.target.value)} className={classes.textfieldOutline}> url</TextField>
          <Typography
            style={{ marginTop: 20, color: "black" }}>
            Enter the url of the note:
          </Typography>
          <ThemeProvider theme={theme}>
            <TextField color="primary" type="url" required pattern="https?://.+" value={url} size="small" variant="outlined" label="Url" onChange={(e) => setUrl(e.target.value)} className={classes.textfieldOutline}> url</TextField></ThemeProvider>
          <Typography
            style={{ marginTop: 2, color: "black", fontSize: 11 }}>
            Example: https://www.google.si
          </Typography>
          <ColorButton variant="contained" className={classes.notesButton} onClick={onSubmit}>SUBMIT</ColorButton>
        </Paper>
      </div>
    );
  }
  else {
    return (null)
  }
}

const ColorButton = withStyles((theme) => ({
  root: {
    color: "white",
    backgroundColor: "#686868",
    '&:hover': {
      backgroundColor: "#787878",
    },
  },
}))(Button);


function FormFragment() {
  return <React.Fragment>{inGrid()}</React.Fragment>;
}

return (
  <div className={classes.root}>
    <CssBaseline />
    <Paper className={classes.title}>{subject_name}
      <span className={classes.notesText}> NOTES</span></Paper>
    <Grid container spacing={1}>
      <Grid container item spacing={5}>
        <FormFragment />
      </Grid>
    </Grid>
    {insertNotesDiv()}
    {fab()}
    <CustomizedSnackbars onCloseEvent={onSnackbarClose} open={snackbarSuccessText.length > 0} text={snackbarSuccessText} />
    <CustomizedSnackbars onCloseEvent={onSnackbarClose} open={snackbarErrorText.length > 0} error text={snackbarErrorText} />
  </div>
);
}
