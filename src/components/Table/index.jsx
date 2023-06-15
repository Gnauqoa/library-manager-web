import styled from "@emotion/styled";
import {
  TableCell,
  TableRow,
  tableCellClasses,
  tableRowClasses,
} from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#fff",
    border: "0px",
    background: "#2E4958",
    color: "#fff",
  },
  [`&.${tableCellClasses.body}`]: {
    border: "0px",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: "#fff",
  [`&.${tableRowClasses.root}`]: {
    background: "#2E4958",

    border: "0px",
  },
}));

export { StyledTableCell, StyledTableRow };
