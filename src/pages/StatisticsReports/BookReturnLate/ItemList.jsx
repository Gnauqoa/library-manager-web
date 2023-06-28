import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import { useSelector } from "react-redux";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#fff",
    border: "0px",
    // background: "#2E4958",
    color: "#fff",
  },
  [`&.${tableCellClasses.body}`]: {
    border: "0px",
  },
}));
const ItemList = ({ items, total_items, loading, current_page }) => {
  const rule = useSelector((state) => state.rule);
  return (
    <div className="flex flex-col w-full items-center">
      <TableContainer sx={{ width: "100%" }}>
        <Table sx={{ width: "100%" }} stickyHeader>
          <TableHead>
            <TableRow
              sx={{
                background: "#2E4958",
                padding: 0,
              }}
            >
              <StyledTableCell align="center">
                <Typography
                  sx={{
                    color: "#92929D",
                    fontSize: 16,
                    fontWeight: 500,
                    fontFamily: "Poppins",
                  }}
                >
                  Order
                </Typography>
              </StyledTableCell>{" "}
              <StyledTableCell align="center">
                <Typography
                  sx={{
                    color: "#92929D",
                    fontSize: 16,
                    fontWeight: 500,
                    fontFamily: "Poppins",
                  }}
                >
                  Book name
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Typography
                  sx={{
                    color: "#92929D",
                    fontSize: 16,
                    fontWeight: 500,
                    fontFamily: "Poppins",
                  }}
                >
                  User email
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Typography
                  sx={{
                    color: "#92929D",
                    fontSize: 16,
                    fontWeight: 500,
                    fontFamily: "Poppins",
                  }}
                >
                  Borrow date
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Typography
                  sx={{
                    color: "#92929D",
                    fontSize: 16,
                    fontWeight: 500,
                    fontFamily: "Poppins",
                  }}
                >
                  Return date
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Typography
                  sx={{
                    color: "#92929D",
                    fontSize: 16,
                    fontWeight: 500,
                    fontFamily: "Poppins",
                  }}
                >
                  Late days
                </Typography>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ width: "100%" }}>
            {!loading ? (
              items.map((return_late_form, index) => (
                <ReturnLateItem
                  email={return_late_form.user.email}
                  index={index + 5 * (current_page - 1)}
                  key={return_late_form.id}
                  book_name={return_late_form.book.details_book.name}
                  borrow_date={return_late_form.borrow_date}
                  return_date={return_late_form.return_date}
                  return_late_days={
                    return_late_form.borrow_days - rule.max_days_borrow
                  }
                />
              ))
            ) : (
              <CircularProgress />
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
const ReturnLateItem = ({
  index,
  book_name,
  borrow_date,
  return_date,
  return_late_days,
  email,
}) => {
  return (
    <TableRow
      sx={{
        width: "100%",
        transition: "all 0.2s ease",
      }}
    >
      <StyledTableCell sx={{ padding: 1 }} align="center" scope="row">
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 400,
            color: "#333333",
            fontFamily: "Poppins",
          }}
        >
          {index + 1}
        </Typography>
      </StyledTableCell>{" "}
      <StyledTableCell sx={{ padding: 1 }} align="center" scope="row">
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 400,
            color: "#333333",
            fontFamily: "Poppins",
          }}
        >
          {book_name}
        </Typography>
      </StyledTableCell>{" "}
      <StyledTableCell sx={{ padding: 1 }} align="center" scope="row">
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 400,
            color: "#333333",
            fontFamily: "Poppins",
          }}
        >
          {email}
        </Typography>
      </StyledTableCell>
      <StyledTableCell sx={{ padding: 1 }} align="center" scope="row">
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 400,
            color: "#333333",
            fontFamily: "Poppins",
          }}
        >
          {dayjs(borrow_date).format("DD/MM/YYYY")}
        </Typography>
      </StyledTableCell>
      <StyledTableCell sx={{ padding: 1 }} align="center" scope="row">
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 400,
            color: "#333333",
            fontFamily: "Poppins",
          }}
        >
          {dayjs(return_date).format("DD/MM/YYYY")}
        </Typography>
      </StyledTableCell>{" "}
      <StyledTableCell sx={{ padding: 1 }} align="center" scope="row">
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 400,
            color: "#333333",
            fontFamily: "Poppins",
          }}
        >
          {return_late_days}
        </Typography>
      </StyledTableCell>
    </TableRow>
  );
};
export default ItemList;
