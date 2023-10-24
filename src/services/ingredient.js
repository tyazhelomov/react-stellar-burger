import { createSlice } from "@reduxjs/toolkit";

const ingredientInitialState = {};

export const ingredientSlice = createSlice({
  name: 'ingredient',
  initialState: ingredientInitialState,
  reducers: {
    add: (state, action) => action.payload,
  },
});