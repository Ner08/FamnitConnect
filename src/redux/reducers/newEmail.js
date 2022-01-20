const googleMail = (state = null, action) => {
  switch (action.type) {
    case "NEW_EMAIL":
      return action.email;

    default:
      return state;
  }
};
export default googleMail;
