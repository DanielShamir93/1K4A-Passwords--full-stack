import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthRouter from "./components/authRouter/AuthRoute.component";
import UnauthRouter from "./components/unauthRouter/UnauthRouter.component";
import {
  USERS_END_POINTS_CONSTANTS,
  HTTP_METHODS_CONSTANTS,
} from "./constants/httpRequests.constants";
import myApi from "./api/Apis";

function App() {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);
  const { loggedInUser } = useSelector((state) => {
    return { loggedInUser: state.loggedInUser };
  });

  const { ME_END_POINT } = USERS_END_POINTS_CONSTANTS;
  const { GET_METHOD } = HTTP_METHODS_CONSTANTS;

  const ME_END_POINT_CONFIG = {
    method: GET_METHOD,
    headers: {
      Authorization: `Bearer ${loggedInUser.token}`,
    },
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await myApi(ME_END_POINT, ME_END_POINT_CONFIG);
        setIsAuth(true);
        navigate('/'); // For when logging-in change the url endpoint
      } catch (err) {
        localStorage.removeItem("persist:root");
        setIsAuth(false);
        console.log(err.message);
      }
    };
    checkAuth();
  }, [loggedInUser]);

  return <>{isAuth ? <AuthRouter /> : <UnauthRouter />}</>;
}

export default App;
