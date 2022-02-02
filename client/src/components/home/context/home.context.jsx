import React, { useReducer, useContext } from "react";

const INITIAL_STATE = {
  centered: false,
  open: false,
  filterInput: "",
};

export const ACTIONS_TYPES = {
  CENTERED: "CENTERED",
  OPEN: "OPEN",
  FILTER_INPUT: "FILTER_INPUT",
};

const accountReduce = (state, action) => {
  const { CENTERED, OPEN, FILTER_INPUT } = ACTIONS_TYPES;
  switch (action.type) {
    case CENTERED:
      return { ...state, centered: action.payload };
    case OPEN:
      return { ...state, open: action.payload };
    case FILTER_INPUT:
      return { ...state, filterInput: action.payload };
    default:
      return state;
  }
};

const AccountContext = React.createContext(null);
const AccountDispatch = React.createContext(null);

export const useAccountContext = () => {
  return useContext(AccountContext);
};

export const useAccountDispatchContext = () => {
  return useContext(AccountDispatch);
};

export const AccountProvider = ({ children }) => {
  const [state, dispatch] = useReducer(accountReduce, INITIAL_STATE);

  return (
    <AccountContext.Provider value={state}>
      <AccountDispatch.Provider value={dispatch}>
        {children}
      </AccountDispatch.Provider>
    </AccountContext.Provider>
  );
};
