import React from "react";
import theme from "./theme";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NormalLayout from "layouts/NormalLayout";
import AuthLayout from "layouts/AuthLayout";
import UserLogin from "pages/AuthUser/Login";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AutoLogin from "components/AutoLogin";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AutoLogin />
        <BrowserRouter>
          <Routes>
            <Route path="" element={<NormalLayout />}></Route>
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
