import axios from "axios";
import * as moment from "moment";
import store from '../redux/store/store'
import axiosCancel from 'axios-cancel';

export const getCalanderData = async (currentDate,uuid) => {
  const date=moment(currentDate)

  axiosCancel(axios, {
    debug: false // default
  });

  store.dispatch({type: "SET_LOADING", loading: true});

  console.log("currentDate= "+date)
  if(date.day()===0){
    currentDate=currentDate.setDate(currentDate.getDate()-1)
  }

  let monday = moment(currentDate)
    .startOf("week")
    .add(1, "d")
    .format("ddd MMM DD YYYY");
  let mondayFormatedForJson = moment(currentDate)
    .startOf("week")
    .add(1, "d")
    .format("L");
  let tuesday = moment(currentDate)
    .startOf("week")
    .add(2, "d")
    .format("ddd MMM DD YYYY");
  let tuesdayFormatedForJson = moment(currentDate)
    .startOf("week")
    .add(2, "d")
    .format("L");
  let wednesday = moment(currentDate)
    .startOf("week")
    .add(3, "d")
    .format("ddd MMM DD YYYY");
  let wednesdayFormatedForJson = moment(currentDate)
    .startOf("week")
    .add(3, "d")
    .format("L");
  let thursday = moment(currentDate)
    .startOf("week")
    .add(4, "d")
    .format("ddd MMM DD YYYY");
  let thursdayFormatedForJson = moment(currentDate)
    .startOf("week")
    .add(4, "d")
    .format("L");
  let friday = moment(currentDate)
    .startOf("week")
    .add(5, "d")
    .format("ddd MMM DD YYYY");
  let fridayFormatedForJson = moment(currentDate)
    .startOf("week")
    .add(5, "d")
    .format("L");

  let link =
    "https://famnit-connect.herokuapp.com/schedule/user/" + uuid + "?date=";
    console.log(link)

  let URL1 = link + monday;
  let URL2 = link + tuesday;
  let URL3 = link + wednesday;
  let URL4 = link + thursday;
  let URL5 = link + friday;

  console.log(URL1)


  const promise1 = axios.get(URL1);
  const promise2 = axios.get(URL2);
  const promise3 = axios.get(URL3);
  const promise4 = axios.get(URL4);
  const promise5 = axios.get(URL5);

  const timetableData = await Promise.all([
    promise1,
    promise2,
    promise3,
    promise4,
    promise5
  ]).then(values => {
    console.log(values);
    let tempCalanderData = values;

    axios.cancelAll();

    //Changing the format of the startDate and endDate value

    var calanderData = { data: [] };
    tempCalanderData.forEach((element, i) => {
      let tmp = element.data.data;
      tmp.forEach(element2 => {
        switch (i) {
          case 0:
            element2.startDate = new Date(
              mondayFormatedForJson + " " + element2.startHour
            );
            element2.endDate = new Date(
              mondayFormatedForJson + " " + element2.endHour
            );
            console.log("pon");
            break;
          case 1:
            element2.startDate = new Date(
              tuesdayFormatedForJson + " " + element2.startHour
            );
            element2.endDate = new Date(
              tuesdayFormatedForJson + " " + element2.endHour
            );
            console.log("tork");
            break;
          case 2:
            element2.startDate = new Date(
              wednesdayFormatedForJson + " " + element2.startHour
            );
            element2.endDate = new Date(
              wednesdayFormatedForJson + " " + element2.endHour
            );
            console.log("sreda");
            break;
          case 3:
            element2.startDate = new Date(
              thursdayFormatedForJson + " " + element2.startHour
            );
            element2.endDate = new Date(
              thursdayFormatedForJson + " " + element2.endHour
            );
            console.log("cet");
            break;
          case 4:
            element2.startDate = new Date(
              fridayFormatedForJson + " " + element2.startHour
            );
            element2.endDate = new Date(
              fridayFormatedForJson + " " + element2.endHour
            );
            console.log("petk");
            break;
          default:
        }
        calanderData.data.push(element2);
      });
    });
    console.log(
      "date: " +
        moment(currentDate)
          .startOf("week")
          .add(1, "d")
          .format("ddd MMM DD YYYY")
    );
    console.log("day: " + moment(currentDate).day());

    //Replacing the name of some keys and deleting unnecesary keys

    console.log(calanderData, "calanderData");

    let tmp2 = calanderData.data;
    const timetableData = tmp2.map(element3 => {
      const timetableData = {
        id: element3.id,
        title: element3.course,
        startDate: element3.startDate,
        endDate: element3.endDate,
        location: element3.rooms[0],
        lecturers: element3.lecturers[0],
        decoration: element3.decoration
      };
      return timetableData;
    });

    console.log(timetableData,"CalanderDataRefined");
    return timetableData;
  });

  store.dispatch({type: "SET_LOADING", loading: false});
  
  return timetableData;
};
