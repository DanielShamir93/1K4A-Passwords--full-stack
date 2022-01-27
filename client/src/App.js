import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LandingPage from "./components/landing-page/LandingPage.component";
import Login from "./components/login/Login.component";
import Home from "./components/home/Home.component";
import Navbar from "./components/navbar/Navbar.component";
import About from "./components/about/About.component";
import Tutorial from "./components/tutorial/Tutorial.component";

function App() {
  
  const statesObject = useSelector((state) => {
    return { loggedInUser: state.loggedInUser };
  });

  const isAuth = statesObject.loggedInUser.hasOwnProperty("isAuth") ? statesObject.loggedInUser.isAuth : false;

  return (
    <Router>
      <Routes>
        <Route
          path="*"
          element={
            <>
              <Navbar />
              {isAuth ? <Home /> : <LandingPage />}
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Navbar />
              {isAuth ? <Home /> : <Login />}
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

export default App;
