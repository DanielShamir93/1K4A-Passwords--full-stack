import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@material-ui/core/Box";
import PasswordInput from "../../components/mui/PasswordInput.components";
import TextFieldInput from "../../components/mui/TextFieldInput.component";
import { useSelector } from "react-redux";
import BasicButton from "../../components/mui/BasicButton.component";
import { useDispatch } from "react-redux";
import { loggedInUserAction } from "../../store/actions/actions";
import Spinner from "../../components/spinner/Spinner.component";
import "./login.styles.scss";
import { usersApi } from "../../api/Apis";

export default function Login() {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const statesObject = useSelector((state) => {
    return {
      email: state.email,
      password: state.password
    };
  });

  const login = async () => {
    try {
      setIsLoading(true);
      isValidInput();

      const { data } = await usersApi.post("/login", {
        email: statesObject.email,
        password: statesObject.password
      });
      const user = data.user;
      const token = data.token;
      
      dispatch(loggedInUserAction({ uid: user._id, email: user.email, token, isAuth: true }));
      navigate("/");
    } catch (err) {
      setComment(err.message);
      setIsLoading(false);
    }
  };

  const isValidInput = () => {
    if (statesObject.email === "") {
      throw new Error("Missing email");
    } else if (statesObject.password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }
  };

  return (
    <div className="Login">
      <div className="login-view">
        <p className="login-title">Login</p>
        <p className="login-comment">{comment}</p>
        <div className="login-box">
          <div className="login-box-inputs">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                height: 200,
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
    </div>
  );
}
