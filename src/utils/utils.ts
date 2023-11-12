import { IIngredientInfo, IIngredients } from "../services/types/ingredient";
import { BASE_URL, ENDPOINTS, TAB_VALUES } from "./constants";
import { IOptions, IRequest, TEndpoint, TResponseBody } from "./types/fetch";

export const filterIngredients = <T extends ReadonlyArray<IIngredientInfo>>(data: T): IIngredients => {
  const ingredients: IIngredients = {
    [TAB_VALUES.bun]: [],
    [TAB_VALUES.main]: [],
    [TAB_VALUES.sauce]: [],
  }
  data.forEach((element: IIngredientInfo) => {
    const type = element.type;
    ingredients[type].push(element);
  });

  return ingredients;
}

export function checkResponse(res: Response): Promise<TResponseBody> {
  return res.ok ? res.json().then(res => new Promise((resolve) => {
    setTimeout(() => resolve(res), 2000);
  })) : res.json().then(err => Promise.reject(err));
}

export const refreshToken = () => {
  return requester(ENDPOINTS.GET_TOKEN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });
};

const requester = async (endpoint: TEndpoint, options?: IOptions): Promise<TResponseBody> => await fetch(`${ BASE_URL }${ endpoint }`, options).then(checkResponse);

export const fetchWithRefresh: IRequest = async (endpoint, options) => {
  try {
    const response = await requester(endpoint, options);

    let accessToken: string | undefined;

    if (response.success && response.accessToken && typeof response.accessToken === 'string') {
      accessToken = response.accessToken.split(' ')[1];
      localStorage.setItem("accessToken", accessToken);

      if (response.refreshToken) {
        localStorage.setItem("refreshToken", (response.refreshToken as string));
      }
    }

    return { response, accessToken };
  } catch (err) {
    if (err instanceof Error && err.message === "jwt expired" && options?.headers) {
      const refreshData = await requester(ENDPOINTS.GET_TOKEN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          token: localStorage.getItem("refreshToken"),
        }),
      });

      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }

      let accessToken: string | undefined;

      if (refreshData.accessToken && refreshData.refreshToken) {
        accessToken = (refreshData.accessToken as string).split(' ')[1];
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", (refreshData.refreshToken as string));
      }
      
      const reqHeaders = new Headers(options.headers);
      reqHeaders.set('Authorization', `Bearer ${refreshData.accessToken}`);
      const response: TResponseBody = await requester(endpoint, options);

      return { response, accessToken };
    } else {
      return Promise.reject(err);
    }
  }
};
