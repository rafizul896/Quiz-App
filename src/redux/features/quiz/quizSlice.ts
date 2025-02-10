import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {},
});

export default quizSlice.reducer;
