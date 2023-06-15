import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { StyledTableCell } from "components/Table";
import dayjs from "dayjs";
import React from "react";

const ResultReturn = ({ return_result_list }) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 500,
          color: "#121115",
          fontFamily: "Poppins",
        }}
      >
        Return book result of{" "}
        <span className="text-[16px] font-[700]">
          {return_result_list.user.first_name +
            " " +
            return_result_list.user.last_name}
        </span>
      </Typography>
      <TableContainer sx={{ width: "100%", maxHeight: 300 }}>
        <Table sx={{ width: "100%" }} stickyHeader>
          <TableHead>
            <TableRow
              sx={{
                background: "#2E4958",
                padding: 0,
              }}
            >
              <StyledTableCell align="center">Cover</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>{" "}
              <StyledTableCell align="center">Borrow Date</StyledTableCell>
              <StyledTableCell align="center">Return Date</StyledTableCell>
              <StyledTableCell align="center">Borrow Days</StyledTableCell>{" "}
              <StyledTableCell align="center">Fine</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ width: "100%", height: "50px", overflow: "auto" }}>
            {return_result_list.return_list.map((data) => {
              return (
                <ReturnResultItem
                  key={data.id}
                  img_url={data.book.details_book.img_url}
                  name={data.book.details_book.name}
                  {...data}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
const ReturnResultItem = ({
  img_url,
  borrow_date,
  name,
  fine,
  borrow_days,
  return_date,
}) => {
  return (
    <TableRow
      sx={{
        width: "100%",
        transition: "all 0.2s ease",
      }}
    >
      <StyledTableCell sx={{ padding: 1 }} align="center" scope="row">
        <div className="flex flex-col items-center min-w-[60px]  w-full h-[80px] overflow-hidden">
          <img
            alt=""
            src={img_url}
            className="w-auto max-w-[60px] h-full object-cover"
          />
        </div>
      </StyledTableCell>
      <StyledTableCell align="center">{name}</StyledTableCell>
      <StyledTableCell align="center">
        {dayjs(borrow_date).format("DD/MM/YYYY")}
      </StyledTableCell>{" "}
      <StyledTableCell align="center">
        {dayjs(return_date).format("DD/MM/YYYY")}
      </StyledTableCell>{" "}
      <StyledTableCell align="center">{borrow_days}</StyledTableCell>{" "}
      <StyledTableCell align="center">{fine}</StyledTableCell>
    </TableRow>
  );
};
export default ResultReturn;
