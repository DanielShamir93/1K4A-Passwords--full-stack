import { SET_PASSWORD } from "../../actions/actionsTypes";

const passwordReducer = (state = "", action) => {
  switch (action.type) {
    case SET_PASSWORD:
      return action.payload;
    default:
      return state;
  }
};

export default passwordReducer;
