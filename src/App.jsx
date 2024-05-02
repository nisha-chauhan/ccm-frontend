import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Error from "./components/Error";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Image from "./components/Image";
import Ne from "./components/Ne";

import "./styles/header.css";
import "./styles/app.css";
import "./styles/footer.css";
import "./styles/login.css";
import "./styles/signup.css";
import "./styles/forgotPassword.css";
import "./styles/resetPassword.css";
import "./styles/image.css";

import "./styles/mediaQuery.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/upload" element={<Image />} />
          <Route path="/error" element={<Error />} />
          <Route path="/ne" element={<Ne />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
