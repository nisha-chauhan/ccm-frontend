import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    if (storedUserData) {
      setUserData(storedUserData);
    }
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("userData");
    setUserData(null);
  };

  return (
    <>
      <nav>
        <h1>LogoHere</h1>
        <main>
          <Link to={"/#Home"}>Home</Link>
          {!userData && <Link to={"/login"}>Login</Link>}
          {!userData && <Link to={"/signUp"}>SignUp</Link>}
          {userData && <Link to={"/upload"}>Upload</Link>}
          {userData && <Link onClick={handleLogout}>Logout</Link>}
        </main>
      </nav>
    </>
  );
};

export default Header;
