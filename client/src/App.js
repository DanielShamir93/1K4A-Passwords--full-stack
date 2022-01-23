import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import LandingPage from "./pages/landing-page/LandingPage.component";
import Login from "./pages/login/Login.component";
import Home from "./pages/home/Home.component";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute.component";
import AuthRoute from "./components/authRoute/AuthRoute.component";
import Navbar from "./components/navbar/Navbar.component";
import About from "./pages/about/About.component";
import Tutorial from "./pages/tutorial/Tutorial.component";

function App() {
  return (
    <Router>
      <Navbar />
      <AuthRoute path="/" redirectPath="/home" exact component={LandingPage} />
      <AuthRoute path="/login" redirectPath="/home" component={Login} />
      <ProtectedRoute path="/home" redirectPath="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/tutorial" component={Tutorial} />
    </Router>
  );
}

export default App;
