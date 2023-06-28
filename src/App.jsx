import React from "react";
import theme from "./theme";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NormalLayout from "layouts/NormalLayout";
import AuthLayout from "layouts/AuthLayout";
import UserLogin from "pages/AuthUser/Login";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AutoLogin from "components/AutoLogin";
import DashBoard from "pages/Dashboard";
import ManagerRouter from "components/ManagerRouter";
import Settings from "pages/Settings";
import StatisticsReports from "pages/StatisticsReports";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AutoLogin />
        <BrowserRouter>
          <Routes>
            <Route path="" element={<NormalLayout />}>
              <Route path="" element={<ManagerRouter />}>
                <Route index path="dashboard/:tab?" element={<DashBoard />} />
                <Route
                  index
                  path="statisticsReports/:tab?"
                  element={<StatisticsReports />}
                />
                <Route path="settings" element={<Settings />} />
                <Route path="" element={<Navigate to="/dashboard" />} />
              </Route>
            </Route>
            <Route path="auth" element={<AuthLayout />}>
              <Route index path="login" element={<UserLogin />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
