import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState(false);
  const [token, setToken] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handelPassword = (e) => {
    setPassword(e.target.value);
  };

  const handelConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const submitClickHandle = async (e) => {
    e.preventDefault();
    setLoader(true);

    if (password && confirmPassword) {
      const response = await axios.post(
        "http://localhost:5000/reset-password",
        { password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        enqueueSnackbar("Password changed successfully");

        return navigate("/login");
      } else {
        return navigate("/error");
      }
    }
    setLoader(false);
  };

  useEffect(() => {
    const parsed = queryString.parse(location.search);
    setToken(parsed.token);
  }, []);

  return (
    <div>
      <div className="resetContainer">
        <form onSubmit={submitClickHandle}>
          <div className="heading">
            <h1>Reset Password</h1>
          </div>
          <div>
            <label htmlFor="">Enter password</label>
            <div className="inputBtn">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                name="password"
                id=""
                value={password}
                onChange={handelPassword}
              />
              <button className="iconBtn" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="">Confirm password</label>
            <div className="inputBtn">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm password"
                name="password"
                id=""
                value={confirmPassword}
                onChange={handelConfirmPassword}
              />
              <button className="iconBtn" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <button type="submit">
            Submit {loader && <div className="loader"></div>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
