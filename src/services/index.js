import { ingredientsSlice } from './ingredients';
import { chosenIngredientsSlice } from './chosen-ingredients';
import { modalInfoSlice } from './modal-info';
import { modalVisibilitySlice } from './modal-visibility';
import { currentTabSlice } from './current-tab';

export const rootReducer = {
  ingredients: ingredientsSlice.reducer,
  modalInfo: modalInfoSlice.reducer,
  modalVisibility: modalVisibilitySlice.reducer,
  chosenIngredients: chosenIngredientsSlice.reducer,
  currentTab: currentTabSlice.reducer,
};