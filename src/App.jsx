import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Header from "./components/Header";
import Footer from "./components/Footer";

import "./styles/header.css";
import "./styles/app.css";
import "./styles/footer.css";
import "./styles/home.css";
import "./styles/login.css";
import "./styles/signup.css";
import "./styles/mediaQuery.css";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
