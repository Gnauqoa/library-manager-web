import {
  Box,
  CircularProgress,
  IconButton,
  SvgIcon,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { ReactComponent as IconClose } from "assets/icon/icon_close.svg";
import { ReactComponent as IconLoation } from "assets/icon/icon_location.svg";

import { ReactComponent as IconSearch } from "assets/icon/icon_search.svg";
import useAPI from "hooks/useApi";

const SearchTab = ({
  open,
  title,
  onClose,
  placeholder,
  queryFn,
  type,
  onSelect,
}) => {
  const searchRequest = useAPI({ queryFn: queryFn });
  const handleSelect = (data) => {
    onSelect(data);
    onClose();
  };
  useEffect(() => {
    searchRequest.reset();
  }, [open, type]);
  return (
    <div>
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
            <SearchBox placeholder={placeholder} onSearch={searchRequest.run} />
            <ResultSearch
              onSelect={handleSelect}
              request={searchRequest}
              type={type}
            />
          </>
        ) : (
          <></>
        )}
      </Box>
    </div>
  );
};
const ResultSearch = ({ request, type, onSelect }) => {
  if (request.loading)
    return (
      <div className="flex flex-col w-full items-center">
        <CircularProgress />
      </div>
    );
  if (request.isFetched)
    return (
      <div className="flex flex-col h-full overflow-auto max-h-[400px] gap-2">
        {request.response.items.map((data) => (
          <ResultCard
            onSelect={() => onSelect(data)}
            key={data.id}
            type={type}
            {...data}
          />
        ))}
      </div>
    );
  return <></>;
};

const ResultCard = ({ type, img_url, name, onSelect, address }) => {
  if (type === "author")
    return (
      <div
        onClick={onSelect}
        className="flex flex-row gap-3 items-center px-4 py-2 rounded-[12px] w-full hover:bg-[#568ABB33] transition-all cursor-pointer"
      >
        <img alt="" src={img_url} className="h-[50px] w-auto " />
        <Typography
          sx={{ fontSize: 14, fontWeight: 400, fontFamily: "Poppins" }}
        >
          {name}
        </Typography>
      </div>
    );
  if (type === "publisher")
    return (
      <div
        onClick={onSelect}
        className="flex flex-col gap-2 justify-center px-4 py-2 rounded-[12px] border-l-[3px] rounded-l-[0px] border-[#2E4958] w-full hover:bg-[#568ABB33] transition-all cursor-pointer"
      >
        <Typography
          sx={{ fontSize: 14, fontWeight: 400, fontFamily: "Poppins" }}
        >
          {name}
        </Typography>

        {address && (
          <div className="flex flex-row items-center gap-2">
            {" "}
            <SvgIcon
              inheritViewBox={true}
              sx={{ width: 12, height: 12 }}
              component={IconLoation}
            />{" "}
            <Typography
              sx={{ fontSize: 14, fontWeight: 400, fontFamily: "Poppins" }}
            >
              {address}
            </Typography>
          </div>
        )}
      </div>
    );
  return <></>;
};
const SearchBox = ({ placeholder, onSearch }) => {
  const [value, setValue] = useState("");
  const handleSearch = () => {
    onSearch({ name: value });
  };
  return (
    <div className="flex flex-row w-full items-center gap-4 pl-4 pr-[5px] py-[12px] border-[#2E4958] border-[2px] rounded-[25px] overflow-hidden">
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
          width: 32,
          height: 32,
          ":hover": { background: "#242D3F" },
        }}
      >
        <SvgIcon
          sx={{ width: "100%", height: "auto" }}
          inheritViewBox={true}
          component={IconSearch}
        ></SvgIcon>
      </IconButton>
    </div>
  );
};
export default SearchTab;
