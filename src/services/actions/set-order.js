import { ENDPOINTS } from "../../utils/constants";
import { fetchWithRefresh } from "../../utils/utils";
import { chosenIngredientsSlice } from "../chosen-ingredients";
import { modalInfoSlice } from "../modal-info";
import { modalVisibilitySlice } from "../modal-visibility";

export function setOrder(ids) {
  return function(dispatch) {
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
    .then(data => {
      const info = {
        order: true,
        orderNumber: data.order.number,
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