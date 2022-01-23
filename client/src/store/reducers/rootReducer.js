import emailReducer from "./signup-reducers/emailReducer";
import passwordReducer from "./signup-reducers/passwordReducer";
import confirmReducer from "./signup-reducers/confirmReducer";
import loggedInUserReducer from "./signup-reducers/loggedInUserReducer";
import accountChangedRenderReducer from "./accountChangedRenderReducer";
import editAccountReducer from "./editAccountReducer";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["loggedInUser"],
};

const rootReducer = combineReducers({
  email: emailReducer,
  password: passwordReducer,
  confirm: confirmReducer,
  accountChangedRender: accountChangedRenderReducer,
  editAccount: editAccountReducer,
  loggedInUser: loggedInUserReducer,
});

export default persistReducer(persistConfig, rootReducer);
