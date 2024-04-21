import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    <div className="login">
      <main>
        <h1>Login Here</h1>
        <form onSubmit={showAlert}>
          <div>
            <label htmlFor="">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={handleEmailChange}
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
          <button type="submit">Login</button>
        </form>
      </main>
    </div>
  );
};

export default Login;
