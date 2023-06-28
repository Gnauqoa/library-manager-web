import React from "react";
import TabBar from "./TabBar";
import { Typography } from "@mui/material";
import { TabControl } from "components/TabBarItem";
import BorrowBookByCategory from "./BorrowBookByCategory";

const StatisticsReports = () => {
  return (
    <div className="flex flex-col gap-8 w-full">
      <Typography
        sx={{
          fontSize: 36,
          fontWeight: 700,
          color: "#000",
          fontFamily: "Poppins",
        }}
      >
        Statistics Reports
      </Typography>
      <TabBar />
      <TabControl value="/statisticsReports/borrow_book_by_category">
        <BorrowBookByCategory />
      </TabControl>
    </div>
  );
};

export default StatisticsReports;
