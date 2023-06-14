import { Box, Typography } from "@mui/material";
import React from "react";
import { Link, useParams } from "react-router-dom";

const TabBar = () => {
  return (
    <div className="flex flex-row py-[10px] px-[30px] gap-[30px] bg-[#266E960D] rounded-[12px]">
      <TabItem text={"Add new book"} value="addbook" />{" "}
      <TabItem text={"Add new account"} value="addaccount" />
      <TabItem text={"Create borrow form"} value="createborrow" />
      <TabItem text={"Create returning form"} value="createreturn" />
      <TabItem text={"Create fine bill"} value="payfine" />
    </div>
  );
};
const TabControl = ({ value, children }) => {
  const { tab } = useParams();
  if (tab === value) return <>{children}</>;
  return <></>;
};
const TabItem = ({ text, value }) => {
  const { tab } = useParams();
  const isSelect = value === tab;
  return (
    <Link to={`/dashboard/${value}`}>
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
          {text}{" "}
        </Typography>
      </Box>
    </Link>
  );
};
export { TabControl };
export default TabBar;
