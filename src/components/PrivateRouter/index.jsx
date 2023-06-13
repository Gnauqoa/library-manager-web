import React from "react";

import { CircularProgress } from "@mui/material";
import { useLocation, Outlet, Navigate } from "react-router-dom";

import { useSelector } from "react-redux";

const PrivateRouter = () => {
  const loginStatus = useSelector((state) => state.loginStatus);
  const location = useLocation();
  if (!loginStatus.isChecking) {
    if (loginStatus.isLogin) return <Outlet />;
    return <Navigate state={{ from: location }} to={`/auth/login`} />;
  }
  return (
    <div className="flex flex-col w-full h-screen items-center justify-center">
      <CircularProgress />
    </div>
  );
};

export default PrivateRouter;
