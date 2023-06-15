import { Button, CircularProgress, Typography } from "@mui/material";
import MyInput from "components/MyInput";
import MyInputDate from "components/MyInputDate";
import useAPI from "hooks/useApi";
import React, { useState } from "react";
import { createReturn } from "services/manager";
import BorrowingList from "./BorrowingList";

const defaultForm = { user_email: "", borrow_date: null };

const CreateReturnForm = ({}) => {
  const createRequest = useAPI({ queryFn: (data) => createReturn(data) });
  const [formValue, setFormValue] = useState(defaultForm);
  const [returnList, setReturnList] = useState([]);
  const [email_search, setEmailSearch] = useState("");
  return (
    <div className="flex flex-col gap-5 w-full items-start">
      <div className="flex flex-row items-center w-full">
        <Typography
          sx={{ fontSize: 24, fontWeight: 600, fontFamily: "Poppins" }}
        >
          Create return form
        </Typography>
        <Button variant="primary filled" sx={{ marginLeft: "auto" }}>
          {createRequest.loading ? (
            <CircularProgress size={14} />
          ) : (
            "Create form"
          )}
        </Button>
      </div>
      <MyInput
        label="Reader email"
        sx={{ width: 400 }}
        placeholder="Find user borrowing with email"
        value={formValue.user_email}
        onChange={(e) => {
          setFormValue((prev) => ({ ...prev, user_email: e.target.value }));
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") setEmailSearch(formValue.user_email);
        }}
      />
      <MyInputDate
        label="Return date"
        value={formValue.borrow_date}
        onChange={(value) => {
          setFormValue((prev) => ({ ...prev, borrow_date: value }));
        }}
      />
      <BorrowingList user_email={email_search} />
    </div>
  );
};

export default CreateReturnForm;
