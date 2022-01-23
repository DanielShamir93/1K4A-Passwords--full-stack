import { IS_AUTH } from "../../actions/actionsTypes";

const isAuthReducer = (state = false, action) => {
  switch (action.type) {
    case IS_AUTH:
      return action.payload;
    default:
      return state;
  }
};

export default isAuthReducer;
