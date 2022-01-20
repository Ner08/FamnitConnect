import axios from "axios";
import store from '../redux/store/store'


export const getRequest = async (url, source) => {
  store.dispatch({ type: "SET_LOADING", loading: true });
  let sourceBol=false
  if (source===undefined){
    sourceBol=true
  }
  if (sourceBol===true){
    source = axios.CancelToken.source();
  }
  try {
    const response = await axios.get(url, {
      cancelToken: source.token,
    });
    store.dispatch({ type: "SET_LOADING", loading: false });
    if (sourceBol===true){
      source.cancel();
    }
    return response;
  } catch (error) {
    if (axios.isCancel(error)) {
      //cancelled
      if (sourceBol===true){
        source.cancel();
      }
      store.dispatch({ type: "SET_LOADING", loading: false });
      return null;
    } else {
      if (sourceBol===true){
        source.cancel();
      }
      store.dispatch({ type: "SET_LOADING", loading: false });
      return null;
    }
  }
};

export const postRequest = async (url, body, source) => {
  let sourceBol=false
  if (source===undefined){
    sourceBol=true
  }
  if (sourceBol===true){
    source = axios.CancelToken.source();
  }

  store.dispatch({ type: "SET_LOADING", loading: true });
  if (body === undefined) {
    try {
      const response = await axios.post(url, {
        cancelToken: source.token,
      });
      store.dispatch({ type: "SET_LOADING", loading: false });
      if (sourceBol===true){
        source.cancel();
      }
      return response
    } catch (error) {
      if (axios.isCancel(error)) {
        //cancelled
        store.dispatch({ type: "SET_LOADING", loading: false });
        if (sourceBol===true){
          source.cancel();
        }
        return null;
      } else {
        store.dispatch({ type: "SET_LOADING", loading: false });
        if (sourceBol===true){
          source.cancel();
        }
        return null;
      }
    }
  }
  else {
    try {
      const response = await axios.post(url, body, {
        cancelToken: source.token,
      });
      store.dispatch({ type: "SET_LOADING", loading: false });
      if (sourceBol===true){
        source.cancel();
      }
      return response
    } catch (error) {
      if (axios.isCancel(error)) {
        store.dispatch({ type: "SET_LOADING", loading: false });
        if (sourceBol===true){
          source.cancel();
        }
        //cancelled
        return null;
      } else {
        store.dispatch({ type: "SET_LOADING", loading: false });
        if (sourceBol===true){
          source.cancel();
        }
        return null;;
      }
    }
  }
};
