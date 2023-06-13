import React from "react";
import AppBar from "components/AppBar";
import { Outlet } from "react-router-dom";
import Footer from "components/Footer";

const NormalLayout = () => {
  return (
    <div className="flex flex-col">
      <AppBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default NormalLayout;
