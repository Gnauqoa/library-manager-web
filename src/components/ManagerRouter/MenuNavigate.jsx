import { Box, Menu, SvgIcon, Typography } from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ReactComponent as IconDashBoard } from "assets/icon/icon_dashboard.svg";
import { ReactComponent as IconBookSquare } from "assets/icon/icon_book_square.svg";

const MenuNavigate = () => {
  return (
    <div className="flex flex-col gap-[50px] ">
      <Typography
        sx={{
          fontSize: 24,
          fontWeight: 700,
          color: "#272B30",
          fontFamily: "Poppins",
        }}
      >
        Librarian Home
      </Typography>
      <div className="flex flex-col w-[260px]">
        <MenuItem icon={IconDashBoard} name="Dashboard" value="dashboard" />
        <MenuItem icon={IconBookSquare} name="Book lists" value="BookList" />
      </div>
    </div>
  );
};
const MenuItem = ({ name, icon, value }) => {
  const location = useLocation();
  const isSelect = location.pathname.indexOf(value) !== -1;
  return (
    <Link to={`/${value}`}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "16px",
          padding: "16px 20px",
          background: isSelect ? "#568ABB33" : "#fff",
          borderLeft: isSelect ? "3px solid #266E96" : "",
          transition: "all 0.2s ease",
          ":hover": {
            background: "#568ABB33",
          },
          borderTopRightRadius: "8px",
          borderBottomRightRadius: "8px",

        }}
      >
        <SvgIcon
          component={icon}
          sx={{ width: 24, height: 24, color: "#4A4553" }}
          inheritViewBox={true}
        />
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 400,
            color: "#4A4553",
            fontFamily: "Poppins",
          }}
        >
          {name}
        </Typography>
      </Box>
    </Link>
  );
};
export default MenuNavigate;
