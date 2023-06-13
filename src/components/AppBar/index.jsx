import React from "react";
import MenuAuth from "./MenuAuth";
import { SvgIcon } from "@mui/material";
import { ReactComponent as Logo } from "assets/img/logo.svg";
import { Link } from "react-router-dom";

const AppBar = () => {
  return (
    <div className="flex flex-row justify-center items-center  w-full py-[15px] px-[28px] bg-[#0F3245]">
      <div className="mr-auto">
        <Link to="/">
          <SvgIcon
            inheritViewBox={true}
            sx={{
              height: 50,
              width: "auto",
              color: "#fff",
              marginRight: "auto",
            }}
            component={Logo}
          />
        </Link>
      </div>
      <div className="ml-auto">
        <MenuAuth />
      </div>
    </div>
  );
};

export default AppBar;
