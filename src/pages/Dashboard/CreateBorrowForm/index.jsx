import { Button, CircularProgress, Typography } from "@mui/material";
import MyInput from "components/MyInput";
import MyInputDate from "components/MyInputDate";
import React, { useState } from "react";
import SearchBook from "./SearchBook";
import BorrowList from "./BorrowList";
import getErrorMessage from "services/validate";
import useAPI from "hooks/useApi";
import { createBorrow } from "services/manager";
import { toast } from "react-toastify";

const defaultForm = { user_email: "", borrow_date: null };
const CreateBorrowForm = () => {
  const [borrowList, setBorrowList] = useState([]);
  const [formValue, setFormValue] = useState(defaultForm);
  const createRequest = useAPI({ queryFn: (data) => createBorrow(data) });

  const handleCreate = () => {
    createRequest
      .run({
        user_email: formValue.user_email,
        borrow_date: formValue.borrow_date,
        borrow_list: borrowList.map((book) => book.id),
      })
      .then((res) => {
        toast.success("Create borrow form success");
        setBorrowList([]);
      })
      .catch((err) => {});
  };
  return (
    <div className="flex flex-col gap-3 w-full items-start">
      <div className="flex flex-row items-center w-full">
        <Typography
          sx={{ fontSize: 24, fontWeight: 600, fontFamily: "Poppins" }}
        >
          Create borrow form
        </Typography>
        <Button
          onClick={handleCreate}
          disabled={
            getErrorMessage("email", formValue.user_email) ||
            !formValue.borrow_date ||
            !borrowList.length
          }
          variant="primary filled"
          sx={{ marginLeft: "auto" }}
        >
          {createRequest.loading ? (
            <CircularProgress size={14} />
          ) : (
            "Create form"
          )}
        </Button>
      </div>

      <MyInput
        label="Reader email"
        placeholder="User email"
        value={formValue.user_email}
        onChange={(e) =>
          setFormValue((prev) => ({ ...prev, user_email: e.target.value }))
        }
      />
      <MyInputDate
        label="Borrow date"
        value={formValue.borrow_date}
        onChange={(value) =>
          setFormValue((prev) => ({ ...prev, borrow_date: value }))
        }
      />
      <BorrowList borrowList={borrowList} setBorrowList={setBorrowList} />
      <SearchBook setBorrowList={setBorrowList} borrowList={borrowList} />
    </div>
  );
};

export default CreateBorrowForm;
