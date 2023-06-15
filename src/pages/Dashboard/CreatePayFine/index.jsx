import { Button, CircularProgress, Typography } from "@mui/material";
import useAPI from "hooks/useApi";
import React, { useEffect, useState } from "react";
import { createPayFine } from "services/manager";
import UserSearch from "./UserSearch";
import UserInfo from "./UserInfo";
import MyInput from "components/MyInput";
import MyInputDate from "components/MyInputDate";
import validator from "validator";
import { toast } from "react-toastify";
const defaultForm = { pay_date: null, fine: 0 };

const CreatePayFine = () => {
  const [formValue, setFormValue] = useState(defaultForm);
  const [user, setUser] = useState(null);
  const createRequest = useAPI({ queryFn: (data) => createPayFine(data) });
  useEffect(() => {
    console.log(user);
  }, [user]);
  const handleCreate = () => {
    createRequest
      .run({
        ...formValue,
        fine: parseInt(formValue.fine),
        user_email: user.email,
      })
      .then((res) => {
        toast.success("Create pay fine form success");
        setUser(res.user);
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
          disabled={
            !user || !formValue.pay_date || !validator.isNumeric(formValue.fine)
          }
          onClick={handleCreate}
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
      <UserSearch setUser={setUser} />
      <UserInfo user={user} />
      {user ? (
        <>
          <MyInput
            label="Money pay"
            placeholder="10000"
            onChange={(e) =>
              setFormValue((prev) => ({ ...prev, fine: e.target.value }))
            }
            value={formValue.fine}
          />
          <MyInputDate
            label="Pay date"
            value={formValue.pay_date}
            onChange={(value) =>
              setFormValue((prev) => ({ ...prev, pay_date: value }))
            }
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CreatePayFine;
