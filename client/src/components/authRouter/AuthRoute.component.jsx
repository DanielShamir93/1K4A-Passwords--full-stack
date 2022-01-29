import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../home/Home.component';
import Navbar from '../navbar/Navbar.component';
import About from '../about/About.component';
import Tutorial from '../tutorial/Tutorial.component';
import { FRONTEND_ROUTES_CONSTANTS } from "../../constants/frontendRoutes.constants";

export default function AuthRouter() {
  const { INDEX_ROUTE, ABOUT_ROUTE, TUTORIAL_ROUTE } = FRONTEND_ROUTES_CONSTANTS;

  return (
    <Router>
      <Routes>
        <Route
          path={INDEX_ROUTE}
          element={
            <>
              <Navbar isAuth={true} />
              <Home />
            </>
          }
        />
        <Route
          path={ABOUT_ROUTE}
          element={
            <>
              <Navbar isAuth={true} />
              <About />
            </>
          }
        />
        <Route
          path={TUTORIAL_ROUTE}
          element={
            <>
              <Navbar isAuth={true} />
              <Tutorial />
            </>
          }
        />
      </Routes>
    </Router>
  );
}
