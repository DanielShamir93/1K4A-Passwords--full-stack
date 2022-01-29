import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../landing-page/LandingPage.component";
import Login from "../login/Login.component";
import Navbar from "../navbar/Navbar.component";
import About from "../about/About.component";
import Tutorial from "../tutorial/Tutorial.component";
import { FRONTEND_ROUTES_CONSTANTS } from "../../constants/frontendRoutes.constants";

export default function UnauthRouter() {
  const { INDEX_ROUTE, LOGIN_ROUTE, ABOUT_ROUTE, TUTORIAL_ROUTE } = FRONTEND_ROUTES_CONSTANTS;

  return (
    <Router>
      <Routes>
        <Route
          path={INDEX_ROUTE}
          element={
            <>
              <Navbar isAuth={false} />
              <LandingPage />
            </>
          }
        />
        <Route
          path={LOGIN_ROUTE}
          element={
            <>
              <Navbar isAuth={false} />
              <Login />
            </>
          }
        />
        <Route
          path={ABOUT_ROUTE}
          element={
            <>
              <Navbar isAuth={false} />
              <About />
            </>
          }
        />
        <Route
          path={TUTORIAL_ROUTE}
          element={
            <>
              <Navbar isAuth={false} />
              <Tutorial />
            </>
          }
        />
      </Routes>
    </Router>
  );
}
