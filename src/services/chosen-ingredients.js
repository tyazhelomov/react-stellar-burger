import { createSlice } from "@reduxjs/toolkit";

const chosenIngredientsInitialState = {};

export const chosenIngredientsSlice = createSlice({
  name: 'chosenIngredients',
  initialState: chosenIngredientsInitialState,
  reducers: {
    add: (state, action) => action.payload,
    remove: (state, action) => action.payload,
    removeAll: () => chosenIngredientsInitialState,
  },
});