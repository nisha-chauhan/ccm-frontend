import { useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handelNameChange = (e) => {
    setName(e.target.value);
  };

  const handelEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handelPasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handelConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const showSignupDetails = async (event) => {
    event.preventDefault();
    const missingFields = [];
    if (!name) missingFields.push("Name");
    if (!email) missingFields.push("Email");
    if (!password) missingFields.push("Password");
    if (!confirmPassword) missingFields.push("Confirm Password");

    if (missingFields.length > 0) {
      window.alert(
        "The following fields are missing: " + missingFields.join(", ")
      );
    } else {
      if (password !== confirmPassword) {
        window.alert("Password and Confirm Password must be same.");
        return;
      }
      // window.alert(
      //   `Signup button is clicked \n Your details are:\n Name: ${name}\nEmail: ${email}\nPassword: ${password}\nConfirm Password: ${confirmPassword}`
      // );
      try {
        const response = await axios.post("http://localhost:5000/signup", {
          name,
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
  };

  return (
    <div className="signup">
      <main>
        <h1>Signup Here</h1>
        <form onSubmit={showSignupDetails}>
          <div>
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={handelNameChange}
            />
          </div>
          <div>
            <label htmlFor="">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={handelEmailChange}
            />
          </div>
          <div>
            <label htmlFor="">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={handelPasswordChange}
            />
          </div>
          <div>
            <label htmlFor="">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={handelConfirmPasswordChange}
            />
          </div>
          <button type="submit">Signup</button>
        </form>
      </main>
    </div>
  );
};

export default Signup;
