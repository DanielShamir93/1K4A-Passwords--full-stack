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
  const { open } = useAccountContext();

  const CreateAccountIcon = open ? (
    <HiMinusCircle
      className="create-account-icon"
      onClick={toggleCreateAccount}
    />
  ) : (
    <FcPlus className="create-account-icon" onClick={toggleCreateAccount} />
  );

  function handleInput({ target: { value } }) {
    dispatchContext({ type: ACTIONS_TYPES.FILTER_INPUT, payload: value });
  }

  function toggleCreateAccount() {
    dispatchContext({ type: ACTIONS_TYPES.OPEN, payload: !open });
  }

  return { CreateAccountIcon, handleInput, toggleCreateAccount };
};

export default useHomeServices;
