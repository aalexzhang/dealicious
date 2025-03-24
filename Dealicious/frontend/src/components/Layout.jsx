import React from "react";
import Navbar from "./NavBar";
import Footer from "./Footer";
import "../style.css";

const Layout = ({ children }) => {
  return (
    <div className="pageWrapper">
      <Navbar />
      <div className="pageContent">{children}</div> 
      <Footer />
    </div>
  );
};

export default Layout;
