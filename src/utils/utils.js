import { chosenIngredientsSlice } from "../services/chosen-ingredients";
import { ingredientsSlice } from "../services/ingredients";
import { BASE_URL, ENDPOINTS, TAB_VALUES } from "./constants";
import { data } from "./data";

export const filterIngredients = (data) => {
  const ingredients = {
    [TAB_VALUES.bun]: [],
    [TAB_VALUES.main]: [],
    [TAB_VALUES.sauce]: [],
  }
  data.forEach(element => {
    const type = element.type;
    ingredients[type].push(element);
  });

  return ingredients;
}

export function getIngredients() {
  return function(dispatch) {
    const { set } = ingredientsSlice.actions;
    const { add } = chosenIngredientsSlice.actions;
    fetch(`${ BASE_URL }${ ENDPOINTS.GET_INGREDIENTS }`)
      .then(res => {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка ${JSON.stringify(res)}`);
      })
      .then(data => filterIngredients(data.data))
      .then(data => {
        dispatch(set(data));
        const [bun] = Object.values(data[TAB_VALUES.bun]);
        const newChosenIngredients = {
          [TAB_VALUES.bun]: [{ ...bun, count: 1 }],
        }
        dispatch(add(newChosenIngredients));
      })
      .catch((err) => {
        console.error(err);

        const initData = filterIngredients(data);
        dispatch(set(initData));
      });
  };
}