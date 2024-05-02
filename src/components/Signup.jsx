import { useState } from "react";
import img from "../assets/login.jpg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";
import Header from "./Header";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handelName = (e) => {
    setName(e.target.value);
  };
  const handelEmail = (e) => {
    setEmail(e.target.value);
  };
  const handelPassword = (e) => {
    setPassword(e.target.value);
  };
  const handelConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const showSignupDetails = async (e) => {
    e.preventDefault();
    if (email && password) {
      setLoading(true);

      try {
        const response = await axios.post("http://localhost:5000/signup", {
          name,
          email,
          password,
        });
        console.log(response.status);
        if (response.status === 200) {
          enqueueSnackbar("Signup Complete");

          return navigate("/");
        } else {
          return navigate("/error");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Header />
      <div className="signupContainer">
        <main>
          <div className="imgContainer">
            <img src={img} alt="" />
          </div>
          <div className="formContainer">
            <div className="heading">
              <h1>Signup</h1>
              <p>
                Already have an account.{" "}
                <Link
                  to={"/login"}
                  style={{
                    textDecoration: "underline",
                    color: "#a480f2",
                    font: " 900 1rem cursive",
                  }}
                >
                  Login
                </Link>
              </p>
            </div>
            <form onSubmit={showSignupDetails}>
              <div>
                <label htmlFor="">Enter name</label>
                <input
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={handelName}
                />
              </div>
              <div>
                <label htmlFor="">Enter email</label>
                <input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={handelEmail}
                />
              </div>
              <div>
                <label htmlFor="">Enter password</label>
                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={handelPassword}
                />
              </div>
              <div>
                <label htmlFor="">Confirm password </label>
                <input
                  type="password"
                  placeholder="Enter confirm password"
                  value={confirmPassword}
                  onChange={handelConfirmPassword}
                />
              </div>
              <button>
                Signup {loading && <div className="loader"></div>}
              </button>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default Signup;
