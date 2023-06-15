import { Button, CircularProgress, Typography } from "@mui/material";
import MyInput from "components/MyInput";
import MyInputDate from "components/MyInputDate";
import useAPI from "hooks/useApi";
import React, { useState } from "react";
import { createReturn } from "services/manager";
import BorrowingList from "./BorrowingList";
import ReturnList from "./ReturnList";
import validator from "validator";
import { toast } from "react-toastify";
import ResultReturn from "./ResultReturn";
const defaultForm = { user_email: "", return_date: null };

const CreateReturnForm = () => {
  const [formValue, setFormValue] = useState(defaultForm);
  const [return_list, setReturnList] = useState([]);
  const [email_search, setEmailSearch] = useState("");
  const createRequest = useAPI({ queryFn: (data) => createReturn(data) });
  const handleReturn = () => {
    createRequest
      .run({
        user_email: email_search,
        return_date: formValue.return_date,
        book_return_list: return_list.map((borrow) => borrow.book_id),
      })
      .then((res) => {
        setReturnList([]);
        setEmailSearch("");
        toast.success("Create return form success");
      })
      .catch((err) => {});
  };
  return (
    <div className="flex flex-col gap-5 w-full items-start">
      <div className="flex flex-row items-center w-full">
        <Typography
          sx={{ fontSize: 24, fontWeight: 600, fontFamily: "Poppins" }}
        >
          Create return form
        </Typography>
        <Button
          disabled={
            !validator.isEmail(email_search) ||
            !formValue.return_date ||
            !return_list.length
          }
          onClick={handleReturn}
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
      <MyInputDate
        label="Return date"
        value={formValue.return_date}
        onChange={(value) => {
          setFormValue((prev) => ({ ...prev, return_date: value }));
        }}
      />
      <MyInput
        label="Reader email"
        sx={{ width: 400 }}
        placeholder="Find user borrowing with email"
        value={formValue.user_email}
        onChange={(e) => {
          setFormValue((prev) => ({ ...prev, user_email: e.target.value }));
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setReturnList([]);
            setEmailSearch(formValue.user_email);
            createRequest.reset();
          }
        }}
      />
      {createRequest.isFetched ? (
        <ResultReturn return_result_list={createRequest.response} />
      ) : (
        <ReturnList return_list={return_list} setReturnList={setReturnList} />
      )}
      <BorrowingList
        user_email={email_search}
        setReturnList={setReturnList}
        return_list={return_list}
      />
    </div>
  );
};

export default CreateReturnForm;
