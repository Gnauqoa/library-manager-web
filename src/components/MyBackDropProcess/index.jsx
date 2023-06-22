import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

const MyBackDropProcess = ({ open = true }) => {
  return (
    <Backdrop open={true} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <CircularProgress />
    </Backdrop>
  );
};

export default MyBackDropProcess;
