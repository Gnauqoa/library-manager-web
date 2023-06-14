import { IconButton, SvgIcon, Typography } from "@mui/material";

import React from "react";
import { ReactComponent as IconClose } from "assets/icon/icon_close.svg";

const BorrowList = ({ borrowList, setBorrowList }) => {
  const handleDelete = (id) => {
    setBorrowList((prev) => {
      const index = prev.findIndex((ele) => ele.id === id);
      return [...prev.slice(0, index), ...prev.slice(index + 1)];
    });
  };
  if (borrowList.length)
    return (
      <div className="flex flex-col gap-3 w-full ">
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 500,
            color: "#121115",
            fontFamily: "Poppins",
          }}
        >
          Borrow list:
        </Typography>
        <div className="flex flex-col gap-3 max-h-[300px] overflow-auto hide-scrollBar">
          {borrowList.map((book) => (
            <BorrowItems
              key={book.id}
              name={book.detail_book.name}
              img_url={book.detail_book.img_url}
              book_id={book.id}
              onDelete={() => handleDelete(book.id)}
            />
          ))}
        </div>
      </div>
    );
  return <></>;
};
const BorrowItems = ({ img_url, name, book_id, onDelete }) => {
  return (
    <div className="flex flex-row items-center py-[8px] px-[12px] gap-4 w-full">
      <div className="min-w-[60px] max-w-[60px] h-[80px] overflow-hidden">
        <img alt="" src={img_url} className="w-full h-auto object-cover" />
      </div>
      <Typography
        sx={{
          fontSize: 16,
          fontWeight: 400,
          color: "#333333",
          fontFamily: "Poppins",
        }}
      >
        {name}
      </Typography>
      <Typography
        sx={{
          width: "100%",
          fontSize: 16,
          fontWeight: 400,
          color: "#333333",
          fontFamily: "Poppins",
          textAlign: "center",
        }}
      >
        {book_id}
      </Typography>
      <IconButton
        onClick={onDelete}
        sx={{ width: 28, height: 28, marginLeft: "auto" }}
      >
        <SvgIcon
          inheritViewBox={true}
          sx={{ width: "100%", height: "auto" }}
          component={IconClose}
        />
      </IconButton>
    </div>
  );
};

export default BorrowList;
