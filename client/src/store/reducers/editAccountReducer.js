import { EDIT_ACCOUNT } from "../actions/actionsTypes";

const editAccountReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_ACCOUNT:
      return action.payload;
    default:
      return state;
  }
};

export default editAccountReducer;
