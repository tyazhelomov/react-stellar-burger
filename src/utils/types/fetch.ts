import { IIngredientInfo } from "../../services/types/ingredient";
import { IUserInfo } from "../../services/types/user-state";

export type IOptions = RequestInit | undefined;

export type TEndpoint = string;

export type IRequestBody = (endpoint: TEndpoint, options?: IOptions) => Promise<TResponseBody>;
export type IRequest = (endpoint: TEndpoint, options?: IOptions) => Promise<TResponse>;

export type TSuccess = { success: boolean; };
export type TRefreshData = {
  accessToken: string;
  refreshToken: string;
}

export interface IOrderInfo {
  _id: string;
  createdAt: string;
  updatedAt: string;
  ingredients: Array<string>;
  name: string;
  number: number;
  owner: {
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  }
  price: number;
  status: string;
}
export interface IOrder {
  name: string;
  order: IOrderInfo;
}

export type TGetIngredients = { data: Array<IIngredientInfo> };
export type TGetRefreshData = TRefreshData;
export type TGetUserInfo = { user: IUserInfo };
export type TSetOrder = IOrder;

export type TResponseBody = {
  [name: string]: boolean | Array<IIngredientInfo> | IUserInfo | IOrderInfo | string;
};

export type TResponse = {
  response: TResponseBody;
  accessToken?: string;
};
