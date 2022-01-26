import * as React from "react";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import { useDispatch, useSelector } from "react-redux";
import { setEmailAction } from "../../store/actions/actions";

export default function TextFieldInput(props) {
  const dispatch = useDispatch();
  const statesObject = useSelector((state) => {
    return {
      email: state.email,
    };
  });

  const handleChange = (e) => {
    dispatch(setEmailAction(e.target.value));
  };

  return (
    <FormControl
      sx={{ m: 1, width: "60vw", maxWidth: "500px" }}
      variant="outlined"
    >
      <TextField
        label={props.label}
        onChange={(e) => {
          handleChange(e);
        }}
        value={statesObject.email}
      />
    </FormControl>
  );
}
