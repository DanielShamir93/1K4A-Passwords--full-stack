import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../home/Home.component';
import Navbar from '../navbar/Navbar.component';
import About from '../about/About.component';
import Tutorial from '../tutorial/Tutorial.component';

export default function AuthRouter() {
  return (
    <Router>
      <Routes>
        <Route
          path="*"
          element={
            <>
              <Navbar isAuth={true} />
              <Home />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <Navbar isAuth={true} />
              <About />
            </>
          }
        />
        <Route
          path="/tutorial"
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
