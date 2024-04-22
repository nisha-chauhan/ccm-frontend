import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";

import "./styles/header.css";
import "./styles/app.css";
import "./styles/footer.css";
import "./styles/home.css";
import "./styles/login.css";
import "./styles/signup.css";
import "./styles/mediaQuery.css";
import Layout from "./components/Layout";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Layout showFooter={true}>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/login"
            element={
              <Layout>
                <Login />
              </Layout>
            }
          />
          <Route
            path="/signup"
            element={
              <Layout>
                <Signup />
              </Layout>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
