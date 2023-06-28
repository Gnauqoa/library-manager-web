import { TabItem } from "components/TabBarItem";
import React from "react";

const TabBar = () => {
  return (
    <div className="flex flex-row py-[10px] px-[30px] gap-[30px] bg-[#266E960D] rounded-[12px] w-full">
      <TabItem
        text={"Book Borrow Statistics by Category"}
        value="/statisticsReports/borrow_book_by_category"
      />
      <TabItem
        text={"Returning Books Late Statistics"}
        value="/statisticsReports/return_late"
      />
    </div>
  );
};

export default TabBar;
