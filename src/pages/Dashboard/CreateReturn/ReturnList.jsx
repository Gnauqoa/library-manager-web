import {
  IconButton,
  SvgIcon,
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
import { ReactComponent as IconClose } from "assets/icon/icon_close.svg";

const ReturnList = ({ return_list, setReturnList }) => {
  const handleDelete = (id) => {
    setReturnList((prev) => {
      const index = prev.findIndex((ele) => ele.id === id);
      return [...prev.slice(0, index), ...prev.slice(index + 1)];
    });
  };
  if (!return_list.length) return <></>;
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
        Return list
      </Typography>
      <TableContainer sx={{ width: "100%", maxHeight: 300 }} >
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
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ width: "100%", height: "50px", overflow: "auto" }}>
            {return_list.map((data) => {
              return (
                <ReturnItem
                  key={data.id}
                  {...data}
                  onDelete={() => handleDelete(data.id)}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
const ReturnItem = ({ img_url, borrow_date, name, onDelete }) => {
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
        <IconButton onClick={onDelete} sx={{ width: 28, height: 28 }}>
          <SvgIcon
            inheritViewBox={true}
            sx={{ width: "100%", height: "auto" }}
            component={IconClose}
          />
        </IconButton>
      </StyledTableCell>
    </TableRow>
  );
};
export default ReturnList;
