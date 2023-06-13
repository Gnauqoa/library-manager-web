import { Box, Typography } from "@mui/material";
import UploadImage from "components/UploadImg";
import React from "react";

const AddBook = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <Typography sx={{ fontSize: 24, fontWeight: 600, fontFamily: "Poppins" }}>
        Add new book
      </Typography>{" "}
      <Typography sx={{ fontSize: 14, fontWeight: 600, fontFamily: "Poppins" }}>
        Book cover:
      </Typography>
      <div className="w-[500px]">
        <UploadImage />
      </div>
    </Box>
  );
};

export default AddBook;
