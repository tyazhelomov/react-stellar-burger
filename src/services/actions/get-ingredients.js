import { ENDPOINTS } from "../../utils/constants";
import { data } from "../../utils/data";
import { fetchWithRefresh, filterIngredients } from "../../utils/utils";
import { errorStateSlice } from "../error-state";
import { ingredientSlice } from "../ingredient";
import { ingredientsSlice } from "../ingredients";
import { userStateSlice } from "../user-state";

export function getIngredients() {
  return function(dispatch) {
    const { update } = userStateSlice.actions;
    const { set } = ingredientsSlice.actions;
    const loginInfo = {
      isLoading: true,
    };

    dispatch(update(loginInfo));
    fetchWithRefresh(ENDPOINTS.GET_INGREDIENTS)
      .then(({ response: data }) => filterIngredients(data.data))
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
  };
}

export function getIngredient(id) {
  return function(dispatch) {
    const { add } = ingredientSlice.actions;
    const { updateForm } = errorStateSlice.actions;

    dispatch(add({ isLoading: true }));
    fetchWithRefresh(ENDPOINTS.GET_INGREDIENTS)
      .then(({ response: data }) => {
        const element = data.data.find(el => el._id === id);

        if (!element) {
          throw new Error('Ингредиент не найден')
        }

        const errorInfo = {
          error: false,
        };

        console.log(element)

        dispatch(updateForm(errorInfo));
        dispatch(add({ isLoading: false, element }));
      })
      .catch((err) => {
        console.error(err);

        const errorInfo = {
          error: true,
          errorMsg: err.message,
        };

        dispatch(updateForm(errorInfo));
        dispatch(add({ isLoading: false }));
      });
  };
}