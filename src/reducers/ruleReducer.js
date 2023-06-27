import { createSlice } from "@reduxjs/toolkit";

const ruleSlice = createSlice({
  name: "rule",
  initialState: null,
  reducers: {
    setRuleSystem(state, action) {
      return action.payload;
    },
  },
});

const { actions, reducer } = ruleSlice;

export const { setRuleSystem } = actions;

export default reducer;
