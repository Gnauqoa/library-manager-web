import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

const ResultBookDetails = ({ request, onChoose }) => {
  if (request.loading)
    return (
      <div className="flex flex-col items-center w-full">
        <CircularProgress />
      </div>
    );
  if (request.isFetched)
    return (
      <div className="flex flex-col gap-4">
        <ResultCard
          id="Book id"
          name="Book name"
          available_book="Available"
          total_book="Total"
          type="head"
        />
        {request.response.items.map((book_details) => (
          <ResultCard
            onClick={() => onChoose(book_details.id)}
            key={book_details.id}
            {...book_details}
          />
        ))}
      </div>
    );
  return <></>;
};
const ResultCard = ({
  onClick,
  img_url,
  name,
  id,
  total_book,
  available_book,
  type,
}) => {
  const img_class =
    type === "head"
      ? "min-w-[60px] h-[0px] overflow-hidden"
      : "min-w-[60px] h-[80px] overflow-hidden";
  return (
    <div onClick={onClick}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "16px",
          borderRadius: "8px",
          background: type === "head" ? "#568ABB33" : "#fff",
          ":hover": {
            background: "#568ABB33",
          },
          transition: "all 0.2s ease",
          padding: "8px 12px",
          cursor: "pointer",
        }}
      >
        <div className={img_class}>
          <img alt="" src={img_url} className="w-full h-auto object-cover" />
        </div>
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
          {id}
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
          {available_book}/{total_book}
        </Typography>
      </Box>
    </div>
  );
};

export default ResultBookDetails;
