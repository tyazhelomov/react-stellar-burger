import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TIngredient } from "./types/ingredient";

const ingredientInitialState: TIngredient = { isLoading: false, element: undefined };

export const ingredientSlice = createSlice({
  name: 'ingredient',
  initialState: ingredientInitialState,
  reducers: {
    add: (state, action: PayloadAction<TIngredient>): TIngredient => action.payload,
  },
});