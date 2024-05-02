import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import img from "../assets/login.jpg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useSnackbar } from "notistack";
import Header from "./Header";

const Login = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handelPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handelLoginClick = async (e) => {
    e.preventDefault();
    if (email && password) {
      setLoading(true);

      try {
        const response = await axios.post("http://localhost:5000/login", {
          email,
          password,
        });

        if (response.status === 200) {
          enqueueSnackbar("Login successfull");

          localStorage.setItem(
            "userData",
            JSON.stringify(response.data.userData)
          );

          return navigate("/");
        } else {
          return navigate("/error");
        }
      } catch (error) {
        console.log(error);
      }
    }
    setLoading(false);
  };

  //jsx file
  return (
    <>
      <Header />
      <div className="loginContainer">
        <main>
          <div className="imgDiv">
            <img src={img} alt="login image" />
          </div>

          <div className="formDiv">
            <div className="heading">
              <h1>Login</h1>
              <p>
                Doesn&apos;t have an account yet?{" "}
                <Link
                  to={"/signUp"}
                  style={{
                    textDecoration: "underline",
                    color: "#a480f2",
                    font: " 900 1rem cursive",
                  }}
                >
                  SignUp
                </Link>
              </p>
            </div>

            <form action="" onSubmit={handelLoginClick}>
              <div>
                <label htmlFor="">Email</label>
                <input
                  type="text"
                  value={email}
                  placeholder="Enter email"
                  onChange={handleEmailChange}
                />
              </div>

              <div>
                <label htmlFor="">Password</label>

                <div className="passwordInput">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={handelPasswordChange}
                    placeholder="Enter password"
                  />

                  <p>
                    <Link
                      to={"/forgot-password"}
                      style={{
                        textDecoration: "underline",
                        color: "#a480f2",
                        font: " 900 1rem cursive",
                        float: "right",
                      }}
                    >
                      Forgot password
                    </Link>
                  </p>

                  <button
                    className="iconBtn"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <button type="submit">
                Login
                {loading && <div className="loader"></div>}
              </button>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default Login;
