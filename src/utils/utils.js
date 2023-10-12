import { BASE_URL, TAB_VALUES } from "./constants";

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

export function fetchRequest(endpoint, options) {
  return fetch(`${ BASE_URL }${ endpoint }`, options)
    .then(checkResponse)
    .then(res => new Promise((resolve) => {
      setTimeout(() => resolve(res), 2000);
    }));
}

export function checkResponse(res) {
  return res.ok ? res.json() : res.json().then(err => Promise.reject(`Ошибка ${JSON.stringify(err)}`));
}