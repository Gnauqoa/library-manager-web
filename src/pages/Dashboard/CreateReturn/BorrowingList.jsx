import {
  CircularProgress,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import MyCheckBox from "components/MyCheckBox";
import { StyledTableCell } from "components/Table";
import dayjs from "dayjs";
import useAPI from "hooks/useApi";
import React, { useEffect } from "react";
import { getUserBorrowing } from "services/user";
import validator from "validator";
const BorrowingList = ({ user_email }) => {
  const getBorrowingRequest = useAPI({
    queryFn: (params) => getUserBorrowing(params),
  });
  useEffect(() => {
    if (validator.isEmail(user_email || "")) {
      getBorrowingRequest
        .run({ email: user_email })
        .then((res) => {})
        .catch((err) => {});
    }
  }, [user_email]);
  if (!validator.isEmail(user_email || "")) return <></>;
  if (!getBorrowingRequest.isFetched) return <CircularProgress />;
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
        Book borrowed by user
      </Typography>
      <TableContainer sx={{ width: "100%" }}>
        <Table sx={{ width: "100%" }}>
          <TableHead>
            <TableRow
              sx={{
                background: "#2E4958",
                padding: 0,
              }}
            >
              <StyledTableCell align="center">Cover</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Borrow Date</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ width: "100%" }}>
            {getBorrowingRequest.response.items.map((borrow_form) => {
              const { img_url, name } = borrow_form.book.details_book;
              const { borrow_date } = borrow_form;
              const max_borrow_days =
                getBorrowingRequest.response.max_borrow_days;
              const borrow_days = dayjs().diff(borrow_date, "days");
              return (
                <BorrowingItem
                  img_url={img_url}
                  name={name}
                  borrow_date={borrow_date}
                  borrow_days={borrow_days}
                  max_borrow_days={max_borrow_days}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
const MyTableRow = ({ children, sx, ...props }) => {
  return (
    <TableRow
      {...props}
      sx={{
        width: "100%",
        transition: "all 0.2s ease",

        ...sx,
      }}
    >
      {children}
    </TableRow>
  );
};
const BorrowingItem = ({
  id,
  img_url,
  borrow_date,
  borrow_days,
  max_borrow_days,
  name,
}) => {
  return (
    <MyTableRow key={id}>
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
      </StyledTableCell>
      <StyledTableCell align="center">
        {borrow_days > max_borrow_days ? (
          <div className="flex flex-col py-[6px] px-[9px] bg-[#FF7171] rounded-full">
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 500,
                fontFamily: "Poppins",
                color: "#000",
              }}
            >
              Out {borrow_days} days
            </Typography>
          </div>
        ) : (
          <div className="flex flex-col py-[6px] px-[9px] bg-[#DFF0FF] rounded-full">
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 500,
                fontFamily: "Poppins",
                color: "#0263FF",
              }}
            >
              Borrowing
            </Typography>
          </div>
        )}
      </StyledTableCell>
      <StyledTableCell align="center">
        <MyCheckBox />
      </StyledTableCell>
    </MyTableRow>
  );
};

export default BorrowingList;
