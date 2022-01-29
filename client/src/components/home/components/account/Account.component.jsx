import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiFileCopyLine } from "react-icons/ri";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { FcUnlock, FcLock, FcKey } from "react-icons/fc";
import { accountChangedRenderAction, editAccountAction } from "../../../../store/actions/actions";
import { Password } from "keys-to-password";
import myApi from "../../../../api/Apis";
import { ACCOUNTS_END_POINTS_CONSTANTS, HTTP_METHODS_CONSTANTS } from "../../../../constants/httpRequests.constants";
import "./account.styles.scss";
import "./account.styles.mobile.scss";

export default function Account({ account, setIsLoading, toggleCreateAccountComponent, isSomeAccountCentered, setIsSomeAccountCentered }) {
  const { DELETE_ACCOUNT_END_POINT } = ACCOUNTS_END_POINTS_CONSTANTS;
  const { DELETE_METHOD } = HTTP_METHODS_CONSTANTS;
  const dispatch = useDispatch();
  const toggleDisplayMoreRef = useRef();
  const centerAccountRef = useRef();
  const [privateKey, setPrivateKey] = useState("");
  const [output, setOutput] = useState("");
  const [isMoreDisplayed, setIsMoreDisplayed] = useState(false);
  const statesObject = useSelector((state) => {
    return { loggedInUser: state.loggedInUser };
  });

  // Toggle for more options of the account
  const toggleDisplayMore = () => {
    
    if (!isMoreDisplayed) {
      // Display more options
      toggleDisplayMoreRef.current.style.display = "flex";
      Object.assign(centerAccountRef.current.style, {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
      });
      setIsMoreDisplayed(true);
      setIsSomeAccountCentered(true);
    } else {
      // Hide more options and clean
      toggleDisplayMoreRef.current.style.display = "none";
      Object.assign(centerAccountRef.current.style, {
        position: "unset",
        top: "0",
        left: "0",
        transform: "translate(0, 0)"
      });
      setPrivateKey("");
      setOutput("");
      setIsMoreDisplayed(false);
      setIsSomeAccountCentered(false);
    }
  };

  // Retrieve the password outcome
  const getPassword = () => {
    if (privateKey.length > 0) {
      // Key was assigned
      const password = new Password(privateKey, account.publicKey);
      const keyboardConfig = {
        avoidChars: account.passAvoidChars,
        isContainDigits: account.isPassHasDigit,
        isContainUpperCase: account.isPassHasUppercase,
        isContainLowerCase: account.isPassHasLowercase,
        isContainSymbols: account.isPassHasSymbol,
        mustContainChars: account.keyboardMustContain,
      };
      
      password.setKeyboard(keyboardConfig);
      if (account.hasOwnProperty("passPattern")) {
        // Account password generated via pattern 
        password.generateFromPattern(account.passPattern);
        setOutput(password.getPassword);
      } else {
        // Account password generated via regular way 
        const generateConfig = {
          passLength: +account.passLength,
          passStartsWith: account.passStartsWith,
          passEndsWidth: account.passEndsWith,
        };
        password.generate(generateConfig);
        setOutput(password.getPassword);
      }
    } else {
      setOutput("Missing Private Key");
    }
  };

  // Remove account from user's gallery
  const deleteAccount = async () => {
    setIsLoading(true);
    try {
      const config = {
        method: DELETE_METHOD,
        headers: {
          Authorization: `Bearer ${statesObject.loggedInUser.token}`,
        },
      };

      await myApi(`${DELETE_ACCOUNT_END_POINT}/${account._id}`, config);
      dispatch(accountChangedRenderAction());
    } catch (err) {
      console.log(err.message);
    }
  };

  // Change account's values
  const editAccount = () => {
    dispatch(editAccountAction(account));
    toggleCreateAccountComponent(true);
  };

  // Copy outcome password to the clipboard
  const copyPassword = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="account" ref={centerAccountRef}>
      <div className="account-names" onClick={(!isSomeAccountCentered || isMoreDisplayed) && toggleDisplayMore}>
        <p className="account-name">{account.accountName}</p>
        <p className="account-subname">{account.accountSubname}</p>
      </div>
      <div ref={toggleDisplayMoreRef} className="account-more">
        <div className="account-more-bar">
          <AiOutlineDelete
            className="delete-account-button"
            onClick={deleteAccount}
          />
          <AiOutlineEdit
            className="edit-account-button"
            onClick={editAccount}
          />
        </div>
        <div className="private-key">
          <label htmlFor="private-key-input">
            <FcKey className="private-key-icon" />
          </label>
          <input
            className="private-key-input"
            id="private-key-input"
            type="password"
            placeholder="Private Key"
            onChange={(e) => {
              setPrivateKey(e.target.value);
            }}
            value={privateKey}
          />
        </div>
        {privateKey.length > 0 ? (
          <FcUnlock className="get-password-button" onClick={getPassword} />
        ) : (
          <FcLock className="get-password-button" onClick={getPassword} />
        )}
        <div className="output">
          <input
            className="output-input"
            type="text"
            placeholder="Output"
            value={output}
            readOnly
          />
          <RiFileCopyLine className="copy-button" onClick={copyPassword} />
        </div>
      </div>
    </div>
  );
}
