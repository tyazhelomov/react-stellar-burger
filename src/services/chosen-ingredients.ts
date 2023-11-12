import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IIngredients } from "./types/ingredient";

const chosenIngredientsInitialState: IIngredients = {};

export const chosenIngredientsSlice = createSlice({
  name: 'chosenIngredients',
  initialState: chosenIngredientsInitialState,
  reducers: {
    add: (state, action: PayloadAction<IIngredients>): IIngredients => action.payload,
    remove: (state, action: PayloadAction<IIngredients>): IIngredients => action.payload,
    removeAll: (): IIngredients => chosenIngredientsInitialState,
  },
});