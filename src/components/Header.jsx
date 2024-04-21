import React from "react";
import {Link} from "react-router-dom";
const Header = () => {
  return (
    <>
      <nav>
        <h1>LogoHere</h1>
        <main>
          <Link to={"/#Home"}> Home</Link>
          <Link to={"/login"}> Login</Link>
          <Link to={"/signUp"}> SignUp</Link>
        </main>
      </nav>
    </>
  );
};

export default Header;
