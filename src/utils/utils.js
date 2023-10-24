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

  console.log(`${ BASE_URL }${ endpoint }`, options)
  try {
    const request = await fetch(`${ BASE_URL }${ endpoint }`, options);
    const response = await checkResponse(request);

    console.log(response)

    if (response.success && response.accessToken) {
        const [, accessToken] = response.accessToken.split(' ');
        localStorage.setItem("refreshToken", response.refreshToken);
        localStorage.setItem("accessToken", accessToken);
    }

    return response;
  } catch (err) {
    console.log(err)
    if (err.message === "jwt expired") {
      console.log('JWT EXPIRED')
      const refreshData = await refreshToken();

      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      const [, accessToken] = refreshData.accessToken.split(' ');

      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", accessToken);
      options.headers.authorization = refreshData.accessToken;
      console.log('TOKEN UPDATED', refreshData)
      const res = await fetch(`${ BASE_URL }${ endpoint }`, options);

      return checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MzUzZDk2NTJiNGNmMDAxZDg2YzZhNyIsImlhdCI6MTY5Nzk5MzEwOCwiZXhwIjoxNjk3OTk0MzA4fQ.UIWKJNxDD59-OZB6JzdrqRM67WyNGJw3x57MMyyTt94