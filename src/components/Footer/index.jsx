import React from "react";
import { SvgIcon, Typography } from "@mui/material";
import { ReactComponent as Instagram } from "assets/img/logo_instagram.svg";
import { ReactComponent as Facebook } from "assets/img/logo_facebook.svg";
import { ReactComponent as Google } from "assets/img/logo_google.svg";
import { ReactComponent as Logo } from "assets/img/logo.svg";

const Footer = () => {
  return (
    <div className="flex flex-col pt-10 gap-[60px] pb-10 bg-[#DEDDE14D]">
      <div className="flex flex-row gap-[90px] justify-center items-center">
        <SvgIcon
          inheritViewBox={true}
          sx={{ height: 60, width: "auto", color: "#0F3245" }}
          component={Logo}
        />
        <div className="flex flex-col gap-4">
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 400,
              color: "#9D9AA4",
              fontFamily: "Poppins",
            }}
          >
            About
          </Typography>
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 400,
              color: "#9D9AA4",
              fontFamily: "Poppins",
            }}
          >
            About TR Library
          </Typography>
        </div>
      </div>
      <div className="flex flex-row pt-5 px-9 items-center border-t-[1px] border-t-[#0D08421A]">
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontSize: 14,
            fontWeight: 400,
            color: "#9D9AA4",
            marginRight: "auto",
          }}
        >
          Copyright © 2023 . All rights reserved
        </Typography>
        <div className="flex flex-row items-center gap-[46px]">
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: 14,
              fontWeight: 400,
              color: "#9D9AA4",
            }}
          >
            Privacy Policy
          </Typography>
          <div className="h-[20px] w-[1px] bg-[#9D9AA4]"></div>{" "}
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: 14,
              fontWeight: 400,
              color: "#9D9AA4",
            }}
          >
            Terms of Use
          </Typography>
          <div className="h-[20px] w-[1px] bg-[#9D9AA4]"></div>{" "}
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: 14,
              fontWeight: 400,
              color: "#9D9AA4",
            }}
          >
            Refunds policy
          </Typography>
          <div className="h-[20px] w-[1px] bg-[#9D9AA4]"></div>{" "}
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: 14,
              fontWeight: 400,
              color: "#9D9AA4",
            }}
          >
            Fine policy
          </Typography>
          <div className="h-[20px] w-[1px] bg-[#9D9AA4]"></div>
        </div>
        <div className="flex flex-row items-center ml-auto gap-[50px]">
          <SvgIcon inheritViewBox={true} component={Instagram} />
          <SvgIcon inheritViewBox={true} component={Google} />
          <SvgIcon inheritViewBox={true} component={Facebook} />
        </div>
      </div>
    </div>
  );
};

export default Footer;
