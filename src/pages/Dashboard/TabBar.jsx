import { TabItem } from "components/TabBarItem";
import React from "react";

const TabBar = () => {
  return (
    <div className="flex flex-row py-[10px] px-[30px] gap-[30px] bg-[#266E960D] rounded-[12px]">
      <TabItem text={"Add new book"} value="/dashboard/addbook" />{" "}
      <TabItem text={"Add new account"} value="/dashboard/addaccount" />
      <TabItem text={"Create borrow form"} value="/dashboard/createborrow" />
      <TabItem text={"Create returning form"} value="/dashboard/createreturn" />
      <TabItem text={"Create fine bill"} value="/dashboard/payfine" />
    </div>
  );
};

export default TabBar;
