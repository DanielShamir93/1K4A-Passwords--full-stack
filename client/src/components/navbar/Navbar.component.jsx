import IconedButton from "../iconedButton/IconedButton.component";
import "./navbar.styles.scss";
import "./navbar.styles.mobile.scss";
import { FiInfo, FiLogIn } from "react-icons/fi";
import { AiOutlineQuestionCircle, AiOutlineHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import { isAuthAction } from "../../store/actions/actions";

export default function Navbar() {
  const dispatch = useDispatch();
  const statesObject = useSelector((state) => {
    return { 
      isAuth: state.isAuth,
      loggedInUser: state.loggedInUser
    };
  });

  const logout = async () => {
    try {
      await signOut(auth);
      dispatch(isAuthAction(false));
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="Navbar">
      <div className="leftside">
        <figure className="logo"></figure>
        <Link to="/home">
          <IconedButton
            reactIconComponent={<AiOutlineHome className="react-home-icon" />}
          />
        </Link>
        { statesObject.isAuth &&
          <div className="user-email">
          {statesObject.loggedInUser.email}  
          </div> 
        }
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
        <Link to={statesObject.isAuth ? "/home" : "login"}>
          <IconedButton
            onClick={logout}
            term={statesObject.isAuth ? "Logout" : "Login"}
            reactIconComponent={<FiLogIn className="react-icon" />}
          />
        </Link>     
      </div>
    </div>
  );
}
