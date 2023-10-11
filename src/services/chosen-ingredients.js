import { createSlice } from "@reduxjs/toolkit";
import { data } from "../utils/data";
import { TAB_VALUES } from "../utils/constants";

const bun = data.find(el => el.type === TAB_VALUES.bun);
const chosenIngredientsInitialState = {
  [TAB_VALUES.bun]: [{ ...bun, count: 1 }],
};

export const chosenIngredientsSlice = createSlice({
  name: 'chosenIngredients',
  initialState: chosenIngredientsInitialState,
  reducers: {
    add: (state, action) => action.payload,
    remove: (state, action) => action.payload,
    removeAll: () => chosenIngredientsInitialState,
  },
});