import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/login";
import Home from "./pages/home";
import Timetable from "./pages/timetable";
import Drawer from "./components/drawer";
import DrawerMobile from "./components/drawerMobile";
import Appbar from "./components/appBar";
import FamnitValidation from "./pages/famnitVarification";
import SubjectAllSelect from "./pages/subjectAllSelect";
import WaitForVarification from "./pages/waitForVarification";
import MajorSelector from "./pages/majorSelector";
import About from "./pages/about";
import Chatroom from "./pages/forum";
import Replyroom from "./pages/replyForum";
import Notes from "./pages/notes";
import LoginMobile from "./pages/mobile/login_mobile";
import HomeMobile from "./pages/mobile/home_mobile";
import TimetableMobile from "./pages/mobile/timetable_mobile";
import AppbarMobile from "./components/appBar";
import FamnitValidationMobile from "./pages/mobile/famnitVarification_mobile";
import SubjectAllSelectMobile from "./pages/mobile/subjectAllSelect_mobile";
import WaitForVarificationMobile from "./pages/mobile/waitForVarification_mobile";
import MajorSelectorMobile from "./pages/mobile/majorSelector_mobile";
import AboutMobile from "./pages/mobile/about_mobile";
import ChatroomMobile from "./pages/mobile/forum_mobile";
import ReplyroomMobile from "./pages/mobile/replyForum_mobile";
import NotesMobile from "./pages/mobile/notes_mobile";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setId, nickname, email } from "./redux/actions";
import { postRequest, getRequest } from "./utils/axiosRequests";
import { isMobile } from "react-device-detect";

export default function App() {
  const dispatch = useDispatch();
  const reduxEmail = useSelector((state) => state.newEmail);
  const uuid = useSelector((state) => state.setUuid);
  const subjects = useSelector((state) => state.subjectsSet);
  const [uuidSet, setUuidSet] = React.useState(false);
  const [subjectsSet, setSubjectsSet] = React.useState(false);
  

 

  React.useEffect(() => {
    var userData;
    var subjectsData;
    var nickNameData;
    var localEmail = localStorage.getItem("email")
    console.log("localEmail: ", localEmail)
    if (localEmail!==null){
      dispatch(email(localEmail))
    }
    
    const postEmailGetUuid = async () => {
      userData = await postRequest(
        "https://famnit-connect.herokuapp.com/user-info/" + reduxEmail
      );
      if (userData !== null) {
        dispatch(setId(userData.data.user_uuid));
      }
      setUuidSet(true);
    };
    if (reduxEmail !== null && uuid == null) {
      postEmailGetUuid();
    }

    const getSubjectData = async () => {
      subjectsData = await getRequest(
        "https://famnit-connect.herokuapp.com/programs/user/selected/subjects/" +
          uuid
      );

      //When 2. Semester is implemented numberOfItemsNotSubjects needs to be changed to 3 (because of another item that is not a subject in the json... preety self explanetory :) )

      var numberOfItemsNotSubjects = 2;
      var numOfsubjectsSet =
        subjectsData.data.data.length - numberOfItemsNotSubjects;
      console.log("number of subjects set: " + numOfsubjectsSet);
      if (numOfsubjectsSet > 0) {
        setSubjectsSet(true);
      }
      console.log("are subjects set? " + subjectsSet);
    };
    getSubjectData();

    const getNickname = async () => {
      nickNameData = await getRequest(
        "https://famnit-connect.herokuapp.com/register/nickname/" + uuid
      );
      if (nickNameData !== null) {
        console.log("nickname:", nickNameData.data.data[0].nickname);
        dispatch(nickname(nickNameData.data.data[0].nickname));
      }
    };
    if (uuid !== null) {
      getNickname();
    }

  }, [uuid, reduxEmail, dispatch, subjectsSet]);

  let desktopRoutes;
  desktopRoutes = (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>{" "}
      <Route exact path="/timetable">
        <Timetable uuid={uuid}> </Timetable>{" "}
      </Route>{" "}
      <Route exact path="/grade_select">
        <MajorSelector />{" "}
      </Route>{" "}
      <Route exact path="/all_subjects_seleect">
        <SubjectAllSelect />{" "}
      </Route>{" "}
      <Route exact path="/about">
        <About />{" "}
      </Route>{" "}
      <Route exact path="/messages/:subjectName" component={Chatroom} />
      <Route
        exact
        path="/reply/:collection/:document_id/:qName/:qText/:qCreatedAt"
        component={Replyroom}
      />
      <Route exact path="/notes/:subject_id/:subjectName" component={Notes} />
    </Switch>
  );

  let mobileRoutes;
  mobileRoutes = (
    <Switch>
      <Route exact path="/">
        <HomeMobile />
      </Route>{" "}
      <Route exact path="/timetable">
        <TimetableMobile uuid={uuid}> </TimetableMobile>{" "}
      </Route>{" "}
      <Route exact path="/grade_select">
        <MajorSelectorMobile />{" "}
      </Route>{" "}
      <Route exact path="/all_subjects_seleect">
        <SubjectAllSelectMobile />{" "}
      </Route>{" "}
      <Route exact path="/about">
        <AboutMobile />{" "}
      </Route>{" "}
      <Route exact path="/messages/:subjectName" component={ChatroomMobile} />
      <Route
        exact
        path="/reply/:collection/:document_id/:qName/:qText/:qCreatedAt"
        component={ReplyroomMobile}
      />
      <Route
        exact
        path="/notes/:subject_id/:subjectName"
        component={NotesMobile}
      />
    </Switch>
  );

  let routesFamnitVerification;
  if (isMobile) {
    routesFamnitVerification = (
      <Switch>
        <Route exact path="/">
          <FamnitValidationMobile />
        </Route>{" "}
        <Route exact path="/check_your_outlook">
          <WaitForVarificationMobile />
        </Route>{" "}
      </Switch>
    );
  } else {
    routesFamnitVerification = (
      <Switch>
        <Route exact path="/">
          <FamnitValidation />
        </Route>{" "}
        <Route exact path="/check_your_outlook">
          <WaitForVarification />
        </Route>{" "}
      </Switch>
    );
  }

  let routesMajorGradeAndSubjectSelect;
  if (isMobile) {
    routesMajorGradeAndSubjectSelect = (
      <Switch>
        <Route exact path="/">
          <MajorSelectorMobile />
        </Route>{" "}
      </Switch>
    );
  } else {
    routesMajorGradeAndSubjectSelect = (
      <Switch>
        <Route exact path="/">
          <MajorSelector />
        </Route>{" "}
      </Switch>
    );
  }

  let famnit_varification;
  if (isMobile) {
  famnit_varification = (
    <Router>
      <AppbarMobile> {routesFamnitVerification} </AppbarMobile>{" "}
    </Router>
  );
  }
  else{
    famnit_varification = (
    <Router>
      <Appbar> {routesFamnitVerification} </Appbar>{" "}
    </Router>
  );
  }

  let site;
  if (isMobile) {
    site = (
      <Router>
        <DrawerMobile> {mobileRoutes} </DrawerMobile>{" "}
      </Router>
    );
  } else {
    site = (
      <Router>
        <Drawer> {desktopRoutes} </Drawer>{" "}
      </Router>
    );
  }
  let login;
  if (isMobile) {
    login = (
      <Router>
        <AppbarMobile>
          <LoginMobile />
        </AppbarMobile>{" "}
      </Router>
    );
  } else {
    login = (
      <Router>
        <Appbar>
          <Login />
        </Appbar>{" "}
      </Router>
    );
  }
  let subject_select;
  if (isMobile) {
    subject_select = (
      <Router>
        <AppbarMobile>{routesMajorGradeAndSubjectSelect}</AppbarMobile>{" "}
      </Router>
    );
  } else {
    subject_select = (
      <Router>
        <Appbar>{routesMajorGradeAndSubjectSelect}</Appbar>{" "}
      </Router>
    );
  }

  console.log("CHECK");
  console.log("uuid", uuid);
  console.log("subjectsSet", subjectsSet);
  console.log("uuidSet", uuidSet);
  console.log("email", email);

  if (!uuidSet) {
    return login;
  }

  if ((uuid !== null && subjectsSet) || subjects.length !== 0) {
    return site;
  } else if (uuid !== null && !subjectsSet) {
    return subject_select;
  } else {
    if (uuidSet && reduxEmail !== null) {
      return famnit_varification;
    } else {
      return login;
    }
  }
}
