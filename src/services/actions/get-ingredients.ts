import { Dispatch } from "redux";
import { AppThunk } from "../..";
import { ENDPOINTS } from "../../utils/constants";
import { data } from "../../utils/data";
import { fetchWithRefresh, filterIngredients } from "../../utils/utils";
import { TErrorStateInitialState, errorStateSlice } from "../error-state";
import { ingredientSlice } from "../ingredient";
import { ingredientsSlice } from "../ingredients";
import { IIngredientInfo, IIngredients } from "../types/ingredient";
import { TIngredientId } from "../types/socket";
import { userStateSlice } from "../user-state";

export function getIngredients(): AppThunk {
  return function (dispatch: Dispatch) {
    const { update } = userStateSlice.actions;
    const { set } = ingredientsSlice.actions;
    const loginInfo = {
      isLoading: true,
    };

    dispatch(update(loginInfo));
    fetchWithRefresh(ENDPOINTS.GET_INGREDIENTS)
      .then(({ response: data }) => filterIngredients(data.data as IIngredientInfo[]))
      .then(data => {
        dispatch(set(data));

        const loginInfo = {
          isLoading: false,
        };

        dispatch(update(loginInfo));
      })
      .catch((err) => {
        console.error(err);

        const initData = filterIngredients(data);
        dispatch(set(initData));

        const loginInfo = {
          isLoading: false,
        };

        dispatch(update(loginInfo));
      });
  }
}

export function getIngredient(id: TIngredientId): AppThunk {
  return function (dispatch: Dispatch) {
  const { add } = ingredientSlice.actions;
  const { updateForm } = errorStateSlice.actions;

  dispatch(add({
    isLoading: true,
    element: undefined
  }));
  fetchWithRefresh(ENDPOINTS.GET_INGREDIENTS)
    .then(({ response: data }) => {
      const { data: info } = data as IIngredients;
      const element = info.find((el: IIngredientInfo) => el._id === id);

      if (!element) {
        throw new Error('Ингредиент не найден')
      }

      const errorInfo: TErrorStateInitialState = {
        error: false,
      };

      dispatch(updateForm(errorInfo));
      dispatch(add({ isLoading: false, element }));
    })
    .catch((err) => {
      console.error(err);

      const errorInfo: TErrorStateInitialState = {
        error: true,
        errorMsg: err.message,
      };

      dispatch(updateForm(errorInfo));
      dispatch(add({
        isLoading: false,
        element: undefined
      }));
    });
  }
}