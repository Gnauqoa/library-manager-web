import { Box, CircularProgress, IconButton, SvgIcon } from "@mui/material";
import React from "react";
import { ReactComponent as IconSearch } from "assets/icon/icon_search.svg";

const SearchBox = ({ placeholder, value, setValue, onSearch, loading }) => {
  return (
    <Box
      sx={{
        width: "100%",
        border: "2px solid #DEDDE1",
        borderRadius: "12px",
        padding: "8px 16px",
        ":hover ": {
          boxShadow: "0px 0px 5px 5px #C3E8FF",
        },
        "&.Mui-focused ": {
          borderColor: "primary.main",
          boxShadow: " 0px 0px 5px 5px #C3E8FF",
        },
        transition: "all 0.15s",
      }}
      className="flex flex-row bg-[#fff] w-full items-center gap-4 pl-4 pr-[5px] py-[12px] border-[#2E4958] border-[2px] rounded-[25px] overflow-hidden"
    >
      <input
        readOnly={loading}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="outline-none text-[16px] w-full"
        onKeyDown={(e) => {
          if (e.key === "Enter") onSearch();
        }}
      />
      <IconButton
        onClick={onSearch}
        sx={{
          background: "#266E96",
          color: "#fff",
          width: 32,
          height: 32,
          ":hover": { background: "#242D3F" },
        }}
      >
        {loading ? (
          <CircularProgress size={12} />
        ) : (
          <SvgIcon
            sx={{ width: "100%", height: "auto" }}
            inheritViewBox={true}
            component={IconSearch}
          />
        )}
      </IconButton>
    </Box>
  );
};

export default SearchBox;
