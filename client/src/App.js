import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import AuthRouter from "./components/authRouter/AuthRoute.component";
import UnauthRouter from "./components/unauthRouter/UnauthRouter.component";
import { USERS_END_POINTS, HTTP_METHODS } from "./constants/httpRequests.constants";
import myApi from "./api/Apis";

function App() {
  const { ME_END_POINT } = USERS_END_POINTS;
  const { GET_METHOD } = HTTP_METHODS;
  let [isAuth, setIsAuth] = useState(false);
  const { loggedInUser } = useSelector((state) => {
    return { loggedInUser: state.loggedInUser };
  });

  useEffect(() => {
    checkAuth();
  }, [loggedInUser]);

  const checkAuth = async () => {
    const config = {
      method: GET_METHOD,
      headers: {
        Authorization: `Bearer ${loggedInUser.token}`,
      },
    };
    try {
      await myApi(ME_END_POINT, config);
      setIsAuth(true);
    } catch (err) {
      localStorage.removeItem("persist:root");
      setIsAuth(false);
      console.log(err.message);
    }
  };

  return <div>{isAuth ? <AuthRouter /> : <UnauthRouter />}</div>;
}

export default App;
