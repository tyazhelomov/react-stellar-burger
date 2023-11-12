export type TIngredientId = string;

export interface IOrder {
  createdAt: string;
  updatedAt: string;
  ingredients: Array<TIngredientId>;
  name: string;
  number: number;
  status: string;
  _id: string;
}

export interface IFeedMessage {
  orders: Array<IOrder>;
  success: boolean;
  total: number;
  totalToday: number;
}

export interface IFeed {
  error: Event | CloseEvent | boolean | undefined;
  messages: IFeedMessage | Array<void>;
  wsConnected: boolean;
}
