import React, { useEffect } from "react";
import AuthBackground from "assets/img/auth_background.png";
import { Outlet } from "react-router";
import { CircularProgress, SvgIcon, Typography } from "@mui/material";
import { ReactComponent as Logo } from "assets/img/logo.svg";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthLayout = () => {
  const loginStatus = useSelector((state) => state.loginStatus);
  const navigate = useNavigate();
  useEffect(() => {
    if (loginStatus.isLogin) navigate("/dashboard");
  }, [loginStatus]);
  if (loginStatus.isChecking)
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center">
        <CircularProgress />
      </div>
    );
  if (loginStatus.isLogin) return <></>;
  return (
    <div className="flex flex-col h-screen w-full relative">
      <SvgIcon
        inheritViewBox={true}
        sx={{
          position: "absolute",
          top: 40,
          left: 70,
          height: 80,
          width: "auto",
          color: "#fff",
          marginRight: "auto",
          zIndex: 20,
        }}
        component={Logo}
      />
      <img
        alt=""
        className="w-full h-full absolute z-10"
        src={AuthBackground}
      />
      <div className="flex flex-col w-full h-full z-20">
        <Outlet />
      </div>
      <div className="flex flex-row absolute bottom-10 left-10 z-20 gap-8">
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 700,
            color: "#A6BBCD",
            fontFamily: "Lato",
          }}
        >
          About
        </Typography>{" "}
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 700,
            color: "#A6BBCD",
            fontFamily: "Lato",
          }}
        >
          Contact
        </Typography>
      </div>
    </div>
  );
};

export default AuthLayout;
