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
              <Navbar />
              <LandingPage />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Navbar />
              <Login />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <Navbar />
              <About />
            </>
          }
        />
        <Route
          path="/tutorial"
          element={
            <>
              <Navbar />
              <Tutorial />
            </>
          }
        />
      </Routes>
    </Router>
  );
}
