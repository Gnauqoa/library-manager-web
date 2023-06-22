import { Typography } from "@mui/material";
import React from "react";

const UserInfo = ({ user }) => {
  if (user)
    return (
      <div className="flex flex-col">
        <Typography
          sx={{ fontSize: 16, fontWeight: 400, fontFamily: "Poppins" }}
        >
          Name: {user.first_name + " " + user.last_name}
        </Typography>
        <Typography
          sx={{ fontSize: 16, fontWeight: 400, fontFamily: "Poppins" }}
        >
          Unpaid fine: {user.unpaid_fine}
        </Typography>
      </div>
    );
  return <></>;
};

export default UserInfo;
