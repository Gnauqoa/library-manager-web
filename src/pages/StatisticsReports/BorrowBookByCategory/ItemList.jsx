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
import React from "react";

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
const ItemList = ({ items, total_borrow, loading, current_page }) => {
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
                  Category
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
                  Number of borrowing
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
                  Ratio
                </Typography>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ width: "100%" }}>
            {!loading ? (
              items.map((category, index) => (
                <CategoryBorrowItem
                  key={category.name}
                  index={index + 5 * (current_page - 1)}
                  {...category}
                  ratio={Math.round((category.count / total_borrow) * 100)}
                />
              ))
            ) : (
              <CircularProgress />
            )}
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
                    fontWeight: 700,
                    color: "#333333",
                    fontFamily: "Poppins",
                  }}
                >
                  Total
                </Typography>
              </StyledTableCell>
              <StyledTableCell
                sx={{ padding: 1 }}
                align="center"
                scope="row"
              ></StyledTableCell>
              <StyledTableCell sx={{ padding: 1 }} align="center" scope="row">
                <Typography
                  sx={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#333333",
                    fontFamily: "Poppins",
                  }}
                >
                  {total_borrow}
                </Typography>
              </StyledTableCell>
              <StyledTableCell
                sx={{ padding: 1 }}
                align="center"
                scope="row"
              ></StyledTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
const CategoryBorrowItem = ({ index, name, count, ratio }) => {
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
          {name}
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
          {count}
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
          {ratio}%
        </Typography>
      </StyledTableCell>
    </TableRow>
  );
};
export default ItemList;
