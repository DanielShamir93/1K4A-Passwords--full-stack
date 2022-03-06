import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@material-ui/core/Box";
import PasswordInput from "../../components/mui/PasswordInput.components";
import TextFieldInput from "../../components/mui/TextFieldInput.component";
import BasicButton from "../../components/mui/BasicButton.component";
import { loggedInUserAction } from "../../store/actions/actions";
import Spinner from "../../components/spinner/Spinner.component";
import myApi from "../../api/Apis";
import { USERS_END_POINTS_CONSTANTS } from "../../constants/httpRequests.constants";
import { TEXT_CONSTANTS, ERROR_MESSAGES_CONSTANTS } from "../../constants/login.constants";
import "./login.styles.scss";

export default function Login() {
  const { LOGIN_END_POINT } = USERS_END_POINTS_CONSTANTS;
  const { EMAIL_EMPTY_ERROR, PASSWORD_TOO_SHORT_ERROR } = ERROR_MESSAGES_CONSTANTS;
  const { LOGIN_TITLE } = TEXT_CONSTANTS;
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const statesObject = useSelector((state) => {
    return {
      email: state.email,
      password: state.password
    };
  });

  const login = async () => {
    setIsLoading(true);
    try {
      isValidInput();
      const { data } = await myApi.post(LOGIN_END_POINT, {
        email: statesObject.email,
        password: statesObject.password
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
    } else if (statesObject.password.length < 5) {
      throw new Error(PASSWORD_TOO_SHORT_ERROR);
    }
  };

  return (
    <form className="Login" autocomplete="off">
      <div className="login-view">
        <p className="login-title">{LOGIN_TITLE}</p>
        <p className="login-comment">{comment}</p>
        <div className="login-box">
          <div className="login-box-inputs">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                height: 200,
                alignItems: "center",
              }}
            >
              <div className="email">
                <TextFieldInput label="email" />
              </div>
              <div className="password">
                <PasswordInput label="password" />
              </div>
            </Box>
          </div>
          <BasicButton label="login" variant="contained" cb={login} />
        </div>
      </div>
      {isLoading && <Spinner />}
    </form>
  );
}
