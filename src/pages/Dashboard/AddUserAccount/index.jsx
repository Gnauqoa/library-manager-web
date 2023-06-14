import { Box, Button, Typography, styled } from "@mui/material";
import MyInput from "components/MyInput";
import React, { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { ReactComponent as IconLocation } from "assets/icon/icon_location.svg";
import { ReactComponent as IconLock } from "assets/icon/icon_lock.svg";
import { ReactComponent as IconEmail } from "assets/icon/icon_sms.svg";
import SelectAtom from "components/MySelect";
import getErrorMessage from "services/validate";
import useAPI from "hooks/useApi";
import { addReader } from "services/reader";
import { toast } from "react-toastify";

const DateDisplay = styled(DatePicker)(({ theme }) => ({
  ".MuiInputBase-root": {
    borderRadius: "12px",
    ":hover": {
      boxShadow: "0px 0px 5px 5px #C3E8FF",
    },
    ":focus": {
      borderColor: "primary.main",
      boxShadow: " 0px 0px 5px 5px #C3E8FF",
    },
  },
  "& input": { border: 0, borderColor: "#fff" },
}));
const AddUser = () => {
  const [formValue, setFormValue] = useState(defaultFormValue);
  const saveRequest = useAPI({ queryFn: (data) => addReader(data) });
  const handleCreate = () => {
    saveRequest
      .run(formValue)
      .then((res) => {
        setFormValue(defaultFormValue);
        toast.success("Create user success");
      })
      .catch((err) => {});
  };
  const isDisable = () => {
    return !(
      !getErrorMessage("email", formValue.email) &&
      !getErrorMessage("password", formValue.password) &&
      formValue.first_name &&
      formValue.last_name &&
      formValue.type &&
      formValue.password &&
      formValue.confirm_password &&
      formValue.birth &&
      formValue.password === formValue.confirm_password
    );
  };
  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        boxShadow: "0px 0px 20px 8px rgba(0,0,0,0.1)",
        padding: "20px",
        borderRadius: "12px",
        minWidth: 500,
        width: 500,
        height: "auto",
      }}
    >
      <Typography sx={{ fontSize: 24, fontWeight: 600, fontFamily: "Poppins" }}>
        Add new account
      </Typography>
      <MyInput
        name="email"
        onChange={handleChange}
        value={formValue.email}
        startIcon={IconEmail}
        label="Email"
        placeholder="email@gmail.com"
      />
      <div className="flex flex-row gap-3">
        <MyInput
          name="password"
          onChange={handleChange}
          value={formValue.password}
          startIcon={IconLock}
          type="password"
          label="Password"
          placeholder="*************************"
        />
        <MyInput
          name="confirm_password"
          onChange={handleChange}
          value={formValue.confirm_password}
          startIcon={IconLock}
          type="password"
          label="Confirm password"
          placeholder="*************************"
        />
      </div>
      <div className="flex flex-row gap-3">
        <MyInput
          name="first_name"
          onChange={handleChange}
          label="First name"
          placeholder="Le"
          value={formValue.first_name}
        />
        <MyInput
          name="last_name"
          onChange={handleChange}
          label="Last name"
          placeholder="Dang Quang"
          value={formValue.last_name}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 500,
            color: "#121115",
            fontFamily: "Poppins",
          }}
        >
          Birth
        </Typography>
        <DateDisplay
          value={formValue.birth}
          name="birth"
          onChange={(value) =>
            setFormValue((prev) => ({ ...prev, birth: value }))
          }
        />
      </div>
      <MyInput
        name="address"
        onChange={handleChange}
        value={formValue.address}
        startIcon={IconLocation}
        label="Address(optional)"
        placeholder="12 ngõ 3"
      />
      <SelectAtom
        name="type"
        onChange={(e) =>
          setFormValue((prev) => ({ ...prev, type: e.target.value }))
        }
        label="Type of card"
        optionList={["Loyal", "Normal"]}
        value={formValue.type}
      />
      <Button
        onClick={handleCreate}
        disabled={isDisable() || saveRequest.loading}
        variant="primary filled"
        sx={{ width: "100%" }}
      >
        Create account
      </Button>
    </Box>
  );
};
const defaultFormValue = {
  email: "",
  password: "",
  confirm_password: "",
  first_name: "",
  last_name: "",
  birth: "",
  address: "",
  type: "",
};
export default AddUser;
