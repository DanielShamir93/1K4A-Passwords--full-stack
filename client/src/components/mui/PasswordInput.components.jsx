import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setPasswordAction,
  setConfirmAction,
} from "../../store/actions/actions";

export default function PasswordInput(props) {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const statesObject = useSelector((state) => {
    return {
      password: state.password,
      confirm: state.confirm,
    };
  });

  const handleChange = (e) => {
    if (props.label === "password") {
      dispatch(setPasswordAction(e.target.value));
    } else if (props.label === "confirm") {
      dispatch(setConfirmAction(e.target.value));
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  return (
    <FormControl
      sx={{ m: 1, width: "60vw", maxWidth: "500px" }}
      variant="outlined"
    >
      <InputLabel htmlFor="outlined-adornment-password">
        {props.label}
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? "text" : "password"}
        value={statesObject[props.label]}
        onChange={(e) => {
          handleChange(e);
        }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={(e) => {
                handleMouseDownPassword(e);
              }}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
    </FormControl>
  );
}
