import React, { useReducer, useContext } from "react";

const INITIAL_STATE = {
  isSomeAccountCentered: false,
  isCreatedAccountOpen: false,
  filterAccounts: "",
};

export const ACTIONS_TYPES = {
  IS_SOME_ACCOUNT_CENTERED_ACTION: "IS_SOME_ACCOUNT_CENTERED_ACTION",
  IS_CREATE_ACCOUNT_OPEN_ACTION: "IS_CREATE_ACCOUNT_OPEN_ACTION",
  FILTER_ACCOUNTS_ACTION: "FILTER_ACCOUNTS_ACTION",
};

const accountReduce = (state, action) => {
  const { IS_SOME_ACCOUNT_CENTERED_ACTION, IS_CREATE_ACCOUNT_OPEN_ACTION, FILTER_ACCOUNTS_ACTION } = ACTIONS_TYPES;
  switch (action.type) {
    case IS_SOME_ACCOUNT_CENTERED_ACTION:
      return { ...state, isSomeAccountCentered: action.payload };
    case IS_CREATE_ACCOUNT_OPEN_ACTION:
      return { ...state, isCreatedAccountOpen: action.payload };
    case FILTER_ACCOUNTS_ACTION:
      return { ...state, filterAccounts: action.payload };
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