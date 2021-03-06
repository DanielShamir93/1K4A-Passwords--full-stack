import { useDispatch, useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";
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
      <TextField
        autoFocus
        variant="outlined"
        label={props.label}
        onChange={(e) => { handleChange(e) }}
        value={statesObject.email}
        style={{width: "300px"}}
      />
  );
}
