import IconedButton from "../iconedButton/IconedButton.component";
import "./navbar.styles.scss";
import "./navbar.styles.mobile.scss";
import { FiInfo, FiLogIn } from "react-icons/fi";
import { AiOutlineQuestionCircle, AiOutlineHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loggedInUserAction } from "../../store/actions/actions";
import { myApi } from "../../api/Apis";

export default function Navbar({ isAuth }) {
  const dispatch = useDispatch();
  const statesObject = useSelector((state) => {
    return { 
      loggedInUser: state.loggedInUser
    };
  });

  const logout = async () => {
    if (isAuth) {
      try {
        const config = {
          method: "post",
          headers: { 
            Authorization: `Bearer ${statesObject.loggedInUser.token}` 
          },
        }
        await myApi(
          "users/logout",
          config
        );
        localStorage.removeItem("persist:root");
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
        <div className="user-email">
          {statesObject.loggedInUser.email}  
        </div>
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
            myStyle={{ fontSize: "2vmin" }}
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
