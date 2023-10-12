import { ENDPOINTS } from "../../utils/constants";
import { data } from "../../utils/data";
import { fetchRequest, filterIngredients } from "../../utils/utils";
import { ingredientsSlice } from "../ingredients";

export function getIngredients() {
  return function(dispatch) {
    const { set } = ingredientsSlice.actions;
    fetchRequest(ENDPOINTS.GET_INGREDIENTS)
      .then(data => filterIngredients(data.data))
      .then(data => {
        dispatch(set(data));
      })
      .catch((err) => {
        console.error(err);

        const initData = filterIngredients(data);
        dispatch(set(initData));
      });
  };
}