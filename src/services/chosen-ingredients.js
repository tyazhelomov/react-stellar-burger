import { createSlice } from "@reduxjs/toolkit";

export const chosenIngredientsSlice = createSlice({
  name: 'chosenIngredients',
  initialState: {},
  reducers: {
    add: (state, action) => action.payload,
    remove: (state, action) => action.payload,
    removeAll: () => {},
  },
});