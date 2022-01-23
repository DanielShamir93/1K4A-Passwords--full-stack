import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/landing-page/LandingPage.component";
import { Fragment } from "react";
import Login from "./pages/login/Login.component";
import Home from "./pages/home/Home.component";
// import ProtectedRoute from "./components/protectedRoute/ProtectedRoute.component";
// import AuthRoute from "./components/authRoute/AuthRoute.component";
import Navbar from "./components/navbar/Navbar.component";
import About from "./pages/about/About.component";
import Tutorial from "./pages/tutorial/Tutorial.component";
import { useSelector } from "react-redux";

function App() {

  const statesObject = useSelector((state) => {
    return { loggedInUser: state.loggedInUser };
  }); 

  return (
    <Router>
      <Routes>
        <Route path="*" element={
          <>
            <Navbar />
            {statesObject.loggedInUser.isAuth ? <Home /> : <LandingPage /> }
          </>
        } />
        <Route path="/login" element={
          <>
            <Navbar />
            {statesObject.loggedInUser.isAuth ? <Home /> : <Login /> }
          </>
        } />
        <Route path="/about" element={
          <>
            <Navbar />
            <About />
          </>
        } />
        <Route path="/tutorial" element={
          <>
            <Navbar />
            <Tutorial />
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;
