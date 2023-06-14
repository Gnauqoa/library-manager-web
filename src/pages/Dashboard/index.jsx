import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TabBar, { TabControl } from "./TabBar";
import AddBook from "./AddBook";

const DashBoard = () => {
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (!params.tab) navigate("/dashboard/addbook");
  }, [params.tab]);
  return (
    <div className="flex flex-col gap-8">
      <Typography
        sx={{
          fontSize: 36,
          fontWeight: 700,
          color: "#000",
          fontFamily: "Poppins",
        }}
      >
        Dashboard
      </Typography>
      <TabBar />
      <div className="flex flex-col w-full items-center">
        <TabControl value="addbook">
          <AddBook />
        </TabControl>
      </div>
    </div>
  );
};

export default DashBoard;
