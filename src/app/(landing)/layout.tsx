import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const layout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default layout;