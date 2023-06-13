import {
  Box,
  CircularProgress,
  IconButton,
  SvgIcon,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { ReactComponent as IconClose } from "assets/icon/icon_close.svg";
import { ReactComponent as IconSearch } from "assets/icon/icon_search.svg";
import useAPI from "hooks/useApi";

const SearchTab = ({ open, title, onClose, placeholder, queryFn, type }) => {
  const searchRequest = useAPI({ queryFn: queryFn });
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        boxShadow: open ? "0px 0px 20px 8px rgba(0,0,0,0.1)" : "",
        padding: open ? "20px" : "",
        width: open ? "100%" : "0%",
        maxWidth: open ? 1000 : 0,
        transition: "all 0.2s ease",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      {open ? (
        <>
          <div className="flex flex-row items-center gap-[32px] w-full">
            <Typography
              sx={{ fontSize: 16, fontWeight: 400, fontFamily: "Poppins" }}
            >
              {title}
            </Typography>
            <IconButton
              sx={{ padding: 1, marginLeft: "auto" }}
              onClick={onClose}
            >
              <SvgIcon
                inheritViewBox={true}
                component={IconClose}
                sx={{ width: 12, height: 12, color: "#101111" }}
              />
            </IconButton>
          </div>
          <ResultSearch request={searchRequest} type={type} />
          <SearchBox placeholder={placeholder} onSearch={searchRequest.run} />
        </>
      ) : (
        <></>
      )}
    </Box>
  );
};
const ResultSearch = ({ request, type }) => {
  if (request.loading)
    return (
      <div className="flex flex-col w-full items-center">
        <CircularProgress />
      </div>
    );
  if (request.isFetched)
    return (
      <div className="flex flex-col h-full overflow-auto">
        {request.response.items.map((data) => (
          <ResultCard key={data.id} type={type} {...data} />
        ))}
      </div>
    );
  return <></>;
};

const ResultCard = ({ type }) => {
  return <></>;
};
const SearchBox = ({ placeholder, onSearch }) => {
  const [value, setValue] = useState("");
  const handleSearch = () => {
    onSearch(value);
  };
  return (
    <div className="flex flex-row w-full items-center gap-4 pl-4 pr-[5px] py-[5px] border-[#2E4958] border-[2px] rounded-[25px] overflow-hidden">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="outline-none text-[16px] w-full"
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
      />
      <IconButton
        onClick={handleSearch}
        sx={{
          background: "#266E96",
          color: "#fff",
          width: 40,
          height: 40,
          ":hover": { background: "#242D3F" },
        }}
      >
        <SvgIcon inheritViewBox={true} component={IconSearch}></SvgIcon>
      </IconButton>
    </div>
  );
};
export default SearchTab;
