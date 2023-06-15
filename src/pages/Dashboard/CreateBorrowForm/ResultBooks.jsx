import React, { useEffect, useState } from "react";
import useAPI from "hooks/useApi";
import { getBookList } from "services/book";
import { Box, CircularProgress, Typography } from "@mui/material";
import MyCheckBox from "components/MyCheckBox";

const ResultBooks = ({ detail_id, onAdd, borrowList }) => {
  const getBookRequest = useAPI({
    queryFn: () => getBookList({ detail_id }),
    getNow: true,
  });
  if (getBookRequest.isFetched)
    return (
      <div className="flex flex-col gap-3">
        <div className="flex flex-row items-center bg-[#568ABB33] py-[8px] px-[12px] rounded-[8px]">
          <div className="min-w-[60px] h-[0px] overflow-hidden"></div>
          <Typography
            sx={{
              width: "20%",
              fontSize: 16,
              fontWeight: 400,
              color: "#333333",
              fontFamily: "Poppins",
              textAlign: "center",
            }}
          >
            Name
          </Typography>
          <Typography
            sx={{
              width: "35%",
              fontSize: 16,
              fontWeight: 400,
              color: "#333333",
              fontFamily: "Poppins",
              textAlign: "center",
            }}
          >
            Book id
          </Typography>{" "}
          <Typography
            sx={{
              width: "20%",
              fontSize: 16,
              fontWeight: 400,
              color: "#333333",
              fontFamily: "Poppins",
              textAlign: "center",
            }}
          >
            Status
          </Typography>
          <Typography
            sx={{
              width: "20%",
              fontSize: 16,
              fontWeight: 400,
              color: "#333333",
              fontFamily: "Poppins",
              textAlign: "center",
            }}
          >
            Action
          </Typography>
        </div>
        {getBookRequest.response.items.map((book) => (
          <ResultCard
            book_detail={getBookRequest.response.book_detail}
            onClick={onAdd}
            key={book.id}
            id={book.id}
            status={book.status}
            name={getBookRequest.response.book_detail.name}
            img_url={getBookRequest.response.book_detail.img_url}
            checked={borrowList.findIndex((ele) => ele.id === book.id) !== -1}
          />
        ))}
      </div>
    );
  return (
    <div className="flex flex-col w-full items-center">
      <CircularProgress />
    </div>
  );
};
const ResultCard = ({
  book_detail,
  onClick,
  img_url,
  name,
  id,
  status,
  type,
  checked,
}) => {
  const [isSelect, setIsSelect] = useState(false);
  const handleClick = () => {
    setIsSelect(!isSelect);
    onClick(id, !isSelect, book_detail);
  };
  useEffect(() => {
    setIsSelect(checked);
  }, [checked]);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "16px",
        borderRadius: "8px",
        background: type === "head" ? " #568ABB33" : "#fff",
        ":hover": {
          background: "#568ABB33",
        },
        transition: "all 0.2s ease",
        padding: "8px 12px",
        cursor: "pointer",
      }}
    >
      <div className="min-w-[60px] max-w-[60px] h-[80px] overflow-hidden">
        <img alt="" src={img_url} className="w-full h-auto object-cover" />
      </div>
      <Typography
        sx={{
          width: "20%",
          fontSize: 16,
          fontWeight: 400,
          color: "#333333",
          fontFamily: "Poppins",
          textAlign: "center",
        }}
      >
        {name}
      </Typography>
      <Typography
        sx={{
          minWidth: "30%",
          fontSize: 16,
          fontWeight: 400,
          color: "#333333",
          fontFamily: "Poppins",
          textAlign: "center",
        }}
      >
        {id}
      </Typography>
      <div className="flex flex-col min-w-[20%] items-center">
        {status ? (
          <div className="flex flex-col py-[6px] px-[9px] rounded-full bg-[#56BA6C1A]">
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 500,
                color: "#449E3C",
                fontFamily: "Poppins",
              }}
            >
              Available
            </Typography>
          </div>
        ) : (
          <div className="flex flex-col py-[6px] px-[9px] rounded-full bg-[#FFC2C280]">
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 500,
                color: "#AD4C4C",
                fontFamily: "Poppins",
              }}
            >
              Borrowed
            </Typography>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center w-[20%]">
        <MyCheckBox disabled={!status} value={isSelect} onChange={handleClick} />
      </div>
    </Box>
  );
};

export default ResultBooks;
