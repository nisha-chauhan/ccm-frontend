import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handelEmail = (e) => {
    setEmail(e.target.value);
  };
  const submitClick = async (e) => {
    e.preventDefault();
    setLoader(true);
    if (email) {
      const response = await axios.post(
        "http://localhost:5000/forgot-password",
        { email }
      );
      console.log(response);
      if (response.status === 200) {
        enqueueSnackbar("Reset password email sent.");

        setTimeout(() => {
          // window.alert("Email has been sent");

          return navigate("/login");
        }, 5000);
      } else {
        return navigate("/error");
      }
    }
    setLoader(false);
  };
  return (
    <div>
      <div className="container">
        <form onSubmit={submitClick}>
          <div className="heading">
            <h1>Forgot Password</h1>
          </div>

          <div>
            <label>Enter email</label>
            <input
              type="email"
              placeholder="Enter email"
              onChange={handelEmail}
              value={email}
            />
          </div>
          <button type="submit">
            Submit
            {loader && <div className="loader"></div>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
