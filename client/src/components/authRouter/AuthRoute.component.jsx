import { Routes, Route } from "react-router-dom";
import Home from "../home/Home.component";
import Navbar from "../navbar/Navbar.component";
import About from "../about/About.component";
import Tutorial from "../tutorial/Tutorial.component";
import { FRONTEND_ROUTES_CONSTANTS } from "../../constants/frontendRoutes.constants";
import { AccountProvider } from "../home/context/home.context";

export default function AuthRouter() {
  const { INDEX_ROUTE, ABOUT_ROUTE, TUTORIAL_ROUTE } =
    FRONTEND_ROUTES_CONSTANTS;

  return (
    <>
      <Navbar isAuth={true} />
      <Routes>
        <Route
          path={INDEX_ROUTE}
          element={
            <AccountProvider>
              <Home />
            </AccountProvider>
          }
        />
        <Route path={ABOUT_ROUTE} element={<About />} />
        <Route path={TUTORIAL_ROUTE} element={<Tutorial />} />
      </Routes>
    </>
  );
}
