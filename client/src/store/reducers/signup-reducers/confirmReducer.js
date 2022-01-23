import { SET_CONFIRM } from "../../actions/actionsTypes";

const confirmReducer = (state = "", action) => {
  switch (action.type) {
    case SET_CONFIRM:
      return action.payload;
    default:
      return state;
  }
};

export default confirmReducer;
