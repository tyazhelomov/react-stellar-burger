import { createSlice } from "@reduxjs/toolkit";

const ingredientInitialState = { isLoading: false };

export const ingredientSlice = createSlice({
  name: 'ingredient',
  initialState: ingredientInitialState,
  reducers: {
    add: (state, action) => action.payload,
  },
});