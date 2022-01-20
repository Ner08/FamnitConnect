const rCollection = (state = null , action) => {
    switch (action.type) {
      case "SET_COLLECTION":
        return action.collection;
  
      default:
        return state;
    }
  };
  export default rCollection;
  