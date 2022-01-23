import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LandingPage from "./pages/landing-page/LandingPage.component";
import Login from "./pages/login/Login.component";
import Home from "./pages/home/Home.component";
import Navbar from "./components/navbar/Navbar.component";
import About from "./pages/about/About.component";
import Tutorial from "./pages/tutorial/Tutorial.component";

function App() {
  const statesObject = useSelector((state) => {
    return { loggedInUser: state.loggedInUser };
  });

  return (
    <Router>
      <Routes>
        <Route
          path="*"
          element={
            <>
              <Navbar />
              {statesObject.loggedInUser.isAuth ? <Home /> : <LandingPage />}
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Navbar />
              {statesObject.loggedInUser.isAuth ? <Home /> : <Login />}
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
