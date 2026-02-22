import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedItems: [],
};

export const loginSlice = createSlice({
  name: "checkItemCart",
  initialState,
  reducers: {},
});

export const {} = loginSlice.actions;

export default loginSlice.reducer;
