import React from "react";
import { FcPlus } from "react-icons/fc";
import { HiMinusCircle } from "react-icons/hi";
import {
  ACTIONS_TYPES,
  useAccountContext,
  useAccountDispatchContext,
} from "../../components/home/context/home.context";

const useHomeServices = () => {
  const dispatchContext = useAccountDispatchContext();
  const { isCreatedAccountOpen } = useAccountContext();

  const CreateAccountButton = isCreatedAccountOpen ? (
    <HiMinusCircle
      className="create-account-icon"
      onClick={toggleCreateAccount}
    />
  ) : (
    <FcPlus className="create-account-icon" onClick={toggleCreateAccount} />
  );

  function handleAccountsFilterInput({ target: { value } }) {
    dispatchContext({ type: ACTIONS_TYPES.FILTER_ACCOUNTS_ACTION, payload: value });
  }

  function toggleCreateAccount() {
    dispatchContext({ type: ACTIONS_TYPES.IS_CREATE_ACCOUNT_OPEN_ACTION, payload: !isCreatedAccountOpen });
  }

  return { CreateAccountButton, handleAccountsFilterInput, toggleCreateAccount };
};

export default useHomeServices;
