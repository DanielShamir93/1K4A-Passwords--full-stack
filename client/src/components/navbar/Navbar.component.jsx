import IconedButton from "../iconedButton/IconedButton.component";
import { FiInfo, FiLogIn } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineQuestionCircle, AiOutlineHome } from "react-icons/ai";
import { loggedInUserAction } from "../../store/actions/actions";
import myApi from "../../api/Apis";
import { USERS_END_POINTS_CONSTANTS, HTTP_METHODS_CONSTANTS } from "../../constants/httpRequests.constants";
import "./navbar.styles.scss";
import "./navbar.styles.mobile.scss";

export default function Navbar({ isAuth }) {
  const { LOGOUT_END_POINT } = USERS_END_POINTS_CONSTANTS;
  const { POST_METHOD } = HTTP_METHODS_CONSTANTS;
  const dispatch = useDispatch();
  const { loggedInUser } = useSelector((state) => {
    return {
      loggedInUser: state.loggedInUser,
    };
  });

  const logout = async () => {
    if (isAuth) {
      try {
        const config = {
          method: POST_METHOD,
          headers: {
            Authorization: `Bearer ${loggedInUser.token}`,
          },
        };
        await myApi(LOGOUT_END_POINT, config);
        dispatch(loggedInUserAction());
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  return (
    <div className="Navbar">
      <div className="leftside">
        <figure className="logo"></figure>
        <Link to="/">
          <IconedButton
            reactIconComponent={<AiOutlineHome className="react-home-icon" />}
          />
        </Link>
        <div className="user-email">{loggedInUser.email}</div>
      </div>
      <div className="rightside">
        <Link to={"/tutorial"}>
          <IconedButton
            term="Tutorial"
            reactIconComponent={
              <AiOutlineQuestionCircle className="react-icon" />
            }
          />
        </Link>
        <Link to={"/about"}>
          <IconedButton
            term="About"
            reactIconComponent={<FiInfo className="react-icon" />}
          />
        </Link>
        <Link to={isAuth ? "/" : "/login"}>
          <IconedButton
            onClick={logout}
            term={isAuth ? "Logout" : "Login"}
            reactIconComponent={<FiLogIn className="react-icon" />}
          />
        </Link>
      </div>
    </div>
  );
}
