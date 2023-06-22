import { Box, Button, Typography } from "@mui/material";
import MyInput from "components/MyInput";
import React, { useState } from "react";
import { ReactComponent as IconUser } from "assets/icon/icon_user.svg";
import { ReactComponent as IconLock } from "assets/icon/icon_lock.svg";
import MyCheckBox from "components/MyCheckBox";
import { Link } from "react-router-dom";
import { login } from "services/managerAuth";
import useAPI from "hooks/useApi";
import { storeUser } from "reducers/userReducer";
import { setLoginStatus } from "reducers/loginStatusReducer";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import MyBackDropProcess from "components/MyBackDropProcess";

const UserLogin = () => {
  const [formValue, setFormValue] = useState({ account: "", password: "" });
  const loginRequest = useAPI({ queryFn: () => login(formValue) });
  const dispatch = useDispatch();
  const handleLogin = async () => {
    loginRequest
      .run()
      .then((res) => {
        dispatch(storeUser(res.data.data));
        dispatch(setLoginStatus({ isChecking: false, isLogin: true }));
        toast.success("Login success");
      })
      .catch((err) => {});
  };
  const isDisable = () => {
    return !formValue.account.length || !formValue.password.length;
  };
  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <MyBackDropProcess open={loginRequest.loading} />
      <Box
        sx={{
          display: "flex",
          padding: "24px 48px",
          flexDirection: "column",
          boxShadow:
            "0px 1.2px 3.6px rgba(0, 0, 0, 0.1), 0px 6.4px 14.4px rgba(0, 0, 0, 0.13)",
          borderRadius: "24px",
          background: "#fff",
          position: "relative",
          width: "560px",
          gap: "16px",
        }}
      >
        <div className="absolute w-[70px] h-[70px] rounded-full bg-primary-main top-[-20px] left-[-20px]"></div>{" "}
        <div className="absolute w-[70px] h-[70px] rounded-full bg-primary-main bottom-[-20px] right-[-20px]"></div>
        <Typography
          sx={{
            fontFamily: "Lato",
            fontSize: 32,
            fontWeight: 700,
            color: "#2C2C2C",
            textAlign: "center",
          }}
        >
          Sign in
        </Typography>
        <MyInput
          onChange={handleChange}
          value={formValue.account}
          startIcon={IconUser}
          label="Account"
          name="account"
          placeholder="account"
        />
        <MyInput
          value={formValue.password}
          onChange={handleChange}
          type="password"
          startIcon={IconLock}
          label="Password"
          name="password"
          placeholder="***************"
        />
        <div className="flex flex-col items-start">
          <MyCheckBox label="Stay sign in" />
        </div>
        <div className="flex flex-col gap-8">
          <Button
            onClick={handleLogin}
            sx={{ borderRadius: 12, width: "100%", marginTop: "36px" }}
            variant="primary filled"
            disabled={isDisable()}
          >
            Sign in
          </Button>
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 400,
              textAlign: "center",
              color: "text_neutral.main",
            }}
          >
            Can't sign in?{" "}
            <Link to="/auth/register">
              <span className="text-[#4D809C] font-[700]">Create account</span>
            </Link>
          </Typography>
        </div>
      </Box>
    </div>
  );
};

export default UserLogin;
