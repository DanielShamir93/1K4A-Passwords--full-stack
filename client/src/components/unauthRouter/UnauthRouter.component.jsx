import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../landing-page/LandingPage.component";
import Login from "../login/Login.component";
import Navbar from "../navbar/Navbar.component";
import About from "../about/About.component";
import Tutorial from "../tutorial/Tutorial.component";

export default function UnauthRouter() {
  return (
    <Router>
      <Routes>
        <Route
          path="*"
          element={
            <>
              <Navbar isAuth={false} />
              <LandingPage />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Navbar isAuth={false} />
              <Login />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <Navbar isAuth={false} />
              <About />
            </>
          }
        />
        <Route
          path="/tutorial"
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
