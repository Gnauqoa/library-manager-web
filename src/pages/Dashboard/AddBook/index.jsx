import { Box, Typography } from "@mui/material";
import MyInput from "components/MyInput";
import UploadImage from "components/UploadImg";
import React, { useState } from "react";
import SearchTab from "./SearchTab";

const AddBook = () => {
  const [searchBox, setSearchBox] = useState({
    open: false,
    title: "",
    queryFn: null,
    onSelect: null,
    placeholder: "",
  });
  return (
    <div className="flex flex-row gap-[15px] w-full justify-center">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          boxShadow: "0px 0px 20px 8px rgba(0,0,0,0.1)",
          padding: "20px",
          borderRadius: "12px",
          minWidth: 500,
          width: 500,
        }}
      >
        <Typography
          sx={{ fontSize: 24, fontWeight: 600, fontFamily: "Poppins" }}
        >
          Add new book
        </Typography>
        <Typography
          sx={{ fontSize: 14, fontWeight: 600, fontFamily: "Poppins" }}
        >
          Book cover:
        </Typography>
        <div className="w-full">
          <UploadImage />
        </div>
        <MyInput label="Book name:" placeholder="Book name" />
        <div className="flex flex-row">
          <MyInput
            onClick={() =>
              setSearchBox({
                open: true,
                title: "Choose author",
                placeholder: "Author name",
              })
            }
            readOnly={true}
            label="Author:"
            placeholder="Author"
          />
        </div>
      </Box>
      <SearchTab
        {...searchBox}
        onClose={() => setSearchBox((prev) => ({ ...prev, open: false }))}
      />
    </div>
  );
};

export default AddBook;
