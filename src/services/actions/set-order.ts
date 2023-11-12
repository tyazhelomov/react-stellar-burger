import { Dispatch } from "redux";
import { AppThunk } from "../..";
import { ENDPOINTS } from "../../utils/constants";
import { IOrderInfo } from "../../utils/types/fetch";
import { fetchWithRefresh } from "../../utils/utils";
import { chosenIngredientsSlice } from "../chosen-ingredients";
import { modalInfoSlice } from "../modal-info";
import { modalVisibilitySlice } from "../modal-visibility";
import { TIngredientId } from "../types/socket";

export function setOrder(ids: Array<TIngredientId>): AppThunk {
  return function(dispatch: Dispatch) {
    const { removeAll } = chosenIngredientsSlice.actions;
    const { addModalInfo } = modalInfoSlice.actions;
    const { openModal } = modalVisibilitySlice.actions;
    const info = {
      order: true,
      loading: true,
      error: false
    };

    dispatch(openModal());
    dispatch(addModalInfo(info));

    fetchWithRefresh(ENDPOINTS.SET_ORDER, {
      body: JSON.stringify({ ingredients: ids }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
    .then(({ response: data }) => {
      const { number } = data.order as IOrderInfo;
      const info = {
        order: true,
        orderNumber: number,
        loading: false,
        error: false
      };

      dispatch(addModalInfo(info));
      dispatch(removeAll());
    })
    .catch((err) => {
      console.error(err)

      const info = {
        order: true,
        loading: false,
        error: true
      };
      dispatch(addModalInfo(info));
    });
  }
}