import React from "react";

import { CircularProgress, Container } from "@mui/material";
import { useLocation, Outlet, Navigate } from "react-router-dom";

import { useSelector } from "react-redux";
import MenuNavigate from "./MenuNavigate";

const ManagerRouter = () => {
  const loginStatus = useSelector((state) => state.loginStatus);
  const location = useLocation();
  if (!loginStatus.isChecking) {
    if (loginStatus.isLogin)
      return (
        <Container>
          <div className="flex flex-row gap-[80px] py-[60px]">
            <MenuNavigate />
            <Outlet />
          </div>
        </Container>
      );
    return <Navigate state={{ from: location }} to={`/auth/login`} />;
  }
  return (
    <div className="flex flex-col w-full h-screen items-center justify-center">
      <CircularProgress />
    </div>
  );
};

export default ManagerRouter;
