const userNickname = (state = null , action) => {
    switch (action.type) {
      case "SET_NICKNAME":
        return action.nickname;
  
      default:
        return state;
    }
  };
  export default userNickname;
  