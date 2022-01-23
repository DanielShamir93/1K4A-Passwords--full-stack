import { LOGGED_IN_USER } from "../../actions/actionsTypes";

const loggedInUserReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGGED_IN_USER:
      return action.payload;
    default:
      return state;
  }
};

export default loggedInUserReducer;
