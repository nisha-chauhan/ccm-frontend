import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import img from "../assets/login.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // const [variable, setVariable] = useState(initial - value);
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handelPasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const showAlert = async (e) => {
    e.preventDefault();
    if (email && password) {
      setLoading(true);

      try {
        const response = await axios.post("http://localhost:5000/login", {
          email,
          password,
        });
        console.log(response.status);
        if (response.status === 200) {
          return navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    }
    //   window.alert(`your email is: ${email} \n your password is: ${password}`);
    // } else {
    //   window.alert(`email and password are required`);
    // }
  };

  return (
    <>
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
            <form action="" onSubmit={showAlert}>
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
                <input
                  type="text"
                  value={password}
                  onChange={handelPasswordChange}
                  placeholder="Enter password"
                />
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
