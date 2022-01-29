import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@material-ui/core/Box";
import PasswordInput from "../../../../components/mui/PasswordInput.components";
import TextFieldInput from "../../../../components/mui/TextFieldInput.component";
import BasicButton from "../../../../components/mui/BasicButton.component";
import UnderlineLink from "../../../../components/mui/UnderlineLink.component";
import { loggedInUserAction } from "../../../../store/actions/actions";
import Spinner from "../../../../components/spinner/Spinner.component";
import myApi from "../../../../api/Apis";
import { ERROR_MESSAGES_CONSTANTS, TEXT_CONSTANTS } from "../../../../constants/signup.constants";
import { USERS_END_POINTS_CONSTANTS } from "../../../../constants/httpRequests.constants";
import { FRONTEND_ROUTES_CONSTANTS } from "../../../../constants/frontendRoutes.constants";
import "./signup.styles.scss";
import "./signup.styles.mobile.scss";

export default function Signup() {
  const { EMAIL_EMPTY_ERROR, PASSWORD_TOO_SHORT_ERROR, CONFIRM_MATCH_ERROR } = ERROR_MESSAGES_CONSTANTS;
  const { SIGN_UP_TITLE, HAVE_ACCOUNT_ALREADY_TEXT } = TEXT_CONSTANTS;
  const { SIGNUP_END_POINT } = USERS_END_POINTS_CONSTANTS;
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const statesObject = useSelector((state) => {
    return {
      email: state.email,
      password: state.password,
      confirm: state.confirm,
    };
  });

  const signup = async () => {
    try {
      setIsLoading(true);
      isValidInput();

      const { data } = await myApi.post(SIGNUP_END_POINT, {
        email: statesObject.email,
        password: statesObject.password,
      });
      const user = data.user;
      const token = data.token;

      dispatch(loggedInUserAction({ uid: user._id, email: user.email, token }));
    } catch (err) {
      setComment(err.message);
      setIsLoading(false);
    }
  };

  const isValidInput = () => {
    if (statesObject.email === "") {
      throw new Error(EMAIL_EMPTY_ERROR);
    } else if (statesObject.password.length < 6) {
      throw new Error(PASSWORD_TOO_SHORT_ERROR);
    } else if (statesObject.password !== statesObject.confirm) {
      throw new Error(CONFIRM_MATCH_ERROR);
    }
  };

  return (
    <div className="Signup">
      <div className="signup-view">
        <p className="signup-title">{SIGN_UP_TITLE}</p>
        <div className="signup-box">
          <div className="signup-box-inputs">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                height: 300,
                alignItems: "center",
              }}
            >
              <p className="signup-comment">{comment}</p>
              <div className="email">
                <TextFieldInput label="email" />
              </div>
              <div className="password">
                <PasswordInput label="password" />
              </div>
              <div className="confirm">
                <PasswordInput label="confirm" />
              </div>
            </Box>
          </div>
          <div className="submit-button">
            <BasicButton label="submit" variant="contained" cb={signup} />
          </div>
        </div>
        <div className="to-login">
          <span className="to-login-text">{HAVE_ACCOUNT_ALREADY_TEXT}</span>
          <UnderlineLink label="Login" underline="hover" linkTo="/login" />
        </div>
      </div>
      {isLoading && <Spinner />}
    </div>
  );
}
