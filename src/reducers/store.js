import { configureStore } from "@reduxjs/toolkit";
import loginStatusReducer from "./loginStatusReducer";
import userReducer from "./userReducer.js";
import ruleReducer from "./ruleReducer";

export const store = configureStore({
  reducer: {
    loginStatus: loginStatusReducer,
    currentUser: userReducer,
    rule: ruleReducer,
  },
});
