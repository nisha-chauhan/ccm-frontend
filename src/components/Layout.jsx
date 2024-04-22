// import React from 'react'

import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children, showFooter }) => {
  return (
    <div>
      <Header />
      {children}
      {/* {showFooter ? <Footer /> : <></>} */}
      {showFooter && <Footer />}
    </div>
  );
};

export default Layout;
