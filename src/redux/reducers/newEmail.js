const googleMail = (state = "robic.nejc12@gmail.com", action) => {
  switch (action.type) {
    case "NEW_EMAIL":
      return action.email;

    default:
      return state;
  }
};
export default googleMail;
