import React from "react";
import { ReactComponent as IconProfileCircle } from "assets/icon/icon_profile_circle.svg";
import { ReactComponent as IconLogout } from "assets/icon/icon_logout.svg";
import { SvgIcon, Typography } from "@mui/material";
import useAPI from "hooks/useApi";
import { logout } from "services/managerAuth";
import { useDispatch } from "react-redux";
import { setLoginStatus } from "reducers/loginStatusReducer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UserMenu = () => {
  const logoutRequest = useAPI({ queryFn: logout });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    logoutRequest.run().then((res) => {
      toast.success("Logout success");
      dispatch(setLoginStatus({ isLogin: false, isChecking: false }));
    });
  };
  return (
    <div className="flex flex-col bg-[#fff] py-3 rounded-[12px] mt-[-15px]">
      <div
        onClick={() => navigate("/user")}
        className="flex flex-row items-center px-5 py-3 gap-3 hover:bg-primary-90 transition-all cursor-pointer"
      >
        <SvgIcon
          component={IconProfileCircle}
          sx={{ width: 20, height: 20, color: "#4A4553" }}
          inheritViewBox={true}
        />
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 400,
            color: "#4A4553",
            fontFamily: "Poppins",
          }}
        >
          About me
        </Typography>
      </div>
      <div
        onClick={handleLogout}
        className="flex flex-row items-center px-5 py-3 gap-3 hover:bg-primary-90 transition-all cursor-pointer"
      >
        <SvgIcon
          component={IconLogout}
          sx={{ width: 20, height: 20, color: "#E1251B" }}
          inheritViewBox={true}
        />
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 400,
            color: "#E1251B",
            fontFamily: "Poppins",
          }}
        >
          Logout
        </Typography>
      </div>
    </div>
  );
};

export default UserMenu;
