import { FcUnlock, FcLock, FcKey } from "react-icons/fc";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdAccountCircle, MdNoAccounts } from "react-icons/md";
import { accountChangedRenderAction, editAccountAction } from "../../../../store/actions/actions";
import { Password } from "keys-to-password";
import ToggleCharacterTypes from "../../../../components/toggleCharacterTypes/ToggleCharacterTypes.component";
import AccountIcons from "./components/accountIcons/AccountIcons.component";
import myApi from "../../../../api/Apis";
import { ACCOUNTS_END_POINTS_CONSTANTS, HTTP_METHODS_CONSTANTS } from "../../../../constants/httpRequests.constants";
import { ERROR_MESSAGES_CONSTANTS, TEXT_CONSTANTS } from "../../../../constants/createAccount.constants";
import "./create-account.styles.scss";
import "./create-account.styles.mobile.scss";

export default function CreateAccount({ toggleCreateAccount , setIsLoading }) {
  const { UPDATE_ACCOUNT_END_POINT, CREATE_ACCOUNT_END_POINT } = ACCOUNTS_END_POINTS_CONSTANTS;
  const { PUT_METHOD, POST_METHOD } = HTTP_METHODS_CONSTANTS;
  const { ACCOUNT_AREA_TITLE,
          PASSWORD_AREA_TITLE,
          LENGTH_LABEL_TEXT,
          GENERATE_BUTTON_TEXT,
          SUBMIT_BUTTON_TEXT } = TEXT_CONSTANTS;
  const { LENGTH_MUST_BE_POSITIVE_ERROR,
          EMPTY_KEYBOARD_ERROR,
          EMPTY_PRIVATE_KEY_ERROR,
          EMPTY_ACCOUNT_NAME_ERROR,
          CONFIRM_NOT_MATCH_ERROR } = ERROR_MESSAGES_CONSTANTS;
  const dispatch = useDispatch();
  const [output, setOutput] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountSubname, setAccountSubname] = useState("");
  const [passLength, setPassLength] = useState(12);
  const [passStartsWith, setPassStartsWith] = useState("");
  const [passEndsWith, setPassEndsWith] = useState("");
  const [keyboardMustContain, setKeyboardMustContain] = useState("");
  const [passAvoidChars, setPassAvoidChars] = useState("");
  const [passPattern, setPassPattern] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [confirmPrivateKey, setConfirmPrivateKey] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [isValidAccount, setIsValidAccount] = useState(false);
  const [isIconsDisplay, setIsIconsDisplay] = useState(false);
  const [accountIconStyle, setAccountIconStyle] = useState({});
  const [isChecked, setIsChecked] = useState({
    isDigitsChecked: true,
    isUppercaseChecked: true,
    isLowercaseChecked: true,
    isSymbolsChecked: true,
  });
  const statesObject = useSelector((state) => {
    return {
      editAccount: state.editAccount,
      loggedInUser: state.loggedInUser,
    };
  });

  useEffect(() => {
    if (Object.keys(statesObject.editAccount).length > 0) {
      // In edit account mode
      setAccountName(statesObject.editAccount.accountName);
      setAccountSubname(statesObject.editAccount.accountSubname || "");
      setPassLength(statesObject.editAccount.passLength);
      setPassStartsWith(statesObject.editAccount.passStartsWith || "");
      setPassEndsWith(statesObject.editAccount.passEndsWith || "");
      setKeyboardMustContain(statesObject.editAccount.keyboardMustContain || "");
      setPassAvoidChars(statesObject.editAccount.passAvoidChars || "");
      setPassPattern(statesObject.editAccount.passPattern || "");
      setPublicKey(statesObject.editAccount.publicKey);
      setIsChecked({
        isDigitsChecked: statesObject.editAccount.isPassHasDigit,
        isUppercaseChecked: statesObject.editAccount.isPassHasUppercase,
        isLowercaseChecked: statesObject.editAccount.isPassHasLowercase,
        isSymbolsChecked: statesObject.editAccount.isPassHasSymbol,
      });
    }
    return () => {
      resetCreateAccountForm();
      dispatch(editAccountAction());
    };
  }, [statesObject.editAccount, dispatch]);

  const resetCreateAccountForm = () => {
    setOutput("");
    setAccountName("");
    setAccountSubname("");
    setPassLength(12);
    setPassStartsWith("");
    setPassEndsWith("");
    setKeyboardMustContain("");
    setPassAvoidChars("");
    setPassPattern("");
    setPrivateKey("");
    setPublicKey("");
    setIsValidAccount(false);
    setIsChecked({
      isDigitsChecked: true,
      isUppercaseChecked: true,
      isLowercaseChecked: true,
      isSymbolsChecked: true,
    });
  };

  // Create new account or if in edit mode update it's values and save it to the database
  const createOrEditAccount = async () => {
    setIsLoading(true);
    try {
      if (isValidAccount) {
        const currAccount = {
          accountName,
          accountSubname,
          passAvoidChars,
          passEndsWith,
          passLength,
          keyboardMustContain,
          passPattern,
          passStartsWith,
          publicKey,
          isPassHasDigit: isChecked.isDigitsChecked,
          isPassHasUppercase: isChecked.isUppercaseChecked,
          isPassHasLowercase: isChecked.isLowercaseChecked,
          isPassHasSymbol: isChecked.isSymbolsChecked,
          accountIconStyle
        };

        for (let prop in currAccount) {
          // Delete unused properties of account before upload to the database
          if (currAccount[prop] === "") {
            delete currAccount[prop];
          }
        }

        if (Object.keys(statesObject.editAccount).length > 0) {
          // In edit account mode
          await editExistsAccount(currAccount);
        } else {
          // Creat new account
          await createNewAccount(currAccount);
        }
        dispatch(accountChangedRenderAction());
        toggleCreateAccount(false);
      } else {
        setOutput("Must Generate Password");
      }
    } catch (err) {
      console.log(err.massage);
    }
  };

  const createNewAccount = async (currAccount) => {
    const config = {
      method: POST_METHOD,
      headers: {
        Authorization: `Bearer ${statesObject.loggedInUser.token}`,
      },
      data: currAccount,
    };

    await myApi(CREATE_ACCOUNT_END_POINT, config);
  }

  const editExistsAccount = async (currAccount) => {
    const updates = Object.keys(currAccount);
    const allowedUpdates = [
      "accountName",
      "accountSubname",
      "isPassHasDigit",
      "isPassHasLowercase",
      "isPassHasSymbol",
      "isPassHasUppercase",
      "passAvoidChars",
      "passEndsWith",
      "passLength",
      "keyboardMustContain",
      "passPattern",
      "passStartsWith",
      "accountIconStyle"
    ];

    // Keep only the allow to edit values of the account
    updates.forEach((update) => {
      if (!allowedUpdates.includes(update)) {
        delete currAccount[update];
      }
    });

    const config = {
      method: PUT_METHOD,
      headers: {
        Authorization: `Bearer ${statesObject.loggedInUser.token}`,
      },
      data: currAccount,
    };

    await myApi(
      `${UPDATE_ACCOUNT_END_POINT}/${statesObject.editAccount._id}`,
      config
    );
  };

  const outputPassword = () => {
    if (accountName.length > 0) {
      if (privateKey.length > 0) {
        if (
          isChecked.isDigitsChecked ||
          isChecked.isUppercaseChecked ||
          isChecked.isLowercaseChecked ||
          isChecked.isSymbolsChecked
        ) {
          if (+passLength > 0) {
            if (privateKey === confirmPrivateKey) {
              setIsValidAccount(true);

              const password = new Password(privateKey);
              const keyboardConfig = {
                avoidChars: passAvoidChars,
                isContainDigits: isChecked.isDigitsChecked,
                isContainUpperCase: isChecked.isUppercaseChecked,
                isContainLowerCase: isChecked.isLowercaseChecked,
                isContainSymbols: isChecked.isSymbolsChecked,
                mustContainChars: keyboardMustContain,
              };

              password.setKeyboard(keyboardConfig);
              setPublicKey(password.getPublicKey());

              if (passPattern.length > 0) {
                password.generateFromPattern(passPattern);
                setOutput(password.getPassword);
              } else {
                const generateConfig = {
                  passLength: +passLength,
                  passStartsWith: passStartsWith,
                  passEndsWidth: passEndsWith,
                };

                password.generate(generateConfig);
                setOutput(password.getPassword());
              }
            } else {
              setOutput(CONFIRM_NOT_MATCH_ERROR);
              setIsValidAccount(false);
            }
          } else {
            setOutput(LENGTH_MUST_BE_POSITIVE_ERROR);
            setIsValidAccount(false);
          }
        } else {
          setOutput(EMPTY_KEYBOARD_ERROR);
          setIsValidAccount(false);
        }
      } else {
        setOutput(EMPTY_PRIVATE_KEY_ERROR);
        setIsValidAccount(false);
      }
    } else {
      setOutput(EMPTY_ACCOUNT_NAME_ERROR);
      setIsValidAccount(false);
    }
  };

  // Toggle type of characters in password checkboxes
  const toggleCheckboxes = (checkboxElement, statePropertyName) => {
    const cloneIsChecked = { ...isChecked };
    cloneIsChecked[statePropertyName] = checkboxElement.checked;
    setIsChecked(cloneIsChecked);
  };

  // Validate that password length is a natural number
  const setLength = (lengthInputElement) => {
    if (isNaturalNumber(lengthInputElement.value)) {
      setPassLength(lengthInputElement.value);
    } else {
      lengthInputElement.value = +lengthInputElement.value || "";
      setPassLength(lengthInputElement.value);
    }
  };

  const isNaturalNumber = (string) => {
    return /^(?![0])\d+$(?![^\d])/.test(string);
  };

  return (
    <div className="CreateAccount">
      <div className="create-account-background">
        <form className="create-account-form">
          <div className="create-account-details">
            <fieldset className="account-details">
              <legend>{ACCOUNT_AREA_TITLE}</legend>
              <div className="account-icons-container">
                {
                  Object.keys(accountIconStyle).length === 0 ?
                  <MdNoAccounts 
                  className="toggle-icons-button"
                  onClick={() => {setIsIconsDisplay(!isIconsDisplay)}}
                /> :
                <MdAccountCircle 
                  className="toggle-icons-button"
                  style={{color: "green"}}
                  onClick={() => {setIsIconsDisplay(!isIconsDisplay)}}
                />}
                {isIconsDisplay && 
                  <AccountIcons 
                    setAccountIconStyle={setAccountIconStyle}
                />}
              </div>  
              <div className="account-details-input">
                <input
                  type="text"
                  placeholder="Name"
                  onChange={(e) => {
                    setAccountName(e.target.value);
                  }}
                  value={accountName}
                />
              </div>
              <div className="account-details-input">
                <input
                  type="text"
                  placeholder="Subname"
                  onChange={(e) => {
                    setAccountSubname(e.target.value);
                  }}
                  value={accountSubname}
                />
              </div>
            </fieldset>
            <fieldset className="password-details">
              <legend>{PASSWORD_AREA_TITLE}</legend>
              <div>
                <ToggleCharacterTypes
                  toggleCheckboxes={toggleCheckboxes}
                  isChecked={isChecked}
                />
              </div>
              <div className="password-length-container">
                <label htmlFor="password-length">{LENGTH_LABEL_TEXT}</label>
                <input
                  id="password-length"
                  type="text"
                  onChange={(e) => {
                    setLength(e.target);
                    setOutput("");
                  }}
                  value={passLength}
                  disabled={passPattern.length > 0}
                />
              </div>
              <div className="password-edges">
                <div>
                  <input
                    type="text"
                    placeholder="Starts With"
                    onChange={(e) => {
                      setPassStartsWith(e.target.value);
                      setOutput("");
                    }}
                    value={passStartsWith}
                    disabled={passPattern.length > 0}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Ends With"
                    onChange={(e) => {
                      setPassEndsWith(e.target.value);
                      setOutput("");
                    }}
                    value={passEndsWith}
                    disabled={passPattern.length > 0}
                  />
                </div>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Add To Keyboard"
                  onChange={(e) => {
                    setKeyboardMustContain(e.target.value);
                    setOutput("");
                  }}
                  value={keyboardMustContain}
                  disabled={passPattern.length > 0}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Avoid Characters"
                  onChange={(e) => {
                    setPassAvoidChars(e.target.value);
                    setOutput("");
                  }}
                  value={passAvoidChars}
                  disabled={passPattern.length > 0}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Pattern"
                  onChange={(e) => {
                    setPassPattern(e.target.value);
                    setOutput("");
                  }}
                  value={passPattern}
                />
              </div>
              <div className="private-key">
                <input
                  type="password"
                  placeholder="Private Key"
                  onChange={(e) => {
                    setPrivateKey(e.target.value);
                    setOutput("");
                  }}
                  value={privateKey}
                />
                <FcKey className="private-key-icon" />
              </div>
              <div className="confirm-private-key">
                <input
                  type="password"
                  placeholder="Confirm Key"
                  onChange={(e) => {
                    setConfirmPrivateKey(e.target.value);
                    setOutput("");
                  }}
                  value={confirmPrivateKey}
                />
              </div>
              <button
                className="generate-button"
                type="button"
                onClick={outputPassword}
              >
                {GENERATE_BUTTON_TEXT}
              </button>
            </fieldset>
          </div>
          <div>
            <input
              className="output"
              type="text"
              placeholder="Output"
              value={output}
              readOnly
            />
          </div>
          <div className="submit-container">
            <button
              className="submit-button"
              type="button"
              onClick={createOrEditAccount}
              disabled={!isValidAccount || output.length === 0}
            >
              {SUBMIT_BUTTON_TEXT}
            </button>
            {isValidAccount && output.length > 0 ? (
              <FcUnlock className="lock-icon" />
            ) : (
              <FcLock className="lock-icon" />
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
