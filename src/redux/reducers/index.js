import snackbarReducer from "./snackbarReducer";
import { combineReducers } from "redux";
import googleMail from "./newEmail";
import setUuid from "./setUuid";
import settingsReducer from "./settingsReducer";
import subjectSetReducer from "./subjectsSetReducer";
import setMajors from "./setMajors";
import setLoading from "./setLoading";
import setMajorGrade from "./setMajorGrade";
import forceReloadreducer from "./forceReload";
import forceReloadreducer2 from "./forceReload2";
import forceReloadreducer3 from "./forceReload3";
import forceReloadreducer4 from "./forceReload4";
import setNickname from "./setNickname";
import setCollection from "./setCollection";
import repliesReducer from "./reply";
import drawerStatusReducer from "./drawerReducer";
import drawerSettingsStatusReducer from "./drawerSettingsReducer";

const allReducers = combineReducers({
  snackBarOpened: snackbarReducer,
  newEmail: googleMail,
  setUuid: setUuid,
  settingsOpened: settingsReducer,
  subjectsSet: subjectSetReducer,
  setMajors: setMajors,
  setMajorGrade: setMajorGrade,
  forceReload: forceReloadreducer,
  forceReload2: forceReloadreducer2,
  setLoading: setLoading,
  setNickname: setNickname,
  setReply: repliesReducer,
  forceReload3: forceReloadreducer3,
  forceReload4: forceReloadreducer4,
  setCollection: setCollection,
  drawerStatus: drawerStatusReducer,
  drawerSettingsStatus: drawerSettingsStatusReducer,
});

export default allReducers;
