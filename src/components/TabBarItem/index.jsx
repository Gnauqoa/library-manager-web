import { Box, Typography } from "@mui/material";
import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";

const TabControl = ({ value, children }) => {
  const { pathname } = useLocation();
  if (pathname === value) return <>{children}</>;
  return <></>;
};
const TabItem = ({ text, value }) => {
  const { pathname } = useLocation();
  const isSelect = value === pathname;
  return (
    <Link style={{ width: "100%" }} to={value}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          paddingY: "25px",
          borderTop: isSelect ? "2px solid #2D5A73" : "",
        }}
      >
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 600,
            color: isSelect ? "#2D5A73" : "#000",
            fontFamily: "Poppins",
            transition: "all 0.2s ease",
            textAlign: "center",
          }}
        >
          {text}
        </Typography>
      </Box>
    </Link>
  );
};
export { TabControl, TabItem };
