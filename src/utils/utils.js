import { useState } from "react";
import { BASE_URL, ENDPOINTS, TAB_VALUES } from "./constants";

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

export function checkResponse(res) {
  return res.ok ? res.json().then(res => new Promise((resolve) => {
    setTimeout(() => resolve(res), 2000);
  })) : res.json().then(err => Promise.reject(err));
}

export const refreshToken = () => {
  return fetch(`${ BASE_URL }${ ENDPOINTS.GET_TOKEN }`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then(checkResponse);
};

export const fetchWithRefresh = async (endpoint, options) => {
  try {
    const request = await fetch(`${ BASE_URL }${ endpoint }`, options);
    const response = await checkResponse(request);

    if (response.success && response.accessToken) {
        const [, accessToken] = response.accessToken.split(' ');
        localStorage.setItem("refreshToken", response.refreshToken);
        localStorage.setItem("accessToken", accessToken);
    }

    return response;
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken();

      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      const [, accessToken] = refreshData.accessToken.split(' ');

      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(`${ BASE_URL }${ endpoint }`, options);

      return checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export function useForm(inputValues={}) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event) => {
    const {value, name} = event.target;
    setValues({...values, [name]: value});
  };
  return {values, handleChange, setValues};
}