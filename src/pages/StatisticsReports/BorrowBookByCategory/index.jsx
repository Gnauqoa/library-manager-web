import MyInputDate from "components/MyInputDate";
import dayjs from "dayjs";
import useAPI from "hooks/useApi";
import React, { useEffect, useState } from "react";
import { statisticalBorrowBookEachCategory } from "services/manager";
import ItemList from "./ItemList";
import PageControl from "../PageControl";
import { Button, CircularProgress, SvgIcon } from "@mui/material";
import { ReactComponent as IconExcel } from "assets/icon/icon_excel.svg";
import { utils, write } from "xlsx";
import { saveAs } from "file-saver";
import BackDropProcess from "components/BackDropProcess";
import { saveExcelFile } from "services/saveExcelFIle";

const BorrowBookByCategory = () => {
  const getBorrowRequest = useAPI({
    queryFn: (params) => statisticalBorrowBookEachCategory(params),
  });
  const getExportData = useAPI({
    queryFn: (params) => statisticalBorrowBookEachCategory(params),
  });
  const [current_page, setCurrentPage] = useState(1);
  const [from_date, setFromDate] = useState(dayjs().startOf("month"));
  const [to_date, setToDate] = useState(dayjs().endOf("month"));
  useEffect(() => {
    getBorrowRequest
      .run({ per_page: 5, page: current_page, from_date, to_date })
      .then((res) => {})
      .catch((err) => {});
  }, [from_date, to_date, current_page]);
  const handleExport = () => {
    getExportData
      .run({
        from_date,
        to_date,
        per_page: getBorrowRequest.response.total_items,
      })
      .then((res) => {
        saveExcelFile(
          [
            ...res.items,
            {
              name: "Total borrow",
              count: getBorrowRequest.response.total_borrow,
            },
          ],
          "borrow_book_by_category"
        );
      })
      .catch((err) => {});
  };
  if (!getBorrowRequest.response) return <CircularProgress />;
  return (
    <div className="flex flex-col gap-4">
      <BackDropProcess open={getExportData.loading} />
      <Button
        sx={{
          background: "#209e62",
          color: "#fff",
          ":hover": { background: "#175935", color: "#fff" },
        }}
        onClick={handleExport}
        endIcon={<SvgIcon inheritViewBox={true} component={IconExcel} />}
      >
        Export to xls
      </Button>
      <div className="flex flex-row items-center w-full gap-4">
        <MyInputDate
          value={from_date}
          label={"From date"}
          onChange={(value) => {
            setFromDate(value);
            setCurrentPage(1);
          }}
        />
        <MyInputDate
          value={to_date}
          label={"To date"}
          onChange={(value) => {
            setToDate(value);
            setCurrentPage(1);
          }}
        />
      </div>
      {getBorrowRequest.response && (
        <>
          <ItemList
            current_page={current_page}
            items={getBorrowRequest.response.items}
            total_borrow={getBorrowRequest.response.total_borrow}
            loading={getBorrowRequest.loading}
          />
          <PageControl
            {...getBorrowRequest.response}
            current_page={current_page}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default BorrowBookByCategory;
