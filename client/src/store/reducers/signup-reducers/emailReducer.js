import { SET_EMAIL } from "../../actions/actionsTypes";

const emailReducer = (state = "", action) => {
  switch (action.type) {
    case SET_EMAIL:
      return action.payload;
    default:
      return state;
  }
};

export default emailReducer;
