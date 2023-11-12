import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IIngredients } from "./types/ingredient";

const ingredientsInitialState: IIngredients = {};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: ingredientsInitialState,
  reducers: {
    set: (state, action: PayloadAction<IIngredients>): IIngredients => action.payload,
  },
});