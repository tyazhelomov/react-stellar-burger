import { createSlice } from "@reduxjs/toolkit";

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: {},
  reducers: {
    set: (state, action) => action.payload,
  },
});