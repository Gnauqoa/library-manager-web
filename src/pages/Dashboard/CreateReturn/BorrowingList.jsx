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
import React, { useEffect, useState } from "react";
import { getUserBorrowing } from "services/user";
import validator from "validator";

const BorrowingList = ({ user_email, setReturnList, return_list }) => {
  const getBorrowingRequest = useAPI({
    queryFn: (params) => getUserBorrowing(params),
  });
  const handleAddReturnList = (id, status, data) => {
    if (status) return setReturnList((prev) => [...prev, { id: id, ...data }]);
    setReturnList((prev) => {
      const index = prev.findIndex((ele) => ele.id === id);
      return [...prev.slice(0, index), ...prev.slice(index + 1)];
    });
  };
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
  if (getBorrowingRequest.error) return <></>;
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
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Borrow Date</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ width: "100%" }}>
            {getBorrowingRequest?.response?.items?.map((borrow_form) => {
              const { img_url, name } = borrow_form.book.details_book;
              const { borrow_date } = borrow_form;
              const max_borrow_days =
                getBorrowingRequest.response.max_borrow_days;
              const borrow_days = Math.abs(dayjs().diff(borrow_date, "days"));
              return (
                <BorrowingItem
                  key={borrow_form.id}
                  onAdd={handleAddReturnList}
                  details_book={borrow_form.book.details_book}
                  img_url={img_url}
                  name={name}
                  borrow_date={borrow_date}
                  borrow_days={borrow_days}
                  max_borrow_days={max_borrow_days}
                  id={borrow_form.id}
                  book_id={borrow_form.book.id}
                  checked={
                    return_list.findIndex(
                      (ele) => ele.id === borrow_form.id
                    ) !== -1
                  }
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

const BorrowingItem = ({
  id,
  img_url,
  borrow_date,
  borrow_days,
  max_borrow_days,
  name,
  checked,
  onAdd,
  book_id,
}) => {
  const [checkBox, setCheckBox] = useState(false);
  useEffect(() => {
    setCheckBox(checked);
  }, [checked]);
  console.log(book_id);
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
        <MyCheckBox
          value={checkBox}
          onChange={() =>
            onAdd(id, !checkBox, { name, borrow_date, img_url, book_id })
          }
        />
      </StyledTableCell>
    </TableRow>
  );
};

export default BorrowingList;
