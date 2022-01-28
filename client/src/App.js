import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { myApi } from "./api/Apis";
import AuthRouter from "./components/authRouter/AuthRoute.component";
import UnauthRouter from "./components/unauthRouter/UnauthRouter.component";

function App() {
  let [isAuth, setIsAuth] = useState(false);
  const { loggedInUser } = useSelector((state) => {
    return { loggedInUser: state.loggedInUser };
  });

  useEffect(() => {
    checkAuth();
  }, [loggedInUser]);

  const checkAuth = async () => {
    const config = {
      method: "get",
      headers: {
        Authorization: `Bearer ${loggedInUser.token}`,
      },
    };
    try {
      await myApi("users/me", config);
      setIsAuth(true);
    } catch (err) {
      setIsAuth(false);
      console.log(err.message);
    }
  };

  return (
    <div>
      {isAuth ? <AuthRouter /> : <UnauthRouter />}
    </div>
  );
}

export default App;
