import { Button, CircularProgress, SvgIcon } from "@mui/material";
import BackDropProcess from "components/BackDropProcess";
import MyInputDate from "components/MyInputDate";
import dayjs from "dayjs";
import useAPI from "hooks/useApi";
import React, { useEffect, useState } from "react";
import { ReactComponent as IconExcel } from "assets/icon/icon_excel.svg";
import { statisticalBookReturnLate } from "services/manager";
import ItemList from "./ItemList";
import PageControl from "../PageControl";
import { useSelector } from "react-redux";
import { saveExcelFile } from "services/saveExcelFIle";

const BookReturnLate = () => {
  const getReturnLateRequest = useAPI({
    queryFn: (params) => statisticalBookReturnLate(params),
  });
  const getExportData = useAPI({
    queryFn: (params) => statisticalBookReturnLate(params),
  });
  const rule = useSelector((state) => state.rule);
  const [current_page, setCurrentPage] = useState(1);
  const [from_date, setFromDate] = useState(dayjs().startOf("month"));
  const [to_date, setToDate] = useState(dayjs().endOf("month"));
  useEffect(() => {
    getReturnLateRequest
      .run({ per_page: 5, page: current_page, from_date, to_date })
      .then((res) => {})
      .catch((err) => {});
  }, [from_date, to_date, current_page]);
  const handleExport = () => {
    getExportData
      .run({
        from_date,
        to_date,
        per_page: getReturnLateRequest.response.total_items,
      })
      .then((res) => {
        saveExcelFile(
          res.items.map((return_late_form) => ({
            id: return_late_form.id,
            email: return_late_form.user.email,
            book_name: return_late_form.book.details_book.name,
            book_id: return_late_form.book.id,
            book_detail_id: return_late_form.book.details_book.id,
            borrow_date: return_late_form.borrow_date,
            return_date: return_late_form.return_date,
            return_late_days:
              return_late_form.borrow_days - rule.max_days_borrow,
          })),
          "return_late_list"
        );
      })
      .catch((err) => {});
  };
  if (!getReturnLateRequest.response) return <CircularProgress />;
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
      {getReturnLateRequest.response && (
        <>
          <ItemList
            items={getReturnLateRequest.response.items}
            total_items={getReturnLateRequest.response.total_items}
            loading={getReturnLateRequest.loading}
            current_page={current_page}
          />
          <PageControl
            {...getReturnLateRequest.response}
            current_page={current_page}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default BookReturnLate;
