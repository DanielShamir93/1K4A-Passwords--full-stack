import { ACCOUNT_CHANGED_RENDER } from "../actions/actionsTypes";

const accountChangedRenderReducer = (state = false, action) => {
  switch (action.type) {
    case ACCOUNT_CHANGED_RENDER:
      return !state;
    default:
      return state;
  }
};

export default accountChangedRenderReducer;
